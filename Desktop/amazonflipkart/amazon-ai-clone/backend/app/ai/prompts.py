RECOMMENDATION_PROMPT = """
You are an e-commerce recommendation engine.

User Activity:
{activity}

Search History:
{searches}

Wishlist:
{wishlist}

Previous Orders:
{orders}

Available Products:
{products}

Generate recommendations for:

1. Continue Shopping
2. Buy Again
3. Deals Related To Saved Items
4. Keep Shopping For
5. Top Picks For You

Return only JSON.
"""