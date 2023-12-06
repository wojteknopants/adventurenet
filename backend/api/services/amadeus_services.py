import requests
from django.conf import settings
from datetime import datetime, timedelta

#settings.configure()

access_token = None
token_expiry = None


def get_amadeus_access_token():

    global access_token, token_expiry

    url = "https://test.api.amadeus.com/v1/security/oauth2/token"  # Use the appropriate Amadeus URL

    payload = {
        'grant_type': 'client_credentials',
        'client_id': settings.AMADEUS_API_KEY,
        'client_secret': settings.AMADEUS_API_SECRET
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    try:
        response = requests.post(url, data=payload, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP error codes
        
        token_info = response.json()
        access_token = token_info.get('access_token')
        expires_in = token_info.get('expires_in', 1799)

        token_expiry = datetime.now() + timedelta(seconds=expires_in)


        return access_token
    
    except requests.RequestException as e:
        print(f"Error obtaining Amadeus access token: {e}")
        return None
    

def is_token_valid():

    global token_expiry
    if access_token and token_expiry:
        return datetime.now() < token_expiry
    
    return False

def get_city_search(city_keyword):
    global access_token

    max_results = 5 #amount of suggestions returned for given keyword

    if not is_token_valid():
        get_amadeus_access_token()

    url = f"https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword={city_keyword}&max={max_results}"
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error calling Amadeus City Search API: {e}")
        return None


def get_points_of_interest(latitude, longitude):
    global access_token
    radius=5
    max_results=30

    if not is_token_valid():
        get_amadeus_access_token()

    url = "https://test.api.amadeus.com/v1/reference-data/locations/pois"
    params = {
        'latitude': latitude,
        'longitude': longitude,
        'radius': radius,
        'page[limit]': max_results
    }

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error calling Amadeus POI API: {e}")
        return None
    
def get_tours_and_activities(latitude, longitude):

    global access_token
    radius = 5

    if not is_token_valid():
        get_amadeus_access_token()

    url = "https://test.api.amadeus.com/v1/shopping/activities"
    params = {
        'latitude': latitude,
        'longitude': longitude,
        'radius': radius
    }

    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error calling Amadeus Tours and Activities API: {e}")
        return None

    
