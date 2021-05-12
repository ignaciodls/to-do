from rest_framework.routers import DefaultRouter
from apps.todo.api.views.tasks_view import TaskViewSet

router = DefaultRouter()

router.register(r'tasks',TaskViewSet, basename = 'todo')

urlpatterns = router.urls