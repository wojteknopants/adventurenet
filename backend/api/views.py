from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from djoser.permissions import CurrentUserOrAdminOrReadOnly
from .permissions import OwnerOrAdmin, OwnerOrAdminOrReadOnly
from .models import UserProfile, Post, Comment, PostLike, CommentLike, Image
from .serializers import UserProfileSerializer, PostSerializer, CommentSerializer, PostLikeSerializer, CommentLikeSerializer, ImageSerializer

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework.response import Response
from rest_framework import status

# for ordering posts from newest to oldest
from rest_framework.filters import OrderingFilter


# LOGOUT - BLACKLIST JWT REFRESH TOKEN

# blacklist just provided JWT refresh token
class LogoutView(APIView):
    """Blacklists single refresh token that was sent"""
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"Success": "Refresh token has been succesfully blacklisted"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"Fail": "Something went wrong", "Details": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)

# blacklist all JWT refresh tokens belonging to the user
# (in case he logged in few times and has multiple to use)


class LogoutAllView(APIView):
    """Blacklists all of refresh tokens that user has received (e.g. multiple devices, or multi log-in)"""
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        try:
            for token in tokens:
                t, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"Fail": "Something went wrong", "Details": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)


# PROFILE INFO

class UserProfileListCreateView(ListCreateAPIView):
    """It returns list of UserProfiles when GET,
    it creates new object when POST"""
    permission_classes = [
        IsAdminUser]  # only admin can list info of all profiles at once, also only admin can create a new profile (not recommended, profile should be auto created only through registration)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class UserProfileRetrieveUpdateView(RetrieveUpdateAPIView):
    """It returns single object when GET, updates object when PATCH, and destroys when DELETE. Requires user.id as url parameter, e.g. profiles/1/.
    Can be used as profiles/me/ to show/edit profile of JWT Token owner """

    http_method_names = ['get', 'patch', 'delete', 'head', 'options']

    def get_object(self):
        # if instead profiles/{user.id}/ we would use profiles/me/ (to capture user.id from JWT token)
        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            self.kwargs['user__pk'] = user.pk
            return super().get_object()
        else:
            return super().get_object()

    # only current user or admin can edit profile info, everybody can read profile info
    permission_classes = [OwnerOrAdminOrReadOnly]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'user__pk'

# POSTS


class PostRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """GET specific post, PUT/PATCH specific post, DELETE specific post"""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [OwnerOrAdminOrReadOnly]
    lookup_field = 'pk'

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class PostListCreateView(ListCreateAPIView):
    """List all posts on GET or create post on POST"""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserPostListView(ListAPIView):
    """GET all posts from specific user"""
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_queryset(self):

        user_id = self.kwargs['user__pk']  # keyword variable captured from url
        # if instead profiles/{user.id}/ we would use profiles/me/ (to capture user.id from JWT token)
        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            user_id = user.pk

        return Post.objects.filter(user_id=user_id)


# COMMENTS

class CommentListView(ListAPIView):
    """GET all comments from the app. Just for admins, may be useful"""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # all comments from the app call is (for now) only available to admins
    permission_classes = [IsAdminUser]


class CommentRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    """GET specific comment, PUT/PATCH specific comment, DELETE specific comment"""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [OwnerOrAdminOrReadOnly]
    lookup_field = 'pk'


class PostCommentListCreateView(ListCreateAPIView):
    """List all comments for specific post on GET, or create new comment for post on POST"""
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Comment.objects.filter(post__id=self.kwargs['post_id'])

    def perform_create(self, serializer):
        post = Post.objects.get(pk=self.kwargs['post_id'])
        #for debug-------------
        #post.recount_comments()
        #----------------------
        serializer.save(user=self.request.user, post=post)


class UserCommentListView(ListAPIView):
    """GET all comments of specific user"""
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user_id = self.kwargs['user__pk']  # keyword variable captured from url
        # if instead profiles/{user.id}/ we would use profiles/me/ (to capture user.id from JWT token)
        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            user_id = user.pk

        return Comment.objects.filter(user_id=user_id)

# LIKES


