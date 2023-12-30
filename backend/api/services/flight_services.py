import requests
from datetime import datetime
from requests.exceptions import RequestException
from django.conf import settings

CORS_API_CONFIGS = {
	"corsProxy": 'https://proxy.cors.sh/',
	"CORS_API_KEY": 'temp_63a747a611787b66d6f36b85833d6aa4' #cors.sh test api key for development
	}
SKYSCANNER_API_KEY = settings.SKYSCANNER_API_KEY
# Constants
SEARCH_URL = 'https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights'
BASE_URL = "https://partners.api.skyscanner.net/apiservices/v3/flights/indicative/search"


def fetch_flight_culturedata(ipAddress):
    """
    Fetch flight search suggestions from the API 
    """

    CULTURE_URL = f"https://partners.api.skyscanner.net/apiservices/v3/culture/nearestculture?ipAddress={ipAddress}"
    headers = {"x-api-key": SKYSCANNER_API_KEY,
               'x-cors-api-key': CORS_API_CONFIGS['CORS_API_KEY']}  # Replace with your actual API key
    
    try:
        response = requests.get(url=CULTURE_URL, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP error codes
        return response.json()
    except RequestException as e:
        print(f"Error fetching flight culture data: {e}")
        # Return or raise an appropriate error or response
        return {"error": str(e)}

def fetch_flight_search_suggestions(searchTerm, locale, market):
    """
    Fetch flight search suggestions from the API 
    """
    headers = {"x-api-key": SKYSCANNER_API_KEY}  # Replace with your actual API key
    payload = {
        "query": {
            "locale": locale,
            "market": market,
            "searchTerm": searchTerm,
            "includedEntityTypes": ['PLACE_TYPE_AIRPORT', 'PLACE_TYPE_CITY', 'PLACE_TYPE_COUNTRY'],
            
        },
        "limit": 10,  #Adjust as needed. Setting to 10 for now
		"isDestination": False # Adjust based on your requirements
    }

    try:
        response = requests.post(SEARCH_URL, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception for HTTP error codes
        return response.json()
    except RequestException as e:
        print(f"Error fetching flight search: {e}")
        # Return or raise an appropriate error or response
        return {"error": str(e)}

def fetch_flight_offers(origin_place, year, month, currency="GBP", locale="en-GB", market="UK"):
    """
    Fetch flight offers from the API with error handling.
    """
    headers = {"x-api-key": SKYSCANNER_API_KEY}  # Replace with your actual API key
    payload = {
        "query": {
            "currency": currency,
            "locale": locale,
            "market": market,
            "queryLegs": [{
                "originPlace": {
                    "queryPlace": {"entityId": origin_place}
                },
                "destinationPlace": {"anywhere": True},
                "dateRange": {
                    "startDate": {"year": year, "month": month},
                    "endDate": {"year": year, "month": month}
                }
            }]
        }
    }

    try:
        response = requests.post(BASE_URL, headers=headers, json=payload)
        response.raise_for_status()  # Raise an exception for HTTP error codes
        return response.json()
    except RequestException as e:
        print(f"Error fetching flight offers: {e}")
        # Return or raise an appropriate error or response
        return {"error": str(e)}


def preprocess_data(response):
    # Extract necessary data
    by_route_data = response['content']['groupingOptions']['byRoute']['quotesGroups']
    places_data = response['content']['results']['places']
    quotes_data = response['content']['results']['quotes']
    carriers_data = response['content']['results']['carriers']

    # Initialize destination countries data structure
    destination_countries = {}

    for route in by_route_data:
        # Extract origin and destination IDs
        origin_id = route['originPlaceId']
        destination_id = route['destinationPlaceId']

        # Extract names using place IDs
        origin_name = places_data.get(origin_id, {}).get("name", "Unknown")
        origin_iata = places_data.get(origin_id, {}).get("iata", None)
        destination_name = places_data.get(
            destination_id, {}).get("name", "Unknown")

        # Initialize the country group if it doesn't exist
        if destination_name not in destination_countries:
            destination_countries[destination_name] = {
                'cheapest': float('inf'),
                'has_direct': False,
                'flights': []
            }

        # Process each quote ID in the route
        for quote_id in route['quoteIds']:
            quote_info = quotes_data.get(quote_id)
            if quote_info:
                # Extract flight details
                price = float(quote_info['minPrice']['amount'])
                is_direct = quote_info['isDirect']
                destination_city_id = quote_info['outboundLeg']['destinationPlaceId']
                destination_city_name = places_data.get(destination_city_id, {}).get("name", "Unknown")
                destination_iata = places_data.get(destination_city_id, {}).get("iata", None)
                year = quote_info['outboundLeg']['departureDateTime']['year']
                month = quote_info['outboundLeg']['departureDateTime']['month']
                day = quote_info['outboundLeg']['departureDateTime']['day']
                carrier_id = quote_info['outboundLeg']['marketingCarrierId']
                carrier_name = carriers_data[carrier_id]['name']
                carrier_imageurl = carriers_data[carrier_id]['imageUrl']

                # Update the country group with the cheapest price and direct flight info
                country_group = destination_countries[destination_name]
                country_group['cheapest'] = min(
                    country_group['cheapest'], price)
                country_group['has_direct'] = country_group['has_direct'] or is_direct

                # Add the flight to the country group's flight list
                country_group['flights'].append({
                    'origin': origin_name,
                    'origin_id': origin_id,
                    'origin_iata': origin_iata,
                    'destination': destination_city_name,
                    'destination_id': destination_id,
                    'destination_iata': destination_iata,
                    'price': price,
                    'is_direct': is_direct,
                    'date': {
                        'day': day,
                        'month': month,
                        'year': year
                    },
                    "carrier_name": carrier_name,
                    "carrier_imageurl": carrier_imageurl
                })

    return destination_countries
