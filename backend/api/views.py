# from django.shortcuts import render
# from .models import Post
# from .serializers import PostSerializer
# from rest_framework import viewsets
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.permissions import AllowAny
# from .serializers import UserAccountSerializer
# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import ensure_csrf_cookie
# from django.contrib.auth import authenticate, login, logout


# # Create your views here.
# #class PostViewSet(viewsets.ModelViewSet):
#  #   serializer_class = PostSerializer
#   #  queryset = Post.objects.all()

# #@method_decorator(ensure_csrf_cookie, name='dispatch')
# """class SignupView(APIView):
#     permission_classes = (AllowAny,)
    
#     def post(self, request):
#         serializer = UserAccountSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# """

# class RegisterView(APIView):
#     permission_classes = (AllowAny,)

#     def post(self, request):
#         serializer = UserAccountSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             #login(request, user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'error': 'Registration failed', 'details': serializer.errors},
#                             status=status.HTTP_400_BAD_REQUEST)

# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class LoginView(APIView):
#     permission_classes = (AllowAny,)

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         if email is None or password is None:
#             return Response({'error': 'Please provide both email and password'},
#                             status=status.HTTP_400_BAD_REQUEST)

#         user = authenticate(request, email=email, password=password)

#         if user is not None:
#             login(request, user)
#             return Response(status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'Invalid credentials'},
#                             status=status.HTTP_400_BAD_REQUEST)
        
# class LogoutView(APIView):
#     def post(self, request):
#         if request.user.is_authenticated:
#             logout(request)
#             return Response(status=status.HTTP_200_OK)
#         else:
#             return Response({'error': 'UserAccount is not authenticated'},
#                             status=status.HTTP_400_BAD_REQUEST)
    

# from .models import UserAccount
# from rest_framework.views import APIView
# from rest_framework import permissions
# from django.contrib import auth
# from rest_framework.response import Response
# from .serializers import UserAccountSerializer
# from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
# from django.utils.decorators import method_decorator

# class CheckAuthenticatedView(APIView):
#     def get(self, request, format=None):
#         user = self.request.user

#         try:
#             isAuthenticated = user.is_authenticated

#             if isAuthenticated:
#                 return Response({ 'isAuthenticated': 'success' })
#             else:
#                 return Response({ 'isAuthenticated': 'error' })
#         except:
#             return Response({ 'error': 'Something went wrong when checking authentication status' })

# @method_decorator(csrf_protect, name='dispatch')
# class SignupView(APIView):
#     permission_classes = (permissions.AllowAny, )

#     def post(self, request, format=None):
#         data = self.request.data

#         email = data['email']
#         password = data['password']
#         re_password  = data['re_password']

#         try:
#             if password == re_password:
#                 if UserAccount.objects.filter(email=email).exists():
#                     return Response({ 'error': 'Username already exists' })
#                 else:
#                     if len(password) < 6:
#                         return Response({ 'error': 'Password must be at least 6 characters' })
#                     else:
#                         user = UserAccount.objects.create_user(email=email, password=password)

#                         #user = UserAccount.objects.get(id=user.id)

#                         #user_profile = UserProfile.objects.create(user=user, first_name='', last_name='', phone='', city='')

#                         return Response({ 'success': 'UserAccount created successfully' })
#             else:
#                 return Response({ 'error': 'Passwords do not match' })
#         except:
#                 return Response({ 'error': 'Something went wrong when registering account' })

# @method_decorator(csrf_protect, name='dispatch')
# class LoginView(APIView):
#     permission_classes = (permissions.AllowAny, )

#     def post(self, request, format=None):
#         data = self.request.data

#         email = data['email']
#         password = data['password']

#         try:
#             user = auth.authenticate(email=email, password=password)

#             if user is not None:
#                 auth.login(request, user)
#                 return Response({ 'success': 'UserAccount authenticated' })
#             else:
#                 return Response({ 'error': 'Error Authenticating' })
#         except:
#             return Response({ 'error': 'Something went wrong when logging in' })

# class LogoutView(APIView):
#     def post(self, request, format=None):
#         try:
#             auth.logout(request)
#             return Response({ 'success': 'Loggout Out' })
#         except:
#             return Response({ 'error': 'Something went wrong when logging out' })

# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class GetCSRFToken(APIView):
#     permission_classes = (permissions.AllowAny, )

#     def get(self, request, format=None):
#         return Response({ 'success': 'CSRF cookie set' })

# class DeleteAccountView(APIView):
#     def delete(self, request, format=None):
#         user = self.request.user

#         try:
#             UserAccount.objects.filter(id=user.id).delete()

#             return Response({ 'success': 'UserAccount deleted successfully' })
#         except:
#             return Response({ 'error': 'Something went wrong when trying to delete user' })