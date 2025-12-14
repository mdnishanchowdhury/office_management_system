import pickle
import numpy as np
import pandas as pd
import os

class SalaryPredictor:
    """Handles ML-based salary prediction"""
    
    def __init__(self): 
        """Load all pickle files using paths relative to this file."""
        
        # 1. Get the directory where THIS file (ml_predictor.py) lives
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        # 2. Define the correct, absolute path to the 'ml_models' folder
        self.models_dir = os.path.join(current_dir, 'ml_models')
        
        try:
            # 3. Load all pickle files
            self.model = pickle.load(open(os.path.join(self.models_dir, 'salary_prediction_model.pkl'), 'rb'))
            
            # Load department encoding (has 'mapping' and 'default' keys)
            dept_encoding = pickle.load(open(os.path.join(self.models_dir, 'department_mapping.pkl'), 'rb'))
            if isinstance(dept_encoding, dict) and 'mapping' in dept_encoding:
                self.dept_map = dept_encoding['mapping']
                self.dept_default = dept_encoding['default']
            else:
                self.dept_map = dept_encoding
                self.dept_default = np.mean(list(dept_encoding.values()))
            
            # Load designation encoding (has 'mapping' and 'default' keys)
            desig_encoding = pickle.load(open(os.path.join(self.models_dir, 'designation_mapping.pkl'), 'rb'))
            if isinstance(desig_encoding, dict) and 'mapping' in desig_encoding:
                self.desig_map = desig_encoding['mapping']
                self.desig_default = desig_encoding['default']
            else:
                self.desig_map = desig_encoding
                self.desig_default = np.mean(list(desig_encoding.values()))
            
            self.mlb = pickle.load(open(os.path.join(self.models_dir, 'skills_mlb.pkl'), 'rb'))
            self.feature_columns = pickle.load(open(os.path.join(self.models_dir, 'feature_columns.pkl'), 'rb'))
            
            # Check which features are present
            self.has_grade = 'grade' in self.feature_columns
            self.has_grade_encoded = 'grade_encoded' in self.feature_columns
            self.has_dept_id = 'department_id' in self.feature_columns
            self.has_desig_id = 'designation_id' in self.feature_columns
            self.has_dept_te = 'department_id_te' in self.feature_columns
            self.has_desig_te = 'designation_id_te' in self.feature_columns
            
            print("✓ All ML models loaded successfully!")
            print(f"  Departments: {len(self.dept_map)}")
            print(f"  Designations: {len(self.desig_map)}")
            print(f"  Skills: {len(self.mlb.classes_)}")
            print(f"  Features: {len(self.feature_columns)}")
            print(f"  Feature structure: grade={self.has_grade or self.has_grade_encoded}, dept_id={self.has_dept_id}, desig_id={self.has_desig_id}")
            
        except FileNotFoundError as e:
            print(f"❌ Error loading pickle files: {e}")
            print(f"   Please ensure all pickle files are in '{self.models_dir}' folder")
            raise
        
    def prepare_input(self, grade, skills_list, department_id, designation_id):
        """
        Converts raw inputs into model-ready dataframe
        
        Args:
            grade: int (1-4)
            skills_list: list of strings (e.g., ["8", "15"])
            department_id: int
            designation_id: int
        
        Returns:
            pandas DataFrame with features matching training data
        """
        
        print(f"\n🔍 PREPARING INPUT:")
        print(f"  Grade: {grade}")
        print(f"  Skills list: {skills_list}")
        print(f"  Department ID: {department_id}")
        print(f"  Designation ID: {designation_id}")
        
        # 1. Convert skills to floats (CRITICAL - MLB classes are floats!)
        skills_as_floats = [float(s) for s in skills_list if s]
        print(f"  Skills as floats: {skills_as_floats}")
        
        # 2. Encode Skills Using MultiLabelBinarizer
        skills_binary = self.mlb.transform([skills_as_floats])[0]
        active_skills = int(skills_binary.sum())
        print(f"✓ Skills encoded: {active_skills} active skills")
        
        # 3. Target Encoding for Department & Designation (use defaults if not found)
        dept_te = self.dept_map.get(department_id, self.dept_default)
        if department_id not in self.dept_map:
            print(f"⚠️  Department {department_id} not found, using default: {dept_te:.2f}")
        else:
            print(f"✓ Department {department_id} encoded: {dept_te:.2f}")
            
        desig_te = self.desig_map.get(designation_id, self.desig_default)
        if designation_id not in self.desig_map:
            print(f"⚠️  Designation {designation_id} not found, using default: {desig_te:.2f}")
        else:
            print(f"✓ Designation {designation_id} encoded: {desig_te:.2f}")
        
        # 4. Build feature dictionary
        data_dict = {}
        
        # Add grade (use the correct column name)
        if self.has_grade:
            data_dict['grade'] = grade
        elif self.has_grade_encoded:
            data_dict['grade_encoded'] = grade
        
        # Add original IDs if they're features
        if self.has_dept_id:
            data_dict['department_id'] = department_id
        
        if self.has_desig_id:
            data_dict['designation_id'] = designation_id
        
        # Add target-encoded values if they're features
        if self.has_dept_te:
            data_dict['department_id_te'] = dept_te
        
        if self.has_desig_te:
            data_dict['designation_id_te'] = desig_te
        
        # Add all skill columns
        for idx, skill_name in enumerate(self.mlb.classes_):
            skill_col = f"skill_{int(skill_name)}"
            data_dict[skill_col] = int(skills_binary[idx])
        
        # Convert to DataFrame
        df_input = pd.DataFrame([data_dict])
        
        # 5. Reindex columns into exact training order (fill missing with 0)
        df_input = df_input.reindex(columns=self.feature_columns, fill_value=0)
        
        print(f"✓ Final input shape: {df_input.shape}")
        print(f"  Sample values: {dict(list(df_input.iloc[0].items())[:5])}")
        
        return df_input
    
    def predict_salary(self, grade, skills_str, department_id, designation_id):
        """
        Main prediction method
        
        Args:
            grade: int or string ('1', '2', '3', '4')
            skills_str: comma-separated string (e.g., "8,15,23") or list
            department_id: int or string
            designation_id: int or string
        
        Returns:
            float: predicted salary
        """
        
        # Parse skills - handle both string and list inputs
        if isinstance(skills_str, str):
            skills_list = [s.strip() for s in skills_str.split(',') if s.strip()]
        elif isinstance(skills_str, list):
            skills_list = [str(s) for s in skills_str]
        else:
            skills_list = []
        
        # Convert all inputs to proper types
        grade = int(grade) if isinstance(grade, str) else grade
        department_id = int(department_id) if isinstance(department_id, str) else department_id
        designation_id = int(designation_id) if isinstance(designation_id, str) else designation_id
        
        # Prepare input
        X_input = self.prepare_input(grade, skills_list, department_id, designation_id)
        
        # Predict
        predicted_salary = self.model.predict(X_input)[0]
        
        print(f"✓ RAW PREDICTION: ${predicted_salary:,.2f}")
        
        return round(predicted_salary, 2)


