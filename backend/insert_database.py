import mysql.connector
from datetime import date
import random

# Connect to the database
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="nishan123",  # Change to your MySQL password
    database="hr_office_db"
)

cursor = conn.cursor()

# Demo departments and designations
departments = [
    ("CSE", 24), ("IT", 25), ("HR", 26), ("Finance", 27), 
    ("Marketing", 28), ("Sales", 29), ("Operations", 30)
]

designations = [
    ("Software Engineer", 7), ("Senior Engineer", 8), ("Team Lead", 9),
    ("Manager", 10), ("Senior Manager", 11), ("Director", 12),
    ("Analyst", 13), ("Specialist", 14), ("Coordinator", 15)
]

# Skills pool (as strings to match mlb.classes_)
skills_pool = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"
]

# Demo employee data (20 employees)
demo_employees = [
    {
        "username": "sagor", "email": "sagor@company.com", "first_name": "Sagor", 
        "last_name": "Hasan", "role": "hradmin", "employee_id": "EMP1001", 
        "password": "hashed_password_1", "phone": "01729422332", "address": "Dhaka",
        "gender": "male", "status": "active", "hire_date": date(2024, 10, 5), 
        "date_of_birth": date(2000, 10, 5)
    },
    {
        "username": "fatima", "email": "fatima@company.com", "first_name": "Fatima",
        "last_name": "Rahman", "role": "employee", "employee_id": "EMP1002",
        "password": "hashed_password_2", "phone": "01712345678", "address": "Chittagong",
        "gender": "female", "status": "active", "hire_date": date(2023, 5, 15),
        "date_of_birth": date(1998, 3, 20)
    },
    {
        "username": "rakib", "email": "rakib@company.com", "first_name": "Rakib",
        "last_name": "Islam", "role": "employee", "employee_id": "EMP1003",
        "password": "hashed_password_3", "phone": "01798765432", "address": "Sylhet",
        "gender": "male", "status": "active", "hire_date": date(2022, 8, 10),
        "date_of_birth": date(1995, 7, 12)
    },
    {
        "username": "nadia", "email": "nadia@company.com", "first_name": "Nadia",
        "last_name": "Akter", "role": "manager", "employee_id": "EMP1004",
        "password": "hashed_password_4", "phone": "01823456789", "address": "Dhaka",
        "gender": "female", "status": "active", "hire_date": date(2021, 2, 1),
        "date_of_birth": date(1992, 11, 8)
    },
    {
        "username": "karim", "email": "karim@company.com", "first_name": "Karim",
        "last_name": "Ahmed", "role": "employee", "employee_id": "EMP1005",
        "password": "hashed_password_5", "phone": "01734567890", "address": "Rajshahi",
        "gender": "male", "status": "active", "hire_date": date(2023, 11, 20),
        "date_of_birth": date(1999, 4, 15)
    },
    {
        "username": "shirin", "email": "shirin@company.com", "first_name": "Shirin",
        "last_name": "Begum", "role": "employee", "employee_id": "EMP1006",
        "password": "hashed_password_6", "phone": "01845678901", "address": "Khulna",
        "gender": "female", "status": "active", "hire_date": date(2022, 6, 5),
        "date_of_birth": date(1997, 9, 22)
    },
    {
        "username": "imran", "email": "imran@company.com", "first_name": "Imran",
        "last_name": "Khan", "role": "employee", "employee_id": "EMP1007",
        "password": "hashed_password_7", "phone": "01756789012", "address": "Barisal",
        "gender": "male", "status": "active", "hire_date": date(2024, 1, 10),
        "date_of_birth": date(2001, 1, 30)
    },
    {
        "username": "ayesha", "email": "ayesha@company.com", "first_name": "Ayesha",
        "last_name": "Siddika", "role": "manager", "employee_id": "EMP1008",
        "password": "hashed_password_8", "phone": "01867890123", "address": "Dhaka",
        "gender": "female", "status": "active", "hire_date": date(2020, 9, 15),
        "date_of_birth": date(1990, 6, 10)
    },
    {
        "username": "tanvir", "email": "tanvir@company.com", "first_name": "Tanvir",
        "last_name": "Hossain", "role": "employee", "employee_id": "EMP1009",
        "password": "hashed_password_9", "phone": "01778901234", "address": "Comilla",
        "gender": "male", "status": "active", "hire_date": date(2023, 3, 25),
        "date_of_birth": date(1996, 12, 5)
    },
    {
        "username": "mahbuba", "email": "mahbuba@company.com", "first_name": "Mahbuba",
        "last_name": "Islam", "role": "employee", "employee_id": "EMP1010",
        "password": "hashed_password_10", "phone": "01889012345", "address": "Mymensingh",
        "gender": "female", "status": "active", "hire_date": date(2022, 12, 1),
        "date_of_birth": date(1994, 8, 18)
    },
    {
        "username": "fahim", "email": "fahim@company.com", "first_name": "Fahim",
        "last_name": "Rahman", "role": "employee", "employee_id": "EMP1011",
        "password": "hashed_password_11", "phone": "01790123456", "address": "Dhaka",
        "gender": "male", "status": "active", "hire_date": date(2024, 4, 12),
        "date_of_birth": date(2000, 2, 28)
    },
    {
        "username": "sadia", "email": "sadia@company.com", "first_name": "Sadia",
        "last_name": "Khatun", "role": "employee", "employee_id": "EMP1012",
        "password": "hashed_password_12", "phone": "01801234567", "address": "Rangpur",
        "gender": "female", "status": "active", "hire_date": date(2023, 7, 8),
        "date_of_birth": date(1998, 5, 14)
    },
    {
        "username": "rashed", "email": "rashed@company.com", "first_name": "Rashed",
        "last_name": "Ali", "role": "manager", "employee_id": "EMP1013",
        "password": "hashed_password_13", "phone": "01712345678", "address": "Dhaka",
        "gender": "male", "status": "active", "hire_date": date(2021, 6, 20),
        "date_of_birth": date(1991, 10, 3)
    },
    {
        "username": "ruma", "email": "ruma@company.com", "first_name": "Ruma",
        "last_name": "Akter", "role": "employee", "employee_id": "EMP1014",
        "password": "hashed_password_14", "phone": "01823456789", "address": "Jessore",
        "gender": "female", "status": "active", "hire_date": date(2022, 10, 30),
        "date_of_birth": date(1995, 3, 7)
    },
    {
        "username": "shakib", "email": "shakib@company.com", "first_name": "Shakib",
        "last_name": "Hassan", "role": "employee", "employee_id": "EMP1015",
        "password": "hashed_password_15", "phone": "01734567890", "address": "Gazipur",
        "gender": "male", "status": "active", "hire_date": date(2024, 2, 5),
        "date_of_birth": date(1999, 11, 19)
    },
    {
        "username": "tasneem", "email": "tasneem@company.com", "first_name": "Tasneem",
        "last_name": "Sultana", "role": "employee", "employee_id": "EMP1016",
        "password": "hashed_password_16", "phone": "01845678901", "address": "Narayanganj",
        "gender": "female", "status": "active", "hire_date": date(2023, 9, 18),
        "date_of_birth": date(1997, 7, 25)
    },
    {
        "username": "sabbir", "email": "sabbir@company.com", "first_name": "Sabbir",
        "last_name": "Ahmed", "role": "employee", "employee_id": "EMP1017",
        "password": "hashed_password_17", "phone": "01756789012", "address": "Dhaka",
        "gender": "male", "status": "active", "hire_date": date(2022, 4, 22),
        "date_of_birth": date(1993, 12, 11)
    },
    {
        "username": "moriom", "email": "moriom@company.com", "first_name": "Moriom",
        "last_name": "Begum", "role": "employee", "employee_id": "EMP1018",
        "password": "hashed_password_18", "phone": "01867890123", "address": "Bogra",
        "gender": "female", "status": "active", "hire_date": date(2023, 12, 14),
        "date_of_birth": date(1996, 4, 9)
    },
    {
        "username": "jahid", "email": "jahid@company.com", "first_name": "Jahid",
        "last_name": "Islam", "role": "manager", "employee_id": "EMP1019",
        "password": "hashed_password_19", "phone": "01778901234", "address": "Dhaka",
        "gender": "male", "status": "active", "hire_date": date(2020, 11, 5),
        "date_of_birth": date(1989, 8, 16)
    },
    {
        "username": "sultana", "email": "sultana@company.com", "first_name": "Sultana",
        "last_name": "Rahman", "role": "employee", "employee_id": "EMP1020",
        "password": "hashed_password_20", "phone": "01889012345", "address": "Pabna",
        "gender": "female", "status": "active", "hire_date": date(2024, 3, 8),
        "date_of_birth": date(2001, 5, 21)
    }
]

