from django.db import models
from colorfield.fields import ColorField
from django.contrib.auth.models import User

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=70, unique=True)
    def __str__(self):
        return self.name

class ProductGroup(models.Model):
    name = models.CharField(max_length=250)
    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=250)
    image = models.ImageField(upload_to='media')
    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=450)
    price = models.IntegerField()
    description = models.TextField()
    dop_information = models.CharField(max_length=1024)
    category = models.ForeignKey(Category,related_name='products', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    slug = models.SlugField(max_length=70, unique=True)
    group = models.ForeignKey(ProductGroup,related_name='products', on_delete=models.CASCADE)
    count = models.IntegerField()
    raiting = models.FloatField()
    color = ColorField(default='#FF0000')
    # Brand
    def __str__(self):
        return self.title

class Color(models.Model):
    product = models.ForeignKey(Product,related_name='colors', on_delete=models.CASCADE)
    color = ColorField(default='#FF0000')
    name = models.CharField(max_length=250)

class Size(models.Model):
    product = models.ForeignKey(Product,related_name='sizes', on_delete=models.CASCADE)
    SIZE_CHOICE = [
        ('XS','XS'),
        ('S','S'),
        ('M','M'),
        ('L','L'),
        ('XL','XL'),
    ]
    size = models.CharField(max_length=2,choices=SIZE_CHOICE,default='XS')

class ProductImage(models.Model):
    image = models.ImageField(upload_to='media')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    

    
class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    
from uuid import uuid4

class ProductToCart(models.Model):
#    id_product = models.IntegerField(default=uuid4().int)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='tocart')
    SIZE_CHOICE = [
        ('XS','XS'),
        ('S','S'),
        ('M','M'),
        ('L','L'),
        ('XL','XL'),
    ]
    size = models.CharField(max_length=2,choices=SIZE_CHOICE,default='XS')
    count = models.IntegerField(default=1)
    cart =  models.ForeignKey(Cart,on_delete=models.CASCADE,related_name='products')

    
    
    
    
    
    
class Subscribe(models.Model):
    email = models.CharField(max_length=150)
    def __str__(self):
        return self.email



class Order(models.Model):
    name = models.CharField(max_length=150)
    second_name = models.CharField(max_length=150)
    email = models.CharField(max_length=150)
    phone = models.CharField(max_length=150)
    addres = models.CharField(max_length=250)
    city = models.CharField(max_length=150)
    zip_index = models.CharField(max_length=100)
    region = models.CharField(max_length=100,default='')
    comment = models.TextField()
    price = models.IntegerField()
    payed = models.BooleanField(default=False)
    def __str__(self):
        return "%s %s - %s"%(self.name,self.second_name,self.price)
    
    
class ProductToOrder(models.Model):
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='toorder')
    SIZE_CHOICE = [
        ('XS','XS'),
        ('S','S'),
        ('M','M'),
        ('L','L'),
        ('XL','XL'),
    ]
    size = models.CharField(max_length=2,choices=SIZE_CHOICE,default='XS')
    color = ColorField(default='#FF0000')
    count = models.IntegerField(default=1)
    order =  models.ForeignKey(Order,on_delete=models.CASCADE,related_name='products')