from django.urls import path,include
from django.contrib.auth import views as auth_views #import this

from . import views

urlpatterns = [
    path('', views.index,name='home'),
    path('catalog/', views.catalog,name='catalog'),
    path('item/<slug:slug>',views.item,name='item'),
    path('policy/',views.policy,name='policy'),
    path('servicerules/',views.servicerules,name='servicerules'),
    path('table/',views.table,name='table'),
    path('help/requisites/',views.requisites,name='requisites'),
    path('help/return_and_exchange/',views.return_and_exchange,name='return_and_exchange'),
    path('help/warranty/',views.warranty,name='warranty'),
    path('help/delivery/',views.delivery,name='delivery'),
    path('info/about/',views.about,name='about'),
    path('info/advantage/',views.advantage,name='advantage'),
    path('info/ytp/',views.ytp,name='ytp'),
    path('info/contact/',views.contact,name='contact'),
    path('info/opt/',views.opt,name='opt'),



    path("register", views.register_request, name="register"),
    path("login", views.login_request, name="login"),
    path("logout", views.logout_request, name= "logout"),
    
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(template_name='account/password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(template_name="account/password_reset_confirm.html"), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='account/password_reset_complete.html'), name='password_reset_complete'),     

    path("password_reset", views.password_reset_request, name="password_reset"),
]