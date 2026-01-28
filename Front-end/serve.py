"""
Simple HTTP Server for BookStore Frontend Testing
Run: python serve.py
Access: http://localhost:8000/user/
"""

import http.server
import socketserver
import os
from pathlib import Path

# Set the directory to serve (Front-end/src)
PORT = 8000
DIRECTORY = Path(__file__).parent / "src"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🚀 BookStore Dev Server")
        print(f"📂 Serving: {DIRECTORY}")
        print(f"🌐 URL: http://localhost:{PORT}/user/")
        print(f"")
        print(f"Quick links:")
        print(f"  Homepage:  http://localhost:{PORT}/user/index.html")
        print(f"  Search:    http://localhost:{PORT}/user/search.html")
        print(f"  Cart:      http://localhost:{PORT}/user/cart.html")
        print(f"  Account:   http://localhost:{PORT}/user/account/index.html")
        print(f"")
        print(f"Press Ctrl+C to stop")
        print(f"-" * 60)
        httpd.serve_forever()
