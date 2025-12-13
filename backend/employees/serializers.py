from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Employee, StatusChoices
from .models import Employee, gradeChoices


# EMPLOYEE SERIALIZER - Full access for HR Admin
class EmployeeSerializer(serializers.ModelSerializer):
    """
    Full Employee serializer - used by HR Admin to manage employees.
    HR Admin can see and update ALL fields.
    """
    
    class Meta:
        model = Employee
        fields = [
            'id',
            'employee_id',
            'first_name',
            'last_name',
            'email',
            'phone',
            'address',
            'department',
            'position',
            'salary',
            'hire_date',
            'date_of_birth',
            'gender',
            'role',
            'status',
            'grade',
            'created_at',
            'updated_at',
        ]
        # These fields cannot be changed after creation
        read_only_fields = ['id', 'created_at', 'updated_at']


# EMPLOYEE PROFILE SERIALIZER - Limited access for regular Employee
class EmployeeProfileSerializer(serializers.ModelSerializer):
    """
    Limited Employee serializer - used by regular Employees.
    Employees can only UPDATE their phone and address.
    Other fields are read-only (they can see but not change).
    """
    
    class Meta:
        model = Employee
        fields = [
            'id',
            'employee_id',
            'first_name',
            'last_name',
            'email',
            'phone',      
            'address',  
            'department',
            'position',
            'hire_date',
            'date_of_birth',
            'gender',
            'role',
            'status',
            'grade',
        ]
        # Employee can only update phone and address
        # Everything else is read-only
        read_only_fields = [
            'id',
            'employee_id',
            'first_name',
            'last_name',
            'email',
            'department',
            'position',
            'hire_date',
            'date_of_birth',
            'gender',
            'role',
            'status',
            'grade'
        ]


# USER REGISTRATION SERIALIZER - For creating new users
class UserRegistrationSerializer(serializers.Serializer):
    """
    Serializer for creating a new User + Employee together.
    Used by HR Admin when adding a new employee.
    """
    
    # User fields
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=8)
    
    # Employee fields
    employee_id = serializers.CharField(max_length=20)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    department = serializers.CharField(max_length=100, required=False, allow_blank=True)
    position = serializers.CharField(max_length=100, required=False, allow_blank=True)
    salary = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=0)
    hire_date = serializers.DateField(required=False, allow_null=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    gender = serializers.CharField(max_length=10, required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=['hradmin', 'employee'], default='employee')
    status = serializers.ChoiceField(choices=StatusChoices.choices, default=StatusChoices.ACTIVE)
    grade = serializers.ChoiceField(choices=gradeChoices.choices, default=gradeChoices.ACTIVE)
    
    def validate_username(self, value):
        """Check if username already exists"""
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value
    
    def validate_email(self, value):
        """Check if email already exists"""
        if Employee.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
    
    def validate_employee_id(self, value):
        """Check if employee_id already exists"""
        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError("Employee ID already exists.")
        return value
    
    def create(self, validated_data):
        """Create both User and Employee"""
        
        # Extract user data
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        
        # Create the User
        user = User.objects.create_user(
            username=username,
            password=password,
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
        )
        
        # Create the Employee linked to the User
        employee = Employee.objects.create(
            user=user,
            **validated_data
        )
        
        return employee


# LOGIN SERIALIZER - For user authentication
class LoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    Takes username and password, returns user if valid.
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        """Check if username and password are correct"""
        username = data.get('username')
        password = data.get('password')
        
        # Try to authenticate the user
        user = authenticate(username=username, password=password)
        
        if user is None:
            raise serializers.ValidationError("Invalid username or password.")
        
        if user.employee_profile.status != StatusChoices.ACTIVE:
            raise serializers.ValidationError("User account is disabled.")
        
        # Add user to validated data so we can use it in the view
        data['user'] = user
        return data
