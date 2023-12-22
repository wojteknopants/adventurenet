import requests
from requests.exceptions import HTTPError, RequestException
import uuid
from django.conf import settings

# Global variable to hold the session token
SESSION_TOKEN = None

def get_or_create_session_token():
    global SESSION_TOKEN
    if SESSION_TOKEN is None:
        SESSION_TOKEN = str(uuid.uuid4())
    return SESSION_TOKEN

def mapbox_search_suggest(query):
    session_token = get_or_create_session_token()
    url = "https://api.mapbox.com/search/searchbox/v1/suggest"
    params = {
        "q": query,
        "language": "en",
        "types": "country,region,district,place,city",
        "access_token": "pk.eyJ1Ijoid29qbWF0NCIsImEiOiJjbHFibDl2MzUyYXFoMnNwMTBnN29wbWpiIn0.rkMEPGAVf_Tav0eeDIisQA",#settings.MAPBOX_ACCESS_TOKEN,
        "session_token": session_token
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
        return response.json()
    except HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except RequestException as req_err:
        print(f"Error during requests to Mapbox API: {req_err}")
    except Exception as err:
        print(f"An unexpected error occurred: {err}")

    return {"error": "Unable to retrieve data from Mapbox API."}  # Return None or appropriate error response

def mapbox_search_retrieve(place_id):
    session_token = get_or_create_session_token()
    url = f"https://api.mapbox.com/search/searchbox/v1/retrieve/{place_id}"
    params = {
        "access_token": settings.MAPBOX_ACCESS_TOKEN,
        "session_token": session_token
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raises an HTTPError if the HTTP request returned an unsuccessful status code
        return response.json()
    except HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")
    except RequestException as req_err:
        print(f"Error during requests to Mapbox API: {req_err}")
    except Exception as err:
        print(f"An unexpected error occurred: {err}")

    return {"error": "Unable to retrieve data from Mapbox API."} # Return None or appropriate error response

def extract_location_tags(response):
    tags = set()
    
    # Check if the response contains the expected data
    if not response or 'features' not in response or not response['features']:
        return list(tags)

    feature = response['features'][0]
    properties = feature.get('properties', {})

    # Add the name of the main feature
    if 'name' in properties:
        tags.add(properties['name'].lower())

    # Define the types we're interested in
    types_of_interest = {'country', 'region', 'district', 'place', 'city'}

    # Extract the context object from the response
    context = properties.get('context', {})

    # Iterate through the context and extract names
    for context_type in types_of_interest:
        if context_type in context and 'name' in context[context_type]:
            tag = context[context_type]['name']
            tags.add(tag.lower())

    return list(tags)  # Convert the set to a list before returning



