from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Employee, StatusChoices, gradeChoices

# EMPLOYEE SERIALIZER - HR FULL ACCESS
class EmployeeSerializer(serializers.ModelSerializer):
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
            'skills',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


# EMPLOYEE PROFILE SERIALIZER - LIMITED EMPLOYEE ACCESS
class EmployeeProfileSerializer(serializers.ModelSerializer):
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
            'skills',
        ]
        read_only_fields = [
            'id', 'employee_id', 'first_name', 'last_name', 'email',
            'department', 'position', 'hire_date', 'date_of_birth',
            'gender', 'role', 'grade'
        ]


# USER REGISTRATION SERIALIZER
class UserRegistrationSerializer(serializers.Serializer):
    # USER FIELDS
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, min_length=8)

    # EMPLOYEE FIELDS
    employee_id = serializers.CharField(max_length=20)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    department = serializers.CharField(max_length=100, required=False, allow_blank=True)
    position = serializers.CharField(max_length=100, required=False, allow_blank=True)
    salary = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, allow_null=True)
    hire_date = serializers.DateField(required=False, allow_null=True)
    date_of_birth = serializers.DateField(required=False, allow_null=True)
    gender = serializers.CharField(max_length=10, required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=['hradmin', 'employee'], default='employee')
    status = serializers.ChoiceField(choices=StatusChoices.choices, default=StatusChoices.ACTIVE)
    grade = serializers.ChoiceField(choices=gradeChoices.choices, default=gradeChoices.ACTIVE)
    skills = serializers.CharField(required=False, allow_blank=True)  # comma-separated skills

  
    # VALIDATION
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if Employee.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate_employee_id(self, value):
        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError("Employee ID already exists.")
        return value

    # CREATE USER + EMPLOYEE
    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        # Create user
        user = User.objects.create_user(
            username=username,
            password=password,
            email=validated_data.get('email'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
        )

        # Create employee linked to user
        employee = Employee.objects.create(
            user=user,
            **validated_data
        )

        return employee


# LOGIN SERIALIZER
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid username or password.")

        if user.employee_profile.status != StatusChoices.ACTIVE:
            raise serializers.ValidationError("User account is disabled.")

        data['user'] = user
        return data
