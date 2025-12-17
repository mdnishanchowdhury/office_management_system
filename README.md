# 🏢 Office Employee Management System

**Backend (Django + ML) & Frontend (React + Tailwind)**

A full-featured **Office Employee Management System** built with **Django REST Framework** and a modern **React frontend**, featuring **role-based access**, **token-based authentication**, and an **ML-powered salary prediction system**.

---

## 🚀 Backend Features (Django + ML)

### 🔐 Authentication & Authorization

* Token-based authentication
* Role-based access control:

  * **HR Admin**

    * Manage all employees (CRUD)
    * Predict salaries using ML
  * **Employee**

    * View own profile
    * Update contact information only

---

### 👨‍💼 Employee Management

* Create, view, update, delete employees (HR only)
* Employee profile includes:

  * Department
  * Position
  * Grade
  * Skills (comma-separated)
  * Status (Active / Inactive / Resigned)

---

### 🤖 ML Salary Prediction

* Predict salary based on:

  * Grade
  * Department ID
  * Designation ID
  * Skills
* Uses trained ML models (`.pkl` files)
* Accessible **only by HR Admin**

---

### 🗄️ Database

* Django ORM
* MySQL database
* Separate scripts for:

  * Database setup
  * Demo data insertion
  * Django database user creation

---

## 🛠️ Backend Tech Stack

* **Framework:** Django (Python 3.11.9), Django( 4.2 ) REST Framework
* **Authentication:** Token Authentication
* **Database:** MySQL
* **ML:** Scikit-learn, Pandas, NumPy
* **API Client:** React / Postman

---

## ⚙️ Backend Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mdnishanchowdhury/office_management_system
cd office_management_system
```

---

### 2️⃣ Create Virtual Environment
```bash
cd backend
```

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

---

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4️⃣ MySQL: Create Django Database User (Recommended)

```python
import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_mysql_root_password"
)

cursor = conn.cursor()

cursor.execute("DROP USER IF EXISTS 'django_user'@'localhost'")
cursor.execute("CREATE USER 'django_user'@'localhost' IDENTIFIED BY 'django_user_password'")
cursor.execute("GRANT ALL PRIVILEGES ON hr_office_db.* TO 'django_user'@'localhost'")
cursor.execute("FLUSH PRIVILEGES")

print("✓ Django user created successfully!")

cursor.close()
conn.close()
```

Update `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hr_office_db',
        'USER': 'django_user',
        'PASSWORD': 'django_user_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

---

### 5️⃣ Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### 6️⃣ Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

---

# .env
```bash
pip install python-dotenv
```
## Create .env:

```
DB_ENGINE=django.db.backends.mysql
DB_NAME=hr_office_db
DB_USER=django_user
DB_PASSWORD=django_user_password
DB_HOST=localhost
DB_PORT=3306
DEBUG=True
SECRET_KEY=django-insecure-*tgc)n*2)8o!_u&g5fo^tne8-=&3!(45$qja5-m4cuj3ub_k3_
```

### 7️⃣ Run Backend Server

```bash
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

---

## 🧪 MySQL Demo Data (Optional)

### Create Database

```bash
python setup_database.py
```

### Insert Demo Data

```bash
python insert_database.py
```

---

## 🎨 Frontend (React + Tailwind)

A modern and responsive **Office Management System Frontend** built with **React**, **Vite**, **Tailwind CSS**, and popular React libraries.

### 🚀 Frontend Features

* Login & logout
* Role-based dashboard (HR / Employee)
* Employee management UI
* Salary prediction UI
* Responsive design

---

## ⚙️ Frontend Installation & Setup

### 1️⃣ Go to Frontend Folder

```bash
cd frontend
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start Development Server

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

---


## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
