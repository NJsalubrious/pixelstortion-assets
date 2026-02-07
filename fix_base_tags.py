import os
import re

def remove_base_tags():
    print("--- REMOVING OBSOLETE BASE TAGS ---")
    
    # Files to check: Root index + everything in zones
    files_to_patch = ["index.html"]
    for root, dirs, files in os.walk("zones"):
        for file in files:
            if file.endswith(".html"):
                files_to_patch.append(os.path.join(root, file))

    count = 0
    # Regex to find <base href="...">
    base_tag_pattern = re.compile(r'<base\s+href="[^"]*"\s*/?>', re.IGNORECASE)

    for file_path in files_to_patch:
        if not os.path.exists(file_path): continue
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if base_tag_pattern.search(content):
                # Remove the tag
                new_content = base_tag_pattern.sub('', content)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f" [FIXED] {file_path}")
                count += 1
            else:
                print(f" [CLEAN] {file_path}")
                
        except Exception as e:
            print(f" [ERROR] {file_path}: {e}")

    print(f"\n--- SUCCESS: {count} FILES UNCORKED ---")
    print("Your localhost should now load the Manifest correctly.")

if __name__ == "__main__":
    remove_base_tags()
    input("Press Enter to exit...")