print(f"Inserting {len(demo_employees)} employees...")

for emp in demo_employees:
    # Randomly assign department
    dept, dept_id = random.choice(departments)
    
    # Randomly assign designation
    desig, desig_id = random.choice(designations)
    
    # Randomly assign grade (1-4)
    grade = random.randint(1, 4)
    
    # Randomly assign 2-4 skills from the pool
    emp_skills = random.sample(skills_pool, k=random.randint(2, 4))
    skills_str = ",".join(emp_skills)  # Store as comma-separated string
    
    cursor.execute("""
        INSERT INTO employees
        (username, email, first_name, last_name, role, employee_id, password,
         phone, address, department, department_id, designation, designation_id,
         position, gender, grade, skills, salary, status, hire_date, date_of_birth)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        emp["username"], emp["email"], emp["first_name"], emp["last_name"],
        emp["role"], emp["employee_id"], emp["password"], emp["phone"],
        emp["address"], dept, dept_id, desig, desig_id, desig,
        emp["gender"], grade, skills_str, None,  # salary is NULL
        emp["status"], emp["hire_date"], emp["date_of_birth"]
    ))

conn.commit()
print(f"✓ {len(demo_employees)} employees inserted successfully!")
print("✓ All salaries are NULL (will be predicted by ML model)")

cursor.close()
conn.close()