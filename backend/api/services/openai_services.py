from django.conf import settings
from openai import OpenAI

def convert_newlines(input_string):
    return input_string.replace('\n', '<br>')

def extract_between_markers(text, start_marker="!START!", stop_marker="!STOP!"):
    start_index = text.find(start_marker)
    stop_index = text.find(stop_marker)

    if start_index != -1 and stop_index != -1:
        # Add the length of the start marker to the start index to get the actual start of the content
        start_index += len(start_marker)
        return text[start_index:stop_index].strip()
    else:
        return text

def generate_itinerary(json_data):
    try:
        
        client = OpenAI(api_key = settings.OPENAI_API_KEY)

        response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {
                    "role": "system",
                    "content": """Your task is to help generate daily itinerary by adding a creative narrative for provided data. You will receive a message with data in JSON format with attractions proposed for each day. Each day consists of parts: morning, afternoon, evening. Lets call them day-parts. Each day-part has "doing" and "eating" attribute.  In "doing" you will find either an array of "sights" or a single "tour". In "eating" you will find a restaurant that will start the day-part, because we start from eating and then we go doing. 
For each day your task is to make a itinerary with placeholders for attractions names and links (see example further below). Each day also has "distances" array. In each day starting from after first attraction (breakfast) include a placeholder for distance to next attraction.  Do not include first distance value of the day which is 0. Its distance to the first point where we actually start the day.
I want you to return itinerary for each day. Each itinerary start with title "Day 1" or "Day 2" and so on. 
All the necessary data is provided in a JSON format sent with a message. User's message will always contain only this JSON data, no other comments. Always finish entire itinerary, for each day. Don't ask user whether to continue, assume he can't reply.

Your response should be in markdown format, formatted as in the example. Name of the place, with a link to google maps with relative latitude, longitude, "id" of the object in html comment, and walk to the next attraction is a distance value with a link to the google maps with relative latitude, longitude of starting point and next point.
This is the example style I want you to write in. Always start itinerary with '!START!' and end with '!STOP!', never add any comments from yourself between these two markers. Never add any comments from yourself nowhere, just narration.
!START!
**DAY 1**
*Savor the Culture & Gardens of Paris*

**Morning.**
Savor a sumptuous morning at [Angelina](https://maps.google.com/?q=48.865093,2.328464)<!-- id: E9C13A1913 --> and start your day with their renowned pastries and tea. 
Walk [0.28 km](https://maps.google.com/?saddr=48.865093,2.328464&daddr=48.864246,2.324892) through the lovely streets of the city till you reach [Jardin des Tuileries](https://maps.google.com/?q=48.864246,2.324892)<!-- id: 7CBD79F4BD -->, a peaceful oasis amidst the city buzz. Then, journey [2.06 km](https://maps.google.com/?saddr=48.864246,2.324892&daddr=48.860825,2.352633) ahead to marvel at the modern art collections housed within the [Centre Pompidou](https://maps.google.com/?q=48.860825,2.352633)<!-- id: EC7AE15DF5 -->.

**Afternoon.**
Refresh your palate at [Le Grand Véfour](https://maps.google.com/?q=48.86621,2.33801)<!-- id: 33EA4449E4 -->, a dining experience that tantalizes your taste buds. 
Post lunch, walk [1.23 km](https://maps.google.com/?saddr=48.86621,2.33801&daddr=48.852966,2.349902) to the historic [Cathédrale Notre-Dame de Paris](https://maps.google.com/?q=48.852966,2.349902)<!-- id: AA8E41776E -->. Feel the serenity and then stroll [1.71 km](https://maps.google.com/?saddr=48.852966,2.349902&daddr=48.84681,2.337546) through the manicured paths of [Jardin du Luxembourg](https://maps.google.com/?q=48.84681,2.337546)<!-- id: 13D98F7D12 -->. Conclude the afternoon with a [1.13 km](https://maps.google.com/?saddr=48.84681,2.337546&daddr=48.88672,2.343002) walk up to the hilltop [Basilique du Sacré-Cœur de Montmartre](https://maps.google.com/?q=48.88672,2.343002)<!-- id: 521DE91E65 --> and be rewarded with a breathtaking panorama of Paris.

**Evening.**
Dine at the elegant [Galeries Lafayette Haussmann](https://maps.google.com/?q=48.87301,2.33269)<!-- id: 31CEFDF0ED --> and enjoy their finesse in cuisine.
As twilight falls, return [1.7 km](https://maps.google.com/?saddr=48.87301,2.33269&daddr=48.864246,2.324892) to the [Jardin des Tuileries](https://maps.google.com/?q=48.864246,2.324892)<!-- id: 7CBD79F4BD --> if you wish for a serene sunset view or perhaps venture [1.13 km](https://maps.google.com/?saddr=48.864246,2.324892&daddr=48.860825,2.352633) back to the [Centre Pompidou](https://maps.google.com/?q=48.860825,2.352633)<!-- id: EC7AE15DF5 --> for an evening of cultural activities. Each moment is a perfect blend of peace and artistry to end your delightful first day.
!STOP!
"""
                    # The rest of your system message here
                },
                {
                    "role": "user",
                    "content": str(json_data)  # Pass the JSON data here
                }
            ],
            temperature=1,
            max_tokens=4096,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        
        return extract_between_markers(convert_newlines(response.choices[0].message.content))  # Extracting the generated text
    except Exception as e:
        print(f"Error: {e}")
        return None
