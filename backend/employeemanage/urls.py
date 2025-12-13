from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # Django Admin panel
    path('admin/', admin.site.urls),
    
    # Employee app URLs
    path('', include('employees.urls')),
    
    #login/logout
    path('api-auth/', include('rest_framework.urls')),
]
