from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView, DestroyAPIView, CreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from djoser.permissions import CurrentUserOrAdminOrReadOnly
from .permissions import OwnerOrAdmin, OwnerOrAdminOrReadOnly
from rest_framework.exceptions import PermissionDenied, ValidationError

from .models import UserProfile, Post, Comment, PostLike, CommentLike, Image, Itinerary, SavedItem, Adventure, AdventureJoinRequest, ChatMessage, UserAccount
from .serializers import UserProfileSerializer, PostSerializer, CommentSerializer, PostLikeSerializer, CommentLikeSerializer, ImageSerializer, GenerateItinerarySerializer, ItinerarySerializer, SavedItemSerializer, AdventureSerializer, AdventureJoinRequestSerializer, ChatMessageSerializer

from django.db.models import Subquery,OuterRef, Q

from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework.response import Response
from rest_framework import status

from .services.flight_services import fetch_flight_culturedata, fetch_flight_search_suggestions, fetch_flight_offers, preprocess_data
from .services.amadeus_services import get_city_search, get_points_of_interest, get_tours_and_activities, preprocess_poi_data, clean_tours_data
from .services.openai_services import generate_itinerary
from .services.mapbox_services import mapbox_search_retrieve, mapbox_search_suggest, extract_location_tags

from datetime import datetime


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
        
class CommentLikesListView(ListAPIView):
    """GET all likes for a specific comment"""
    serializer_class = CommentLikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        comment_id = self.kwargs.get('pk')  # Use .get() to avoid KeyError
        if comment_id:
            return CommentLike.objects.filter(comment=comment_id)
        return CommentLike.objects.none()  # Return an empty queryset when 'pk' is not available


class PostLikesListView(ListAPIView):
    """GET all likes for a specific post"""
    serializer_class = PostLikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs.get('pk')  # Use .get() to avoid KeyError
        if post_id:
            return PostLike.objects.filter(post=post_id)
        return PostLike.objects.none()  # Return an empty queryset when 'pk' is not available

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
    

