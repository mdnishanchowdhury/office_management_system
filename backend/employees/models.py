from django.contrib.auth.models import User
from django.db import models


# ROLE CHOICES - Define what roles a user can have
class RoleChoices(models.TextChoices):
    """
    Two roles in our system:
    - HRADMIN: Can manage all employees (create, read, update, delete)
    - EMPLOYEE: Can only view and update their own profile (contact & address only)
    """
    HRADMIN = 'hradmin', 'HR Admin'
    EMPLOYEE = 'employee', 'Employee'

class StatusChoices(models.TextChoices):
    ACTIVE = 'active', 'Active'
    INACTIVE = 'inactive', 'Inactive'
    RESIGNED = 'resigned', 'Resigned'

class gradeChoices(models.TextChoices):
    ACTIVE = 'grade1', 'Grade1'
    INACTIVE = 'grade2', 'Grade2'
    RESIGNED = 'grade3', 'Grade3'


# EMPLOYEE MODEL - Stores employee information
class Employee(models.Model):
    """
    Employee model - stores all employee information.
    Each employee is linked to a Django User for authentication.
    """
    
    # Link to Django's built-in User model (for login)
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='employee_profile'
    )
    
    # Role - determines what the user can do
    role = models.CharField(
        max_length=20,
        choices=RoleChoices.choices,
        default=RoleChoices.EMPLOYEE
    )
    
    # Basic Information
    employee_id = models.CharField(max_length=20, unique=True)  # e.g., "EMP001"
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    
    # Contact Information (Employee can update these)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    # Work Information (Only HR Admin can update these)
    department = models.CharField(max_length=100, blank=True)
    position = models.CharField(max_length=100, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    hire_date = models.DateField(null=True, blank=True)
    
    # Personal Information
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, blank=True)
    
    # Status
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.ACTIVE)
    
    # grade
    grade= models.CharField(max_length=20, choices=gradeChoices.choices, default=gradeChoices.ACTIVE)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['employee_id']  # Sort by employee ID by default

    def __str__(self):
        return f"{self.employee_id} - {self.first_name} {self.last_name}"
    
    # HELPER METHODS - Make it easy to check user role
    def is_hr_admin(self):
        """Check if this employee is an HR Admin"""
        return self.role == RoleChoices.HRADMIN
    
    def is_employee(self):
        """Check if this employee is a regular Employee"""
        return self.role == RoleChoices.EMPLOYEE
    
    def get_full_name(self):
        """Return the full name of the employee"""
        return f"{self.first_name} {self.last_name}"
