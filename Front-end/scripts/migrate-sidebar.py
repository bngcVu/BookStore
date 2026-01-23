"""
Admin Sidebar Migration Script
Replaces duplicated sidebar HTML across all admin pages with component mount point
"""

import os
import re
from pathlib import Path

# Define the admin directory
ADMIN_DIR = r"d:\BookStore\Front-end\src\admin"

# List of HTML files to update
HTML_FILES = [
    "index.html",
    "products.html",
    "orders.html",
    "customers.html",
    "flash-sales.html",
    "vouchers.html",
    "reports.html",
    "add-product.html",
    "order-detail.html",
    "marketing.html"
]

# Replacement sidebar component (just the mount point)
SIDEBAR_COMPONENT = '''        <!-- Sidebar Component -->
        <div id="admin-sidebar-mount"></div>'''

def find_sidebar_bounds(content):
    """
    Find the start and end lines of the sidebar block
    Returns tuple (start_index, end_index) or None if not found
    """
    # Look for sidebar opening tag
    sidebar_start_pattern = r'<aside class="admin-sidebar">'
    sidebar_end_pattern = r'</aside>'
    
    start_match = re.search(sidebar_start_pattern, content)
    if not start_match:
        return None
    
    start_index = start_match.start()
    
    # Find the corresponding closing </aside> tag
    # Start searching after the opening tag
    search_start = start_match.end()
    end_match = re.search(sidebar_end_pattern, content[search_start:])
    
    if not end_match:
        return None
    
    # Calculate absolute position
    end_index = search_start + end_match.end()
    
    return (start_index, end_index)

def update_html_file(filepath):
    """
    Update a single HTML file to use sidebar component
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already using component
        if 'admin-sidebar-mount' in content:
            print(f"✅ SKIP: {filepath.name} (already using component)")
            return True
        
        # Find sidebar boundaries
        bounds = find_sidebar_bounds(content)
        if not bounds:
            print(f"⚠️  SKIP: {filepath.name} (no sidebar found)")
            return False
        
        start_index, end_index = bounds
        
        # Extract sidebar HTML (for verification)
        sidebar_html = content[start_index:end_index]
        sidebar_lines = sidebar_html.count('\n')
        
        # Replace sidebar with component mount point
        new_content = (
            content[:start_index] + 
            SIDEBAR_COMPONENT + 
            content[end_index:]
        )
        
        # Check if we need to add admin-sidebar.js script
        if '../assets/js/admin-sidebar.js' not in new_content:
            # Find the closing </body> tag
            body_close_index = new_content.rfind('</body>')
            if body_close_index != -1:
                script_tag = '\n    <script src="../assets/js/admin-sidebar.js"></script>\n'
                new_content = (
                    new_content[:body_close_index] + 
                    script_tag +
                    new_content[body_close_index:]
                )
        
        # Write updated content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        saved_lines = sidebar_lines
        print(f"✅ SUCCESS: {filepath.name} ({saved_lines} lines replaced with component)")
        return True
        
    except Exception as e:
        print(f"❌ ERROR: {filepath.name} - {str(e)}")
        return False

def main():
    """
    Main migration function
    """
    print("="  * 60)
    print("Admin Sidebar Component Migration")
    print("=" * 60)
    print()
    
    admin_path = Path(ADMIN_DIR)
    
    if not admin_path.exists():
        print(f"❌ Admin directory not found: {ADMIN_DIR}")
        return
    
    success_count = 0
    skip_count = 0
    error_count = 0
    
    for filename in HTML_FILES:
        filepath = admin_path / filename
        
        if not filepath.exists():
            print(f"⚠️  SKIP: {filename} (file not found)")
            skip_count += 1
            continue
        
        result = update_html_file(filepath)
        
        if result is True:
            success_count += 1
        elif result is False:
            skip_count += 1
        else:
            error_count += 1
    
    print()
    print("=" * 60)
    print("Migration Summary")
    print("=" * 60)
    print(f"✅ Successfully updated: {success_count} files")
    print(f"⚠️  Skipped: {skip_count} files")
    print(f"❌ Errors: {error_count} files")
    print()
    
    if success_count > 0:
        print("🎉 Migration completed! Remember to:")
        print("   1. Test navigation across all pages")
        print("   2. Verify active states work correctly")
        print("   3. Check console for any JavaScript errors")

if __name__ == "__main__":
    main()
