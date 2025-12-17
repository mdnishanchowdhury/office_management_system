# 🏢 Office Employee Management System (Django + ML)

A full-featured **Employee Management System** built with **Django Rest Framework**, featuring **role-based access**, **JWT/Token authentication**, and an **ML-powered salary prediction system**.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* Token-based authentication
* Role-based access control:

  * **HR Admin**

    * Manage all employees (CRUD)
    * Predict salaries using ML
  * **Employee**

    * View own profile
    * Update contact information only

### 👨‍💼 Employee Management

* Create, view, update, delete employees (HR only)
* Employee profile with:

  * Department, position, grade
  * Skills (comma-separated)
  * Status (Active / Inactive / Resigned)

### 🤖 ML Salary Prediction

* Predict salary based on:

  * Grade
  * Department ID
  * Designation ID
  * Skills
* Uses trained ML model (`.pkl` files)
* Accessible **only by HR Admin**

### 🗄️ Database

* Django ORM (default)
* Separate MySQL scripts for:

  * Database setup
  * Demo data insertion

---

## 🛠️ Tech Stack

* **Backend:** Django, Django REST Framework
* **Auth:** Token Authentication
* **Database:** MySQL
* **ML:** Scikit-learn, Pandas, NumPy
* **API Client:** React / Postman

---

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mdnishanchowdhury/office_management_system
cd office-employee-management
```

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate      # Windows
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5️⃣ Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

### 6️⃣ Run the Server

```bash
python manage.py runserver
```

Server will start at:

```
http://127.0.0.1:8000/
```

---

## 🧪 MySQL Setup (Optional)

### Create Database

```bash
python setup_database.py
```

### Insert Demo Data

```bash
python insert_database.py
```

---


## 📌 Future Improvements

* JWT authentication
* Frontend dashboard (React)
* Attendance & leave system
* Salary history tracking

---
# 🍽️ Frontend

A modern and responsive **Office Management System Website Frontend** built with **React**, **Tailwind CSS**, and popular React libraries.
This project focuses on performance, user experience, and clean UI components.

---


## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mdnishanchowdhury/office_management_system
cd restaurant-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

App will run at:

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
