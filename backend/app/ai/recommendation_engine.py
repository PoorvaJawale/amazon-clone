from app.ai.openai_client import client
from app.ai.prompts import RECOMMENDATION_PROMPT

def generate_recommendations(
    activity,
    searches,
    wishlist,
    orders,
    products
):

    prompt = RECOMMENDATION_PROMPT.format(
        activity=activity,
        searches=searches,
        wishlist=wishlist,
        orders=orders,
        products=products
    )

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content