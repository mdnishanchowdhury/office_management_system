from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('api/auth/login/', views.LoginView.as_view(), name='login'),
    path('api/auth/logout/', views.LogoutView.as_view(), name='logout'),
    
    # Profile
    path('api/profile/', views.MyProfileView.as_view(), name='my-profile'),
    
    # Employee Management (HR Admin only)
    path('api/employees/', views.EmployeeListView.as_view(), name='employee-list'),
    path('api/employees/<int:employee_id>/', views.EmployeeDetailView.as_view(), name='employee-detail'),
    
    # Salary Prediction (HR Admin only) - No employee_id needed
    path('api/predict-salary/', views.PredictSalaryView.as_view(), name='predict-salary'),
]