class PostLikeView(APIView):
    """
    View to handle POST and DELETE requests for liking a Post (PostLike).
    After succesfull like/unlike, returns Post object
    """

    def post(self, request, pk):
        post = Post.objects.get(pk=pk)
        post_like, created = PostLike.objects.get_or_create(
            user=request.user, post=post)

        if created:
            # Re-fetch the post from the database to get the updated likes_count
            post = Post.objects.get(pk=pk)

            #for debug
            #post.recount_likes() 
            post_serializer = PostSerializer(post, context={'request': request})
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        post = Post.objects.get(pk=pk)
        post_like = PostLike.objects.filter(user=request.user, post=post)

        if post_like.exists():
            post_like.delete()

            # Re-fetch the post from the database to get the updated likes_count
            post = Post.objects.get(pk=pk)

            #for debug
            #post.recount_likes()

            # Serialize and return the updated post
            post_serializer = PostSerializer(post, context={'request': request})
            return Response(post_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'Not liked yet'}, status=status.HTTP_400_BAD_REQUEST)


class CommentLikeView(APIView):
    """
    View to handle POST and DELETE requests for liking a Comment (CommentLike).
    After succesfull like/unlike, returns Comment object
    """

    def post(self, request, pk):
        comment = Comment.objects.get(pk=pk)
        comment_like, created = CommentLike.objects.get_or_create(
            user=request.user, comment=comment)

        if created:

            # Re-fetch the comment from the database to get the updated likes_count
            comment = Comment.objects.get(pk=pk)

            #for debug
            comment.recount_likes()
            
            # Serialize and return the updated comment
            comment_serializer = CommentSerializer(comment, context={'request': request})
            return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        comment = Comment.objects.get(pk=pk)
        comment_like = CommentLike.objects.filter(
            user=request.user, comment=comment)

        if comment_like.exists():
            comment_like.delete()

            # Re-fetch the comment from the database to get the updated likes_count
            comment = Comment.objects.get(pk=pk)

            #for debug
            comment.recount_likes()

            # Serialize and return the updated comment
            comment_serializer = CommentSerializer(comment, context={'request': request})
            return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'Not liked yet'}, status=status.HTTP_400_BAD_REQUEST)
        
# OLD VERSIONS, RETURNS SOMETHING ELSE
# class PostLikeView(APIView):
#     """
#     View to handle POST and DELETE requests for liking a Post (PostLike).
#     """
#     def post(self, request, pk):
#         post = Post.objects.get(pk=pk)
#         post_like, created = PostLike.objects.get_or_create(user=request.user, post=post)

#         if created:
#             serializer = PostLikeSerializer(post_like)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'detail': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         post = Post.objects.get(pk=pk)
#         post_like = PostLike.objects.filter(user=request.user, post=post)

#         if post_like.exists():
#             post_like.delete()
#             return Response({'detail': 'Post unliked'}, status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response({'detail': 'Not liked yet'}, status=status.HTTP_400_BAD_REQUEST)

# class CommentLikeView(APIView):
#     """
#     View to handle POST and DELETE requests for liking a Comment (CommentLike).
#     """
#     def post(self, request, pk):
#         comment = Comment.objects.get(pk=pk)
#         comment_like, created = CommentLike.objects.get_or_create(user=request.user, comment=comment)

#         if created:
#             serializer = CommentLikeSerializer(comment_like)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response({'detail': 'Already liked'}, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         comment = Comment.objects.get(pk=pk)
#         comment_like = CommentLike.objects.filter(user=request.user, comment=comment)

#         if comment_like.exists():
#             comment_like.delete()
#             return Response({'detail': 'Post unliked'}, status=status.HTTP_204_NO_CONTENT)
#         else:
#             return Response({'detail': 'Not liked yet'}, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, pk):
#         comment = Comment.objects.get(pk=pk)
#         try:
#             comment_like = CommentLike.objects.get(user=request.user, comment=comment)
#             comment_like.delete()
#             return Response({'detail': 'Post unliked'}, status=status.HTTP_204_NO_CONTENT)
#         except CommentLike.DoesNotExist:
#             return Response({'detail': 'Not liked yet'}, status=status.HTTP_400_BAD_REQUEST)


class CommentLikesListView(ListAPIView):
    """GET all likes for specific comment"""
    serializer_class = CommentLikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        comment_id = self.kwargs['pk']  # keyword variable captured from url
        return CommentLike.objects.filter(comment=comment_id)


class PostLikesListView(ListAPIView):
    """GET all likes for specific post"""
    serializer_class = PostLikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        post_id = self.kwargs['pk']  # keyword variable captured from url
        return PostLike.objects.filter(post=post_id)

# IMAGES (apart from built ins in Posts and Profiles)


class UserImagesListView(ListAPIView):
    """GET all images of specific user (well, all images from his posts)"""
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user_id = self.kwargs['user__pk']  # keyword variable captured from url
        # if instead profiles/{user.id}/ we would use profiles/me/ (to capture user.id from JWT token)
        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            user_id = user.pk

        return Image.objects.filter(user_id=user_id)
