from django.contrib import admin
from .models import Team, AppUser, Availability, Task, TaskLog

# Register your models here.

admin.site.register(Team)
admin.site.register(AppUser)
admin.site.register(Availability)
admin.site.register(Task)
admin.site.register(TaskLog)
