import os
import json
from urllib.parse import quote

# --- CONFIGURATION ---

# 1. INPUT: The local path to your images
LOCAL_ASSETS_DIR = os.path.join('assets_for_ethel_songs', 'images')

# 2. OUTPUT: Where to save the map
# (CHANGED: Now saves inside your Ethel folder so it exists!)
OUTPUT_FILE = os.path.join('assets_for_ethel_songs', 'gallery_map.json')

# 3. GITHUB DETAILS
GITHUB_USER = "NJsalubrious"
GITHUB_REPO = "pixelstortion-assets"

# 4. WEB URL
# (CHANGED: Updated to match your new folder name)
BASE_URL = f"https://{GITHUB_USER}.github.io/{GITHUB_REPO}/assets_for_ethel_songs/images/"


def generate_gallery_map():
    gallery_data = {}

    if not os.path.exists(LOCAL_ASSETS_DIR):
        print(f"❌ Error: Could not find directory: {LOCAL_ASSETS_DIR}")
        print("   Make sure your folder is named exactly 'assets_for_ethel_songs'")
        return

    # Walk through track folders
    for folder_name in sorted(os.listdir(LOCAL_ASSETS_DIR)):
        folder_path = os.path.join(LOCAL_ASSETS_DIR, folder_name)

        if os.path.isdir(folder_path):
            images = [
                f for f in sorted(os.listdir(folder_path))
                if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))
                ]

            if images:
                # Create the full web URL for each image
                # The BASE_URL now correctly includes 'assets_for_ethel_songs'
                image_urls = [f"{BASE_URL}{folder_name}/{quote(img)}" for img in images]

                gallery_data[folder_name] = image_urls
                print(f"✅ {folder_name}: Found {len(images)} images")
            else:
                print(f"⚠️ {folder_name}: Directory exists but is empty.")

    # Write the JSON file
    try:
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(gallery_data, f, indent=4)

        print("\n------------------------------------------------")
        print(f"🎉 SUCCESS! Map generated at: {OUTPUT_FILE}")
        print("------------------------------------------------")
    except FileNotFoundError:
        print(f"\n❌ Error: Could not save to {OUTPUT_FILE}")
        print("   Check that the directory 'assets_for_ethel_songs' exists.")


if __name__ == "__main__":
    generate_gallery_map()