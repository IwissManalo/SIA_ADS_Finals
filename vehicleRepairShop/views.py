import requests
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect
from .models import *
from .forms import *
from .request import *
from django.urls import reverse

# Create your views here.

def login_page(request):

    #TODO Verify if User is in DB then check if User is Customer or Employee. Then redirect to the appropriate pages.
    #TODO If Employee verify if that Employee is a Manager or not.

    if request.method == 'POST':

        form = UserLoginForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

    return render(request, 'login.html')

def home_page(request):
    return render(request, 'index.html')

def about_us(request):
    return render(request, 'about.html')

def create_account(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():

            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            response = register_user(first_name, last_name, email, username, password)            

            #TODO Add a Check for Email and Username if it already exists in the DB

            print(response.status_code)

            if 200 <= response.status_code < 300:
                messages.success(request, 'Registration successful. Proceed to Login Page.')
                return render(request, 'createManagerAccount.html')
            if 400 <= response.status_code:
                messages.success(request, 'Registration failed. Email or Username is already used.')
                return render(request, 'createManagerAccount.html')
            else:
                messages.error(request, 'Registration failed. Please try again.')
                return render(request, 'createManagerAccount.html')
        
        else:
            messages.error(request, 'Registration failed. Fields cannot be empty.')
            return render(request, 'createManagerAccount.html')

    else:

        form = UserRegistrationForm()
    
    return render(request, 'createManagerAccount.html')


def manager_portal(request):
    return render(request, 'managerPortal.html')

def employee_portal(request):
    return render(request, 'employeePortal.html')

def employee_sched(request):
    return render(request, 'employeeSched.html')

def register_employee(request):
    return render(request, 'registerEmployee.html')

def services_offered(request):
    return render(request, 'services.html')
