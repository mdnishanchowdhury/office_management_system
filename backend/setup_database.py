import mysql.connector

# Connect to MySQL server
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="nishan123"  # Change to your MySQL password
)

cursor = conn.cursor()

# Create database
cursor.execute("CREATE DATABASE IF NOT EXISTS hr_office_db")
cursor.execute("USE hr_office_db")

# Create employees table with new schema
cursor.execute("""
    CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        role VARCHAR(50),
        employee_id VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        department VARCHAR(100),
        department_id INT,
        designation VARCHAR(100),
        designation_id INT,
        position VARCHAR(100),
        gender VARCHAR(20),
        grade INT,
        skills TEXT,
        salary DECIMAL(12, 2) NULL,
        status VARCHAR(20) DEFAULT 'active',
        hire_date DATE,
        date_of_birth DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
""")

conn.commit()
print("✓ hr_office_db and employees table created successfully!")

cursor.close()
conn.close()