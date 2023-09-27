from django.shortcuts import render,redirect
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import AppUser
from .serializers import UserSerializer 


@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
      return Response({'error': "Username or Password invalid.", 'status' : status.HTTP_404_NOT_FOUND})
  token, created = Token.objects.get_or_create(user=user)
  # app_user = AppUser.objects.get(user = user)
  serializer = UserSerializer(user)
  return Response({'token': token.key, 'user': serializer.data['username']})


@api_view(['POST'])
def signup(request):
  serializer = UserSerializer(data = request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.get(username = request.data['username'])
    user.first_name = request.data['firstName']
    user.last_name = request.data['lastName']
    user.set_password(request.data['password'])
    user.save()
    Token.objects.create(user=user)
    role = request.data['role']
    AppUser.objects.create(user = user, role=role)
    return Response({'user': user.username, 'role': role})
  else:
    return Response({'user': request.data['username'], 'error': serializer.errors, 'status':status.HTTP_400_BAD_REQUEST})


@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("Token success")


def home(request):
  return render(request, 'home.html')
