from django.urls import path
from . import views

urlpatterns = [
    path('api/auth/login/', views.LoginView.as_view(), name='login'),
    path('api/auth/logout/', views.LogoutView.as_view(), name='logout'),
    path('api/profile/', views.MyProfileView.as_view(), name='my-profile'),
    path('api/employees/', views.EmployeeListView.as_view(), name='employee-list'),
    path('api/employees/<int:employee_id>/', views.EmployeeDetailView.as_view(), name='employee-detail'),
]
