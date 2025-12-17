import mysql.connector
import pandas as pd
from datetime import datetime

# Load CSV data
csv_file = r"C:\Users\mdnis\OneDrive\Desktop\office_management_system\backend\cleaned_data.csv"
df = pd.read_csv(csv_file)

print(f"Loaded {len(df)} rows from CSV")
print(f"CSV Columns: {list(df.columns)}")

# Drop the 'id' column if it exists (MySQL will auto-generate it)
if 'id' in df.columns:
    df = df.drop('id', axis=1)

# Reorder columns to match database schema (excluding id)
db_column_order = [
    'username', 'email', 'first_name', 'last_name', 'role', 'employee_id',
    'password', 'phone', 'address', 'department', 'department_id',
    'designation', 'designation_id', 'position', 'gender', 'grade',
    'skills', 'salary', 'status', 'hire_date', 'date_of_birth',
    'created_at', 'updated_at'
]

# Keep only columns that exist in both CSV and database
available_columns = [col for col in db_column_order if col in df.columns]
df = df[available_columns]

print(f"Columns to insert: {available_columns}")

# Connect to MySQL
try:
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="nishan123",
        database="hr_office_db"
    )
    cursor = conn.cursor()
    print("✓ Connected to database")
    
    # Prepare insert query
    table_name = "employees"
    cols = ", ".join([f"`{col}`" for col in available_columns])
    placeholders = ", ".join(["%s"] * len(available_columns))
    insert_query = f"INSERT INTO {table_name} ({cols}) VALUES ({placeholders})"
    
    print(f"\nInserting records...")
    
    # Insert each row with error handling
    success_count = 0
    error_count = 0
    
    for idx, row in df.iterrows():
        try:
            # Convert row to tuple, handling None values
            row_data = tuple(None if pd.isna(val) else val for val in row)
            cursor.execute(insert_query, row_data)
            success_count += 1
            
            if (idx + 1) % 100 == 0:  # Progress indicator
                print(f"  Processed {idx + 1} rows...")
                
        except mysql.connector.Error as e:
            error_count += 1
            print(f"✗ Error inserting row {idx + 1}: {e}")
            print(f"  Row data: {row.to_dict()}")
    
    # Commit all changes
    conn.commit()
    
    print(f"\n{'='*50}")
    print(f"✓ {success_count} records added successfully!")
    if error_count > 0:
        print(f"✗ {error_count} records failed to insert")
    print(f"{'='*50}")
    
except mysql.connector.Error as e:
    print(f"✗ Database error: {e}")
    
finally:
    if 'cursor' in locals():
        cursor.close()
    if 'conn' in locals():
        conn.close()
    print("✓ Database connection closed")