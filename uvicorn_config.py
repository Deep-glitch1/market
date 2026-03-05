# Uvicorn configuration to prevent watching .venv directory
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Configure watchfiles to ignore .venv
os.environ['WATCHFILES_IGNORE_PATHS'] = '.venv;__pycache__;*.pyc;*.pyo;.git'
