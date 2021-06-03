from django.contrib import admin
from .models import * 
# Register your models here.

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3
    
class ColorInline(admin.StackedInline):
    model = Color
    extra = 0
    
class SizeInline(admin.StackedInline):
    model = Size
    extra = 0



class ProductAdmin(admin.ModelAdmin):
    list_display = ('title','price')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ColorInline,SizeInline,ProductImageInline]
    search_fields = ["group"]

    
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    

class ProductToOrderline(admin.StackedInline):
    model = ProductToOrder
    extra = 0
class OrederAdmin(admin.ModelAdmin):
    inlines = [ProductToOrderline]
    


admin.site.register(Category,CategoryAdmin)
admin.site.register(ProductGroup)
admin.site.register(Brand)
admin.site.register(Subscribe)
admin.site.register(Order,OrederAdmin)
admin.site.register(Product,ProductAdmin)