#FLIGHTS (Skyscanner)
class FlightCultureDataAPIView(APIView):

    def get(self, request, *args, **kwargs):
        # Extract query parameters

        ipAddress = request.query_params.get('ipAddress')

        try:
            # Fetch and preprocess flight offers
            culturedata= fetch_flight_culturedata(ipAddress)
        except Exception as e:           
            # Return a generic error response
            return Response({'detail': 'Error fetching culture data.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        # Return the processed data as a JSON response
        return Response(culturedata)
     



class FlightSearchSuggestAPIView(APIView):
    """
    API View to fetch flight offers.
    """

    def post(self, request, *args, **kwargs):
        # Extract data directly from the request
        searchTerm = request.data.get('searchTerm')
        locale = request.data.get('locale')
        market = request.data.get('market')

        # Validate the data as necessary
        if not searchTerm or not locale or not market:
            return Response({"error": "Missing parameters"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            search_suggestions= fetch_flight_search_suggestions(searchTerm, locale, market)
        except Exception as e:
            # Return a generic error response
            return Response({'detail': 'Error fetching flight search suggestions.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        # Return a response
        return Response(search_suggestions)

class FlightOffersAPIView(APIView):
    """
    API View to fetch flight offers.
    """

    def get(self, request, *args, **kwargs):
        # Extract query parameters
        current_year = datetime.now().year
        current_month = datetime.now().month

        origin_place = request.query_params.get('originPlace')  # Default value
        year = request.query_params.get('year', str(current_year))
        month = request.query_params.get('month', str(current_month))
        currency = request.query_params.get('currency', 'GBP')  # Default value
        locale = request.query_params.get('locale', 'en-GB')  # Default value
        market = request.query_params.get('market', 'UK')  # Default value

        # Validate the parameters
        try:
            year = int(year)
            month = int(month)
            if not (1 <= month <= 12):
                raise ValueError("Month must be between 1 and 12.")

            # Ensure the year is within the next two years
            if year < current_year or year > current_year + 2:
                raise ValueError("Year must be within the range of current year to next two years.")

            # Ensure the month is not in the past for the current year
            if year == current_year and month < current_month:
                raise ValueError("Month cannot be in the past for the current year.")

        except ValueError as e:
            return Response({'detail': + str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Fetch and preprocess flight offers
            raw_data = fetch_flight_offers(origin_place, year, month, currency, locale, market)
            processed_data = preprocess_data(raw_data)
        except Exception as e:           
            # Return a generic error response
            return Response({'detail': 'Error fetching flight offers.' + str(e)}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        # Return the processed data as a JSON response
        return Response(processed_data)
    
#AMADEUS 
    
class CitySearchAPIView(APIView):
    """
    API View to get City names suggestions.
    """

    def get(self, request, *args, **kwargs):
        keyword = request.query_params.get('keyword')
        if not keyword:
            return Response({"error": "Keyword parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            results = get_city_search(keyword)
            if results is None:
                return Response({"error": "Error fetching data from Amadeus API."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            return Response(results)
        except Exception as e:
            # Log the error for debugging
            print(f"Internal server error: {e}")
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class POISearchAPIView(APIView):
    def get(self, request, *args, **kwargs):
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')

        if not latitude or not longitude:
            return Response({"error": "Latitude and longitude parameters are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            results = get_points_of_interest(latitude, longitude)
            if results is None:
                return Response({"error": "Error fetching data from Amadeus API."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            return Response(results)
        except Exception as e:
            # Log the error for debugging
            print(f"Internal server error: {e}")
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ToursActivitiesSearchAPIView(APIView):
    def get(self, request, *args, **kwargs):
        latitude = request.query_params.get('latitude')
        longitude = request.query_params.get('longitude')

        if not latitude or not longitude:
            return Response({"error": "Latitude and longitude parameters are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            results = clean_tours_data(get_tours_and_activities(latitude, longitude))
            if results is None:
                return Response({"error": "Error fetching data from Amadeus API."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            return Response(results)
        except Exception as e:
            # Log the error for debugging
            print(f"Internal server error: {e}")
            return Response({"error": "Internal server error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

import time

#OPENAI

class GenerateItineraryView(APIView):
    def post(self, request, *args, **kwargs):
        start_time = time.perf_counter()
        serializer = GenerateItinerarySerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            latitude = validated_data.get('latitude')
            longitude = validated_data.get('longitude')
            number_of_days = validated_data.get('number_of_days')
            intensiveness = validated_data.get('intensiveness')

            # Assuming you have defined these functions
            poi_data = get_points_of_interest(latitude, longitude)
            tour_data = None #get_tours_and_activities(latitude, longitude) #AMADEUS TOURS NOT WORKING, ISSUE ON THEIR SIDE
            cleaned_tour_data = clean_tours_data(tour_data)
            itinerary_poi_dict = preprocess_poi_data(poi_data, cleaned_tour_data, number_of_days, intensiveness)
            end_time = time.perf_counter()
            print("Django time check: ", end_time-start_time)
            start_time = time.perf_counter()
            itinerary_narrated = generate_itinerary(itinerary_poi_dict)
            end_time = time.perf_counter()
            print("OpenAI time check: ", end_time-start_time)

            return Response(itinerary_narrated, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#MAPBOX (tags)
        
class MapboxSuggestView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.query_params.get('query')
        if not query:
            return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = mapbox_search_suggest(query)
            return Response(response)
        except Exception:
            return Response({"error": "An error occurred while processing your request."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

class MapboxRetrieveView(APIView):
    def get(self, request, *args, **kwargs):
        place_id = request.query_params.get('place_id')
        if not place_id:
            return Response({"error": "Place ID parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = mapbox_search_retrieve(place_id)
            tags = extract_location_tags(response)
            return Response({"tags": tags})
        except Exception:
            return Response({"error": "An error occurred while processing your request."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

#ITINERARIES CRUD
        
class ItineraryListCreateView(ListCreateAPIView):
    """
    List All -> GET
    Create -> POST body: content: string,
    thats all"""
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ItineraryRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticated, OwnerOrAdminOrReadOnly]
    lookup_field = 'pk'

class UserItinerariesListView(ListAPIView):
    """GET all itineraries from specific user"""
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticated]

    ordering_fields = ['created_at']
    ordering = ['-created_at']

    def get_queryset(self):

        user_id = self.kwargs['user__pk']  # keyword variable captured from url
        # if instead profiles/{user.id}/ we would use profiles/me/ (to capture user.id from JWT token)
        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            user_id = user.pk

        return Itinerary.objects.filter(user_id=user_id)
    
    
#CHAT VIEWS

class MyInboxView(ListAPIView):
    
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user_id = self.kwargs['user__pk']

        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            user_id = user.pk

        messages = ChatMessage.objects.filter(
            id__in = Subquery(
                UserAccount.objects.filter(
                    Q(sender__reciever=user_id)|
                    Q(reciever__sender=user_id)
                ).distinct().annotate(
                    last_msg = Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'),reciever=user_id)|
                            Q(reciever=OuterRef('id'),sender = user_id)
                        ).order_by("-id")[:1].values_list("id",flat=True)
                    )
                    
                ).values_list('last_msg',flat=True).order_by('-id')
            )
        ).order_by('-id')
        
        return messages
    
class GetMessagesView(ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        sender_id = self.kwargs['sender_id']
        reciever_id = self.kwargs['reciever_id']
        
        messages = ChatMessage.objects.filter(
            sender__in = [sender_id, reciever_id],
            reciever__in = [sender_id, reciever_id]
        )
        return messages
    
class SendMessageView(CreateAPIView):
    serializer_class = ChatMessageSerializer
    # permission_classes = [IsAuthenticated]
    
class ProfileDetailsView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    permission_classes = [IsAuthenticated]
    
class SearchUserView(ListAPIView):
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    # permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        username = self.kwargs['username']
        logged_in_user = self.request.user
        users = UserProfile.objects.filter(
            Q(username__icontains=username)|
            Q(name__icontains=username)|
            Q(surname__icontains=username)
        )
        
        if not users.exists():
            return Response(
                {'detail':'No users found'},
                status = status.HTTP_404_NOT_FOUND
            )
        
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)
    
    
class UserSavedItemListView(ListAPIView):
    serializer_class = SavedItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_pk = self.kwargs.get('user__pk')
        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            user_pk = user.pk

        if self.request.user.pk == user_pk:
        # The user is viewing their own saved items

            return SavedItem.objects.filter(user=self.request.user)
        else:
        # Viewing another user's saved items
        # Logic is split in case we want to implement separate permissions for privacy
            
            return SavedItem.objects.filter(user__pk=user_pk)

class SavedItemCreateView(CreateAPIView):
    serializer_class = SavedItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        saved_item = serializer.save(user=self.request.user)

        # Check if content_object is Post or Itinerary
        content_object = saved_item.content_object
        if isinstance(content_object, Post) or isinstance(content_object, Itinerary):
            # Prepare the response data
            response_data = serializer.data
            # Manually set the is_saved flag in the response data
            response_data['content_object']['is_saved'] = True
            return Response(response_data)

        return super().perform_create(serializer)


class SavedItemDestroyView(APIView):
    permission_classes = [IsAuthenticated, OwnerOrAdminOrReadOnly]

    def delete(self, request, *args, **kwargs):
        content_type = request.data.get('content_type')
        object_id = request.data.get('object_id')
        user = request.user

        serializer = SavedItemSerializer()
        result = serializer.delete_saved_item(content_type, object_id, user)
        return Response(result)
    
class SavedItemCreateDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = SavedItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            saved_item = serializer.save(user=request.user)

            # Check if content_object is Post or Itinerary
            content_object = saved_item.content_object
            if isinstance(content_object, Post) or isinstance(content_object, Itinerary):
                # Prepare the response data
                response_data = serializer.data
                # Manually set the is_saved flag in the response data
                response_data['content_object']['is_saved'] = True
                return Response(response_data)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        content_type = request.data.get('content_type')
        object_id = request.data.get('object_id')
        user = request.user

        serializer = SavedItemSerializer()
        result = serializer.delete_saved_item(content_type, object_id, user)
        return Response(result)
    
#Adventures



class AdventureListCreateView(ListCreateAPIView):
    queryset = Adventure.objects.all()
    serializer_class = AdventureSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This method returns a list of all the adventures that match the tags
        provided in the request's query parameters, if any.
        """
        queryset = super().get_queryset()
        tags = self.request.query_params.get('tags')

        if tags:
            tags_list = tags.split(",")
            queryset = queryset.filter(tags__name__in=tags_list).distinct()

        return queryset

    def perform_create(self, serializer):
        """
        This method is called when a new adventure is created. It sets the user
        field to the current request user.
        """
        serializer.save(user=self.request.user)

class AdventureRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Adventure.objects.all()
    serializer_class = AdventureSerializer
    permission_classes = [IsAuthenticated, OwnerOrAdminOrReadOnly]
    lookup_field = 'pk'

class SpecificUserAdventureListView(ListAPIView):
    serializer_class = AdventureSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Returns join requests for adventures owned by the current user
        return Adventure.objects.filter(user=self.request.user)

    def get_queryset(self):
        user_pk = self.kwargs.get('user__pk')
        if self.kwargs['user__pk'] == 'me':
            user = self.request.user
            user_pk = user.pk

        if self.request.user.pk == user_pk:
        # The user is viewing their own adventures

            return Adventure.objects.filter(user=self.request.user)
        else:
        # Viewing another user's adventures
        # Logic is split in case we want to implement separate permissions for privacy
            
            return Adventure.objects.filter(user__pk=user_pk)
        
#Adventure join requests
    
class AdventureJoinRequestCreateView(CreateAPIView):
    serializer_class = AdventureJoinRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class IncomingAdventureJoinRequestsListView(ListAPIView):
    serializer_class = AdventureJoinRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Returns join requests for adventures owned by the current user
        return AdventureJoinRequest.objects.filter(adventure__user=self.request.user)

class AdventureJoinRequestUpdateDestroyView(UpdateAPIView, DestroyAPIView):
    serializer_class = AdventureJoinRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        return AdventureJoinRequest.objects.all()

    def perform_update(self, serializer):
        join_request = self.get_object()
        user = self.request.user
        request_status = self.request.data.get('status')

        if join_request.adventure.user == user:  # Adventure owner
            if request_status == 'accepted':
                join_request.adventure.participants.add(join_request.user)
                join_request.status = request_status
                join_request.save()
            elif request_status == 'rejected':
                join_request.status = request_status
                join_request.save()
            else:
                raise ValidationError("Invalid status requested. As owner of Adventure you can make it join request either 'accepted' or 'rejected'.")
        elif join_request.user == user:  # Join request owner
            if request_status == 'cancelled':
                join_request.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                raise ValidationError("As sender of this join request, you can only make it 'cancelled'.")
        else:
            raise PermissionDenied("You do not have permission to modify this join request.")

    def delete(self, request, *args, **kwargs):
        """
        Allow the request owner to cancel the join request.
        """
        join_request = self.get_object()
        user = request.user

        if join_request.user != user:
            raise PermissionDenied("You do not have permission to cancel this join request.")

        return self.destroy(request, *args, **kwargs)


class ThisAdventureJoinRequestsListView(ListAPIView):
    serializer_class = AdventureJoinRequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        adventure_id = self.kwargs.get('adventure_id')
        adventure = Adventure.objects.filter(id=adventure_id).first()

        if not adventure:
            raise PermissionDenied("Adventure not found.")

        if adventure.user == self.request.user:
            # Owner of the adventure: show all pending requests
            return AdventureJoinRequest.objects.filter(adventure=adventure, status='pending')
        else:
            # Non-owner: show only their own request, if pending or rejected (displayed as pending)
            return AdventureJoinRequest.objects.filter(adventure=adventure, user=self.request.user, status__in=['pending', 'rejected'])

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        # Proceed with normal processing if the queryset is not empty
        if queryset:
            if queryset.first().adventure.user != request.user:
            # Alter response for non-owners with rejected requests
                for request_data in serializer.data:
                    if request_data['status'] == 'rejected':
                        request_data['status'] = 'pending'

            return Response(serializer.data)

        # Return an empty response if there are no join requests
        return Response([])

