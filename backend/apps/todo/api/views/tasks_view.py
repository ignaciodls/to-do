from rest_framework.viewsets import ViewSet
from apps.todo.api.serializers.tasks_serializer import TaskSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your models here.


class TaskViewSet(ViewSet):

    serializer_class = TaskSerializer

    def get_queryset(self, pk = None):

        user = self.request.user
        if pk is None:
            queryset = TaskSerializer.Meta.model.objects.filter(user = user)
        
        else:
            queryset = TaskSerializer.Meta.model.objects.filter(user = user, id=pk).first()

        return queryset

    def list(self,request):
        tesk_serializer = self.serializer_class(self.get_queryset(),many=True)
        return Response(tesk_serializer.data, status = status.HTTP_200_OK)


    def retrieve(self, request, pk=None):
        if self.get_queryset(pk=pk):
            task_serializer = self.serializer_class(self.get_queryset(pk))      
            return Response(task_serializer.data, status = status.HTTP_200_OK)

        return Response(status = status.HTTP_400_BAD_REQUEST)
        
    def create(self, request):

        if self.serializer_class.Meta.model.objects.count() >= 50:
            return Response(status = status.HTTP_400_BAD_REQUEST)

        else:

            task_serializer = self.serializer_class(data = request.data, context={'request':request})
            if task_serializer.is_valid():
                task_serializer.save()
                return Response(task_serializer.data, status = status.HTTP_201_CREATED)
        
            return Response(status = status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        
        if self.get_queryset(pk=pk):
            task_serializer = self.serializer_class(self.get_queryset(pk=pk), data=request.data)
            if task_serializer.is_valid():
                task_serializer.save()
                return Response(task_serializer.data, status = status.HTTP_200_OK)
                    
        return Response(status = status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk):

        task = self.get_queryset(pk)

        if task:
            task.delete()
            return Response(status = status.HTTP_200_OK)

        else:
            return Response(status = status.HTTP_404_NOT_FOUND)
        
    