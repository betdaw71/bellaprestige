from django.shortcuts import render

from .models import *


from django.shortcuts import  render, redirect
from .forms import NewUserForm
from django.contrib.auth import login, authenticate, logout 
from django.contrib import messages #import messages
from django.contrib.auth.forms import AuthenticationForm #add this


from django.shortcuts import render, redirect
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes


def register_request(request):
	if request.method == "POST":
		form = NewUserForm(request.POST)
		if form.is_valid():
			user = form.save()
			login(request, user)
			messages.success(request, "Registration successful." )
			return redirect("home")
		messages.error(request, "Unsuccessful registration. Invalid information.")
	form = NewUserForm
	return render (request=request, template_name="account/register.html", context={"register_form":form})

def login_request(request):
	if request.method == "POST":
		form = AuthenticationForm(request, data=request.POST)
		if form.is_valid():
			username = form.cleaned_data.get('username')
			password = form.cleaned_data.get('password')
			user = authenticate(username=username, password=password)
			if user is not None:
				login(request, user)
				messages.info(request, f"You are now logged in as {username}.")
				return redirect("main:homepage")
			else:
				messages.error(request,"Invalid username or password.")
		else:
			messages.error(request,"Invalid username or password.")
	form = AuthenticationForm()
	return render(request=request, template_name="account/login.html", context={"login_form":form})

def logout_request(request):
	logout(request)
	messages.info(request, "You have successfully logged out.") 
	return redirect("home")



def password_reset_request(request):
	if request.method == "POST":
		password_reset_form = PasswordResetForm(request.POST)
		if password_reset_form.is_valid():
			data = password_reset_form.cleaned_data['email']
			associated_users = User.objects.filter(Q(email=data))
			if associated_users.exists():
				for user in associated_users:
					subject = "Password Reset Requested"
					email_template_name = "main/password/password_reset_email.txt"
					c = {
					"email":user.email,
					'domain':'127.0.0.1:8000',
					'site_name': 'Website',
					"uid": urlsafe_base64_encode(force_bytes(user.pk)),
					"user": user,
					'token': default_token_generator.make_token(user),
					'protocol': 'http',
					}
					email = render_to_string(email_template_name, c)
					try:
						send_mail(subject, email, 'admin@example.com' , [user.email], fail_silently=False)
					except BadHeaderError:
						return HttpResponse('Invalid header found.')
					return redirect ("/password_reset/done/")
	password_reset_form = PasswordResetForm()
	return render(request=request, template_name="account/password_reset.html", context={"password_reset_form":password_reset_form})



def index(request):

	items = ProductGroup.objects.all()
	context = {
		'items':items
	}
	return render(request,'main/index.html',context=context)

def catalog(request):
    return render(request,'main/catalog.html')

def item(request,slug):
	product = Product.objects.get(slug=slug)

	context={
		'product':product,
	}

	return render(request,'main/item.html',context=context)


def policy(request):
    return render(request,'main/policy.html')

def servicerules(request):
    return render(request,'main/servicerules.html')

def table(request):
    return render(request,'main/table.html')
    
def requisites(request):
    return render(request,'main/requisites.html')
def return_and_exchange(request):
    return render(request,'main/return_and_exchange.html')
def warranty(request):
    return render(request,'main/warranty.html')
def delivery(request):
    return render(request,'main/delivery.html')


def about(request):
    return render(request,'main/about.html')
def advantage(request):
    return render(request,'main/advantage.html')
def ytp(request):
    return render(request,'main/ytp.html')
def contact(request):
    return render(request,'main/contact.html')
def opt(request):
    return render(request,'main/opt.html')