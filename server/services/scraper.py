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
        return "" # Return empty string if reddit search fails

def summarize_reviews(co, product_name, reviews_text):
    """Summarize the collected reviews"""
    if not reviews_text.strip():
        return "No reviews found to summarize."
    
    try:
        prompt = f"""
You are a professional product reviewer. Based on the following user reviews for the product **{product_name}**, write a detailed and structured summary. Do not mention unrelated products or casual experiences.

Your summary should include:

1. **Overview** – What the product is and what it's used for.
2. **Pros** – Highlight the strengths or what users liked.
3. **Cons** – Point out common criticisms or drawbacks.
4. **Who Should Buy This** – Suggest who would benefit most from this product.
5. **Final Thoughts** – A balanced conclusion based on the overall sentiment.

Only focus on the product mentioned: **{product_name}**.
Avoid quoting or repeating individual user opinions. Maintain a professional and neutral tone.

User Reviews:
{reviews_text[:10000]}"""
        
        response = co.summarize(
            text=prompt,
            length='long',
            format='paragraph',
            model='command',
            temperature=0.3
        )
        
        return response.summary
    except Exception as e:
        return f"Summarization failed: {str(e)}"

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No product name provided"}))
        sys.exit(1)
        
    product_name = sys.argv[1]
    co, reddit = initialize_clients()
    
    all_reviews_text = fetch_reddit_reviews(reddit, product_name)
    summary = summarize_reviews(co, product_name, all_reviews_text)
    
    print(json.dumps({"summary": summary}))

if __name__ == "__main__":
    main() 