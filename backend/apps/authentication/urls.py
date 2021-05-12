from django.urls import path

                                                     
from apps.authentication.api.views.user_views import UserRegistrationAPIView,Login,isUsernameTaken,isAuthenticated
                                                     
urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view()),
    path('login/', Login.as_view()),
    path('is-username-taken/', isUsernameTaken.as_view()),
    path('is-authenticated/',isAuthenticated.as_view())
]
