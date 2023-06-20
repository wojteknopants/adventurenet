from rest_framework import serializers, status
from rest_framework.test import APITestCase

from .models import UserProfile, UserAccount

TEST_USER_EMAIL = 'test@localhost.app'
TEST_USER_PASSWORD = 'strongpassword1'

class RegistrationTestCase(APITestCase):

    def test_registration(self):
        data = {'email': TEST_USER_EMAIL, 'password': TEST_USER_PASSWORD, 're_password': TEST_USER_PASSWORD}
        response = self.client.post('/api/auth/users/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        new_user: UserAccount = UserAccount.objects.get(email=TEST_USER_EMAIL)
        new_user.is_active = True
        new_user.save()


class AppInteractionTests(APITestCase):

    access_token: str or None = None
    refresh_token: str or None = None
    test_user: UserAccount or None = None

    def setUp(self) -> None:
        self._create_test_user()
        self._perform_login()

    def test_user_details(self):
        response = self.client.get('/api/auth/users/me/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_endpoint_authentication(self):
        self.client.logout()
        response = self.client.get('/api/auth/users/me/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)



    def test_reset_password(self):
        data = {'email':'test@localhost.app'}
        response = self.client.post('/api/auth/users/reset_password/', data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_password_change(self):
        data = {'new_password':'newpassword1','re_new_password': 'newpassword1', 'current_password': 'strongpassword1'}
        response = self.client.post('/api/auth/users/set_password/', data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_wrong_password_change(self):
        data = {'new_password':'newpassword1','re_new_password': 'newpassword1', 'current_password': 'wrongpassword1'}
        response = self.client.post('/api/auth/users/set_password/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_email_change(self):
        data = {'current_password':'strongpassword1', 'new_email': 'test1@localhost.app', 're_new_email': 'test1@localhost.app'}
        response = self.client.post('/api/auth/users/set_email/', data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    
    def test_wrong_email_change(self):
        data = {'current_password':'wrongpassword1', 'new_email': 'test1@localhost.app', 're_new_email': 'test1@localhost.app'}
        response = self.client.post('/api/auth/users/set_email/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    
    def test_token_refresh(self):
        data = {'refresh': self.refresh_token}
        response = self.client.post('/api/auth/jwt/refresh/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_bad_token_refresh(self):
        data = {'refresh': self.access_token}
        response = self.client.post('/api/auth/jwt/refresh/', data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_token_verify(self):
        data = {'token': self.refresh_token}
        response = self.client.post('/api/auth/jwt/verify/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_refresh_token_verify(self):
        data = {'refresh': self.refresh_token}
        response = self.client.post('/api/auth/jwt/refresh/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    
    
    def test_create_post(self):
        data = {'title':'test title', 'content': 'test content'}
        response = self.client.post('/api/posts/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_create_empty_post(self):
        data = {'title':'', 'content':''}
        response = self.client.post('/api/posts/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_create_only_title_post(self):
        data = {'title':'test title', 'content':''}
        response = self.client.post('/api/posts/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    def test_get_posts(self):
        response = self.client.get('/api/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    
    def _create_test_user(self):
        test_user: UserAccount = UserAccount.objects.create_user(TEST_USER_EMAIL, TEST_USER_PASSWORD)
        test_user.is_active = True
        test_user.save()
        self.test_user = test_user

    def _perform_login(self):
        data = {'email': TEST_USER_EMAIL, 'password': TEST_USER_PASSWORD}
        response = self.client.post('/api/auth/jwt/create/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.access_token = response.data['access']
        self.refresh_token = response.data['refresh']
        self.client.force_authenticate(user=self.test_user)
