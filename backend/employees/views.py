from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404

from .models import Employee, RoleChoices
from .serializers import (
    EmployeeSerializer,
    EmployeeProfileSerializer,
    UserRegistrationSerializer,
    LoginSerializer,
)

from .ml_predictor import SalaryPredictor
predictor = SalaryPredictor()

# LOGIN VIEW - User authentication (returns token)
class LoginView(APIView):
    """
    POST: Login with username and password.
    Returns a token that React app should store and send with every request.
    """
    permission_classes = [AllowAny]  # Anyone can try to login
    
    def post(self, request):
        """
        Login and get authentication token.
        
        Request body:
        {
            "username": "john",
            "password": "mypassword123"
        }
        
        Response:
        {
            "token": "abc123...",
            "user": {
                "id": 1,
                "username": "john",
                "email": "john@example.com",
                "role": "employee"
            }
        }
        """
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            
            # Get or create token for this user
            token, created = Token.objects.get_or_create(user=user)
            
            # Get user's role from employee profile
            try:
                role = user.employee_profile.role
                employee_id = user.employee_profile.employee_id
            except Employee.DoesNotExist:
                role = 'unknown'
                employee_id = None
            
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': role,
                    'employee_id': employee_id,
                    'grade': user.employee_profile.grade
                }
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# LOGOUT VIEW - Invalidate token
class LogoutView(APIView):
    """
    POST: Logout and delete the authentication token.
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Logout - deletes the user's token.
        The React app should also remove the token from storage.
        """
        # Delete the user's token
        try:
            request.user.auth_token.delete()
        except Token.DoesNotExist:
            pass
        
        return Response(
            {'message': 'Successfully logged out.'},
            status=status.HTTP_200_OK
        )


# HELPER FUNCTION - Check if user is HR Admin
def is_hr_admin(user):
    """
    Check if the logged-in user is an HR Admin.
    Returns True if user has hradmin role, False otherwise.
    """
    try:
        return user.employee_profile.role == RoleChoices.HRADMIN
    except Employee.DoesNotExist:
        return False

# EMPLOYEE LIST VIEW - List all employees (HR Admin only)
class EmployeeListView(APIView):
    """
    GET: List all employees (HR Admin only)
    POST: Create a new employee (HR Admin only)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        List all employees.
        Only HR Admin can see the full list.
        """
        # Check if user is HR Admin
        if not is_hr_admin(request.user):
            return Response(
                {'error': 'You do not have permission to view all employees.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get all employees
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        """
        Create a new employee.
        Only HR Admin can create employees.
        """
        # Check if user is HR Admin
        if not is_hr_admin(request.user):
            return Response(
                {'error': 'You do not have permission to create employees.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Validate and create the employee
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            employee = serializer.save()
            # Return the created employee data
            return Response(
                EmployeeSerializer(employee).data,
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# EMPLOYEE DETAIL VIEW - View, Update, Delete single employee (HR Admin only)
class EmployeeDetailView(APIView):
    """
    GET: View a single employee (HR Admin only)
    PUT: Update an employee (HR Admin only)
    DELETE: Delete an employee (HR Admin only)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, employee_id):
        """
        View a single employee's details.
        Only HR Admin can view any employee.
        """
        # Check if user is HR Admin
        if not is_hr_admin(request.user):
            return Response(
                {'error': 'You do not have permission to view this employee.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get the employee
        employee = get_object_or_404(Employee, id=employee_id)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, employee_id):
        """
        Update an employee's information.
        Only HR Admin can update any employee.
        """
        # Check if user is HR Admin
        if not is_hr_admin(request.user):
            return Response(
                {'error': 'You do not have permission to update this employee.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get and update the employee
        employee = get_object_or_404(Employee, id=employee_id)
        serializer = EmployeeSerializer(employee, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, employee_id):
        """
        Delete an employee.
        Only HR Admin can delete employees.
        """
        # Check if user is HR Admin
        if not is_hr_admin(request.user):
            return Response(
                {'error': 'You do not have permission to delete employees.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Get and delete the employee (also deletes the linked User)
        employee = get_object_or_404(Employee, id=employee_id)
        user = employee.user  # Get the linked user
        employee.delete()
        user.delete()  # Also delete the user account
        
        return Response(
            {'message': 'Employee deleted successfully.'},
            status=status.HTTP_204_NO_CONTENT
        )


# MY PROFILE VIEW - Employee can view and update their own profile
class MyProfileView(APIView):
    """
    GET: View my own profile (any logged-in user)
    PUT: Update my contact info (phone and address only)
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        View my own profile.
        Any logged-in user can view their own profile.
        """
        try:
            employee = request.user.employee_profile
            serializer = EmployeeProfileSerializer(employee)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Employee.DoesNotExist:
            return Response(
                {'error': 'Profile not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
    
    def put(self, request):
        """
        Update my own profile.
        Employees can only update phone and address.
        """
        try:
            employee = request.user.employee_profile
            
            # Use the limited serializer - only phone and address can be updated
            serializer = EmployeeProfileSerializer(
                employee,
                data=request.data,
                partial=True  # Allow partial updates
            )
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Employee.DoesNotExist:
            return Response(
                {'error': 'Profile not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

# SALARY PREDICTION VIEW - HR Admin only
# SALARY PREDICTION VIEW - HR Admin only (No employee required)
class PredictSalaryView(APIView):
    """
    POST: Predict salary based on grade, department, designation, and skills.
    This is a reference tool for HR to determine salary for NEW employees.
    Only HR Admin can perform this action.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Check HR Admin role
        if not is_hr_admin(request.user):
            return Response(
                {'error': 'You do not have permission to predict salaries.'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Get data from request body
        grade = request.data.get('grade')
        department_id = request.data.get('department_id')
        designation_id = request.data.get('designation_id')
        skills = request.data.get('skills', '')

        # Validate required fields
        if not all([grade, department_id, designation_id]):
            return Response(
                {'error': 'grade, department_id, and designation_id are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if predictor is None:
            return Response(
                {'error': 'ML Predictor not available.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        try:
            # Predict salary
            predicted_salary = predictor.predict_salary(
                grade=grade,
                skills_str=skills,
                department_id=department_id,
                designation_id=designation_id
            )

            return Response({
                'grade': grade,
                'department_id': department_id,
                'designation_id': designation_id,
                'skills': skills,
                'predicted_salary': float(predicted_salary),
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': f'Prediction failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

