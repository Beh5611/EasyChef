# Generated by Django 4.1.7 on 2023-03-30 04:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('cuisine', models.CharField(max_length=50)),
                ('serving', models.IntegerField()),
                ('image', models.ImageField(blank=True, default=None, upload_to='images/recipe/')),
                ('prep_time', models.CharField(max_length=50)),
                ('cook_time', models.CharField(max_length=50)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Recipes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('image', models.ImageField(blank=True, default=None, upload_to='images/steps/')),
                ('description', models.CharField(max_length=250)),
                ('recipe_ID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='step_list', to='Recipes.recipe')),
            ],
        ),
        migrations.CreateModel(
            name='Ingredient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('amount', models.IntegerField()),
                ('amount_type', models.CharField(choices=[('Tablespoon', 'Tablespoon'), ('Teaspoon', 'Teaspoon'), ('Ounces', 'Ounces'), ('Pounds', 'Pounds'), ('Milliliter', 'Milliliter'), ('Milligram', 'Milligram'), ('Gram', 'Gram'), ('Cup', 'Cup')], default='Gram', max_length=20)),
                ('recipe_ID', models.ManyToManyField(related_name='Ingredients', to='Recipes.recipe')),
            ],
        ),
        migrations.CreateModel(
            name='Diet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('recipe_ID', models.ManyToManyField(related_name='diets', to='Recipes.recipe')),
            ],
        ),
    ]
