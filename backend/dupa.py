import requests
from django.conf import settings
from datetime import datetime, timedelta
import random
#settings.configure()

access_token = None
token_expiry = None


def get_amadeus_access_token():

    global access_token, token_expiry

    url = "https://test.api.amadeus.com/v1/security/oauth2/token"  # Use the appropriate Amadeus URL


    payload = {
        'grant_type': 'client_credentials',
        'client_id': 'AENEg4ztxX9aAB62f2j8FYwTel1InJJq',
        'client_secret': 'QCm5hSDMD0r77H9z'
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

from math import radians, cos, sqrt

def get_distance_between(lat1, lon1, lat2, lon2):
    """
    Calculate the approximate distance in kilometers between two points 
    on the earth (specified in decimal degrees) using the Equirectangular approximation.
    """
    R = 6371  # Radius of the Earth in kilometers

    # Convert decimal degrees to radians
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    x = (lon2 - lon1) * cos(0.5 * (lat2 + lat1))
    y = lat2 - lat1
    distance = R * sqrt(x*x + y*y)
    return distance

import random

def find_closest_poi(current_poi, available_pois, all_pois):
    if not available_pois:
        available_pois = all_pois
        

    if current_poi is None:
        selected_poi = random.choice(available_pois)  # Pick random if no current poi
        distance = 0  # No distance to calculate
    else:
        # Find the closest POI to the current POI
        closest_poi, min_distance = None, float('inf')
        for poi in available_pois:
            distance = get_distance_between(
                current_poi['geoCode']['latitude'], current_poi['geoCode']['longitude'],
                poi['geoCode']['latitude'], poi['geoCode']['longitude'])
            if distance < min_distance and poi != current_poi:
                min_distance = distance
                closest_poi = poi
        selected_poi, distance = closest_poi, min_distance

    return selected_poi, round(distance, 2)

def preprocess_poi_data(poi_response, tour_response, number_of_days, intensiveness):
    if not poi_response or "data" not in poi_response:
        return {}

    # Group POIs by category
    grouped_pois = {'RESTAURANT': [], 'SIGHTS': []}
    for poi in poi_response["data"]:
        category = poi.get("category")
        if category in grouped_pois:
            grouped_pois[category].append(poi)

    # Clean and prepare tours data
    cleaned_tours = clean_tours_data(tour_response)["data"]
    number_of_tours = max(1, number_of_days // 2)
    tour_days = random.sample(range(1, number_of_days + 1), number_of_tours)
    tour_parts = random.choices(["morning", "afternoon", "evening"], k=number_of_tours)

    plan = {'days': []}
    used_pois = {'RESTAURANT': [], 'SIGHTS': []}

    # Define sight count based on intensiveness
    sight_count = {
        'easy': lambda: random.randint(1, 2),
        'hard': lambda: random.randint(2, 3)
    }

    for day in range(1, number_of_days + 1):
        day_activities = {'morning': {}, 'afternoon': {}, 'evening': {}}
        day_distances = []
        total_daily_distance = 0
        last_poi = None

        for part_index, part in enumerate(["morning", "afternoon", "evening"]):
            # Restaurant selection
            available_restaurants = [poi for poi in grouped_pois['RESTAURANT'] if poi not in used_pois['RESTAURANT']]
            restaurant_poi, distance_to_restaurant = find_closest_poi(last_poi, available_restaurants, grouped_pois['RESTAURANT'])
            day_activities[part]['eating'] = restaurant_poi if restaurant_poi else None
            used_pois['RESTAURANT'].append(restaurant_poi)
            day_distances.append(distance_to_restaurant)
            total_daily_distance += distance_to_restaurant
            last_poi = restaurant_poi

            # Check if this part of the day is designated for a tour
            if day in tour_days and part == tour_parts[tour_days.index(day)]:
                tour = random.choice(cleaned_tours)
                day_activities[part]['doing'] = [tour]
                # Assuming a fixed distance for tours, for simplicity
                tour_distance = 0
                day_distances.append(tour_distance)
                continue

            # Determine number of sights to visit based on intensiveness
            num_sights = sight_count[intensiveness]()

            # Sight selection
            sights_selected = []
            for _ in range(num_sights):
                available_sights = [poi for poi in grouped_pois['SIGHTS'] if poi not in used_pois['SIGHTS']]
                sight_poi, distance_to_sight = find_closest_poi(last_poi, available_sights, grouped_pois['SIGHTS'])
                if sight_poi:
                    sights_selected.append(sight_poi)
                    used_pois['SIGHTS'].append(sight_poi)
                    day_distances.append(distance_to_sight)
                    last_poi = sight_poi

            day_activities[part]['doing'] = sights_selected
            total_daily_distance = sum(day_distances)

        plan['days'].append({
            'activities': day_activities,
            'distances': day_distances,
            'total_distance': round(total_daily_distance, 2)
        })

    return plan

def clean_tours_data(response):
    """
    Clean the tours and activities response to remove tours that lack essential information.
    :param response: The response from the tours and activities API.
    :return: A cleaned response with only complete tours.
    """
    if not response or "data" not in response:
        return response  # Return the original response if it's not in the expected format

    cleaned_tours = []
    for tour in response["data"]:
        # Check for essential information: price, pictures, and minimum duration
        if "price" in tour and tour["price"] and \
           "pictures" in tour and tour["pictures"] and \
           "minimumDuration" in tour and tour["minimumDuration"]:
            cleaned_tours.append(tour)

    # Replace the original tours data with the cleaned list
    response["data"] = cleaned_tours
    response["meta"]["count"] = len(cleaned_tours)
    return response


#print(get_city_search('PARI'))
rsp= get_points_of_interest(latitude=48.85341, longitude=2.3488)
rspt= get_tours_and_activities(latitude=48.85341, longitude=2.3488)
#print(rsp)
#print(clean_tours_data(rspt))
print(preprocess_poi_data(rsp, rspt, 2, "hard"))


