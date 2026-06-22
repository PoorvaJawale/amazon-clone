"""
Pre-sets env vars before any uvicorn/fastapi imports to ensure SECRET_KEY is available.
Reads from .env file so secrets stay out of source code.
"""
import os
from dotenv import load_dotenv

# Load .env FIRST, before any app imports
load_dotenv()

# Verify critical env vars
secret = os.environ.get("SECRET_KEY")
db_url = os.environ.get("DATABASE_URL")
print(f"[run.py] SECRET_KEY set: {bool(secret)}, DB_URL set: {bool(db_url)}")

import uvicorn
uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=False)
