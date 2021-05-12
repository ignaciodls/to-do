from rest_framework import views
from apps.authentication.api.serializers.user_serializers import UserRegistrationSerializer, UserSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

class UserRegistrationAPIView(views.APIView):
    
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self,request):

        serializer = self.serializer_class(data = request.data,context={'request':request})

        if serializer.is_valid():

            user = serializer.save()
            token = Token.objects.create(user=user).key



            return Response({'user':serializer.data,
                             'token':token},
                             status = status.HTTP_201_CREATED)

        else:

            return Response(serializer.errors,status = status.HTTP_400_BAD_REQUEST)


class Login(ObtainAuthToken):


    def post(self,request,*args,**kwargs):

        token_serializer = self.serializer_class(data = request.data, context={'request':request})
        if token_serializer.is_valid():

            user = token_serializer.validated_data['user']
            token = Token.objects.get(user=user).key

            user_serializer = UserSerializer(user)

    

            return Response({'user':user_serializer.data,
                             'token':token},
                             status.HTTP_200_OK)

        else:
            return Response({'error':'Invalid credentials'},status = status.HTTP_400_BAD_REQUEST)

class isUsernameTaken(views.APIView):

    permission_classes = [AllowAny]

    def get_user(self):

        username = self.request.data.get('username')
        user = UserSerializer.Meta.model.objects.filter(username=username).exists()
        return user
        

    def post(self,request):
        if self.get_user():
            return Response({'isUsernameAlreadyTaken':True})

        else:
            return Response({'isUsernameAlreadyTaken':False})

class isAuthenticated(views.APIView):
    
    permission_classes = (AllowAny,)

    def post(self,request):

        token = request.data['token']
        
        if Token.objects.filter(key=token).exists():

            return Response({'isAuthenticated':True})

        else:

            return Response({'isAuthenticated':False})