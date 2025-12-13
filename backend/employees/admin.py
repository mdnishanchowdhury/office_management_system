from django.contrib import admin
from .models import Employee


# EMPLOYEE ADMIN - Manage employees in Django Admin panel
@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    """
    Admin configuration for Employee model.
    This allows you to manage employees from /admin/ page.
    """
    
    # Columns to show in the list view
    list_display = [
        'employee_id',
        'first_name',
        'last_name',
        'email',
        'department',
        'position',
        'role',
        'status',
    ]
    
    # Fields to search by
    search_fields = [
        'employee_id',
        'first_name',
        'last_name',
        'email',
        'department',
    ]
    
    # Filters on the right side
    list_filter = [
        'role',
        'department',
        'status',
    ]
    
    # Default ordering
    ordering = ['employee_id']
    
    # Number of items per page
    list_per_page = 20
