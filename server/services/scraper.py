import praw
import cohere
import os
from dotenv import load_dotenv
import sys
import json

# Load environment variables
load_dotenv()

def initialize_clients():
    """Initialize API clients with error handling"""
    try:
        cohere_api_key = os.getenv('COHERE_API_KEY')
        if not cohere_api_key:
            raise ValueError("Cohere API key not found")
        co = cohere.Client(cohere_api_key)
        
        reddit_client_id = os.getenv('REDDIT_CLIENT_ID')
        reddit_client_secret = os.getenv('REDDIT_CLIENT_SECRET')
        if not (reddit_client_id and reddit_client_secret):
            raise ValueError("Reddit credentials not found")
        
        reddit = praw.Reddit(
            client_id=reddit_client_id,
            client_secret=reddit_client_secret,
            user_agent='product-review-fetcher'
        )
        return co, reddit
    except Exception as e:
        print(json.dumps({"error": f"Failed to initialize API clients: {str(e)}"}))
        sys.exit(1)

def fetch_reddit_reviews(reddit, product_name, limit=50):
    """Fetch reviews from Reddit"""
    search_query = f"{product_name} review"
    reviews_text = ""
    try:
        for submission in reddit.subreddit("all").search(search_query, limit=limit):
            if submission.selftext:
                reviews_text += submission.selftext + "\n\n"
        return reviews_text
    except Exception as e:
        return ""  # Return empty string if reddit search fails

def generate_product_description(co, product_name, reviews_text=""):
    """Generate a structured Markdown product description using AI knowledge + optional Reddit reviews"""
    
    reddit_section = ""
    if reviews_text.strip():
        reddit_section = f"""
Additionally, supplement your knowledge with insights from the following real user reviews.
Use these to validate or enrich the Pros, Cons, and target audience sections — but do NOT rely on them exclusively.

User Reviews:
{reviews_text[:8000]}
"""

    prompt = f"""You are an expert product analyst and technical writer for an e-commerce platform.

Write a comprehensive, well-structured product description for: **{product_name}**

Use your own extensive product knowledge as the PRIMARY source. {f"Real user feedback has been provided below to supplement your analysis." if reviews_text.strip() else "No user reviews are available, so rely entirely on your own knowledge."}

Output the description in **valid Markdown** format with the following sections in this exact order:

## Product Overview
A 2-3 sentence introduction explaining what the product is, who makes it, and what problem it solves.

## Key Specifications
A bullet list of the most important technical specifications (e.g. dimensions, weight, battery life, material, compatibility, capacity — whatever is relevant to this product type).

## Pros
A bullet list of genuine strengths and advantages of this product.

## Cons
A bullet list of honest drawbacks or limitations.

## Who Should Buy This
2-3 sentences describing the ideal buyer — their use case, lifestyle, or needs that make this product a great fit for them.

## Final Verdict
A 2-3 sentence balanced conclusion with an overall recommendation.

---

Rules:
- Output ONLY the Markdown content. No preamble, no explanations outside the sections.
- Use `##` for section headings.
- Use `-` for bullet points.
- Be specific and accurate. Avoid vague marketing language.
- Maintain a professional, neutral, and helpful tone.
- Focus exclusively on **{product_name}**.
{reddit_section}"""

    try:
        response = co.chat(
            message=prompt,
            model='command-a-vision-07-2025',
            temperature=0.3
        )
        return response.text
    except Exception as e:
        return f"Description generation failed: {str(e)}"

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No product name provided"}))
        sys.exit(1)
        
    product_name = sys.argv[1]
    co, reddit = initialize_clients()
    
    # Try to fetch Reddit reviews but don't block on failure
    all_reviews_text = fetch_reddit_reviews(reddit, product_name)
    
    # Generate the description using AI + optional Reddit data
    summary = generate_product_description(co, product_name, all_reviews_text)
    
    print(json.dumps({"summary": summary}))

if __name__ == "__main__":
    main()