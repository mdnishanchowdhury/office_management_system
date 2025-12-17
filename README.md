# 🏢 Office Employee Management System Backend(Django + ML)

A full-featured *Employee Management System* built with *Django Rest Framework, featuring **role-based access, **Token-based authentication, and an **ML-powered salary prediction system*.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Token-based authentication
* Role-based access control:

  * *HR Admin*

    * Manage all employees (CRUD)
    * Predict salaries using ML
  * *Employee*

    * View own profile
    * Update contact information only

---

### 👨‍💼 Employee Management

* Create, view, update, delete employees (HR only)
* Employee profile includes:

  * Department, position, grade
  * Skills (comma-separated)
  * Status (Active / Inactive / Resigned)

---

### 🤖 ML Salary Prediction

* Predict salary based on:

  * Grade
  * Department ID
  * Designation ID
  * Skills
* Uses trained ML model (.pkl files)
* Accessible *only by HR Admin*

---

### 🗄️ Database

* Django ORM (default)
* MySQL support
* Separate scripts for:

  * Database setup
  * Demo data insertion
  * Django database user creation

---

## 🛠️ Tech Stack

* *Backend:* Django, Django REST Framework
* *Auth:* Token Authentication
* *Database:* MySQL
* *ML:* Scikit-learn, Pandas, NumPy
* *API Client:* React / Postman

---

## ⚙️ Backend Installation & Setup

### 1️⃣ Clone the Repository

bash
git clone https://github.com/mdnishanchowdhury/office_management_system
cd office-employee-management


---

### 2️⃣ Create Virtual Environment

bash
python -m venv venv
venv\Scripts\activate      # Windows


---

### 3️⃣ Install Dependencies

bash
pip install -r requirements.txt


---

### 4️⃣ MySQL: Create Django Database User (Recommended)

Before running migrations, create a dedicated MySQL user for Django.

Create a file (or run directly) with the following script:

python
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="zubair123"   # change to your MySQL root password
)

cursor = conn.cursor()

try:
    cursor.execute("DROP USER IF EXISTS 'django_user'@'localhost'")
    cursor.execute("CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'django_password123'")
    cursor.execute("GRANT ALL PRIVILEGES ON hr_office_db.* TO 'django_user'@'localhost'")
    cursor.execute("FLUSH PRIVILEGES")

    print("✓ Django user created successfully!")

except mysql.connector.Error as err:
    print(f"Error: {err}")

cursor.close()
conn.close()


👉 Then update your settings.py:

python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hr_office_db',
        'USER': 'django_user',
        'PASSWORD': 'django_password123',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}


---

### 5️⃣ Run Migrations

bash
python manage.py makemigrations
python manage.py migrate


---

### 6️⃣ Create Superuser (Optional)

bash
python manage.py createsuperuser


---

### 7️⃣ Run the Server

bash
python manage.py runserver


Server will start at:


http://127.0.0.1:8000/


---

## 🧪 MySQL Demo Data (Optional)

### Create Database

bash
python setup_database.py


### Insert Demo Data

bash
python insert_database.py


---

## 📌 Future Improvements

* JWT authentication
* Frontend dashboard (React)
* Attendance & leave system
* Salary history tracking

---

# # 🏢 Frontend (React + Tailwind)

A modern and responsive *Office Management System Frontend* built with *React, **Tailwind CSS*, and popular React libraries.

---

## ⚙️ Frontend Installation & Setup

### 1️⃣ Clone the Repository

bash
git clone https://github.com/mdnishanchowdhury/office_management_system
cd restaurant-frontend


---

### 2️⃣ Install Dependencies

bash
npm install


---

### 3️⃣ Start Development Server

bash
npm run dev


App will run at:


http://localhost:5173


---

## 🏗️ Build for Production

bash
npm run build


## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
