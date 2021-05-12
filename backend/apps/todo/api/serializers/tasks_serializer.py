from rest_framework import serializers
from apps.todo.models import Task

class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        exclude = ('user',)


    def create(self,validated_data):

        user = self.context['request'].user
        title = validated_data['title']
        task = Task.objects.create(user=user, title=title)
        return task