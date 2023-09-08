from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Skill
from .serializers import SkillSerializer


class SkillAPIView(APIView):
    def get(self, request):
        names = request.query_params.getlist('name')
        skills = Skill.objects.filter(name__in=names)
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        name = request.data.get('name')
        if not name:
            return Response({'error': 'name not found in request'}, status=status.HTTP_400_BAD_REQUEST)

        skill = Skill.objects.get(name=name)
        if not skill:
            return Response({'error': 'Skill not found'}, status=status.HTTP_404_NOT_FOUND)

        vector = request.data.get('vector')
        skill_list = request.data.get('skill_list')

        if vector is not None:
            skill.vector = vector

        skill.save()
        return Response(SkillSerializer(skill).data)

    def delete(self, request):
        name = request.query_params.get('name')
        skill = Skill.objects.get(name=name)
        if not skill:
            return Response({'error': 'Skill not found'}, status=status.HTTP_404_NOT_FOUND)

        skill.delete()
        return Response({'message': 'Skill deleted successfully'})


class SkillsListAPIView(APIView):
    def get(self, request):
        is_all = request.query_params.getlist('all')
        if is_all:
            skills = Skill.objects.all()
        else:
            names = request.query_params.getlist('name')
            skills = Skill.objects.filter(name__in=names)

        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializers = [SkillSerializer(data=item) for item in request.data["data"]]
        if all(serializer.is_valid() for serializer in serializers):
            instances = [serializer.save() for serializer in serializers]
            return Response(SkillSerializer(instances, many=True).data, status=status.HTTP_201_CREATED)
        errors = [serializer.errors for serializer in serializers if not serializer.is_valid()]
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