# ============================================================================
# STANDALONE TEST (Run this file directly to test)
# ============================================================================

if __name__ == "__main__":
    print("\n" + "="*70)
    print("TESTING ML SALARY PREDICTOR")
    print("="*70)
    
    # Initialize predictor
    predictor = SalaryPredictor()
    
    # Test with sample department/designation IDs from your actual data
    # Use the IDs we saw in the test output: [5, 6, 7, 39, 41] and [19, 20, 21, 23, 36]
    test_cases = [
        {"grade": 1, "skills": "8,15", "dept": 5, "desig": 19, "name": "Junior with 2 skills"},
        {"grade": 2, "skills": "8,15,23", "dept": 6, "desig": 20, "name": "Mid-level with 3 skills"},
        {"grade": 3, "skills": "8,15,23,45", "dept": 7, "desig": 21, "name": "Senior with 4 skills"},
        {"grade": 4, "skills": "8,15,23,45,60", "dept": 39, "desig": 23, "name": "Expert with 5 skills"},
        {"grade": 2, "skills": "", "dept": 5, "desig": 19, "name": "Mid-level with NO skills"},
        {"grade": 3, "skills": "8,99999", "dept": 5, "desig": 19, "name": "Senior with invalid skill"},
        {"grade": 2, "skills": "8,15", "dept": 99999, "desig": 19, "name": "Unknown department"},
        {"grade": 2, "skills": "8,15", "dept": 5, "desig": 99999, "name": "Unknown designation"},
    ]
    
    for idx, test in enumerate(test_cases, 1):
        print(f"\n{'='*70}")
        print(f"TEST CASE {idx}: {test['name']}")
        print(f"{'='*70}")
        print(f"  Grade: {test['grade']}")
        print(f"  Skills: '{test['skills']}'")
        print(f"  Department ID: {test['dept']}")
        print(f"  Designation ID: {test['desig']}")
        
        try:
            salary = predictor.predict_salary(
                test['grade'], 
                test['skills'], 
                test['dept'], 
                test['desig']
            )
            
            print(f"\n  ⭐ PREDICTED SALARY: ${salary:,.2f}")
        except Exception as e:
            print(f"\n  ❌ PREDICTION FAILED: {e}")
            import traceback
            traceback.print_exc()
        
        print("="*70)
    
    print("\n✅ ALL TESTS COMPLETE!")