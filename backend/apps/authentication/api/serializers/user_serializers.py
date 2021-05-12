from rest_framework import serializers
from apps.authentication.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:

        model = User
        fields = ('username',)

class UserRegistrationSerializer(serializers.ModelSerializer):
    

    password = serializers.CharField(
        min_length = 8,
        write_only=True,
        style={'input_type': 'text', 'placeholder': 'Password'}
    )

    password2 = serializers.CharField(
        write_only=True,
        style={'input_type': 'text', 'placeholder': 'Password confirmation'}
    )
    
    class Meta:
        model = User
        fields = ('username','password','password2')


    def validate_username(self,value):

        if len(value) < 6:
            raise serializers.ValidationError('Username must contains at least 6 characters')

        if not all(char.isalnum() for char in value):
            raise serializers.ValidationError('Only alphanumeric characters')
        
        return value

    def validate_password2(self,value):
        if self.context['request'].data.get('password') != value:
            raise serializers.ValidationError('Passwords must be the same') 

        return value


        
    def create(self,validated_data):
        password2 = validated_data.pop('password2')
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        
        return user