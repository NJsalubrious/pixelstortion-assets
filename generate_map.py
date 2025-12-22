import os, json, re
from urllib.parse import quote

# Ensure the paths are exactly where your local files are
LOCAL_ASSETS_DIR = os.path.join('assets_for_ethel_songs', 'images')
OUTPUT_FILE = os.path.join('assets_for_ethel_songs', 'gallery_map.json')
BASE_URL = "https://NJsalubrious.github.io/pixelstortion-assets/assets_for_ethel_songs/images/"


def generate_gallery_map():
    gallery_data = {}

    # Check if the directory exists first
    if not os.path.exists(LOCAL_ASSETS_DIR):
        print(f"❌ Error: Folder '{LOCAL_ASSETS_DIR}' not found. Please check your path.")
        return

    for folder in sorted(os.listdir(LOCAL_ASSETS_DIR)):
        path = os.path.join(LOCAL_ASSETS_DIR, folder)
        if os.path.isdir(path):
            # Sorts alphabetically to respect your 001_, 002_ prefixes
            files = sorted([f for f in os.listdir(path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])

            track_data = []
            for f in files:
                # Matches your suffix like _037s before the extension
                match = re.search(r'_(\d+)s\.', f)
                timestamp = int(match.group(1)) if match else None

                track_data.append(
                    {
                        "t": timestamp,
                        "u": f"{BASE_URL}{folder}/{quote(f)}"
                        }
                    )

            gallery_data[folder] = track_data
            print(f"✅ Processed {folder} with {len(track_data)} images.")

    # Write the JSON file
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(gallery_data, f, indent=4)

    print(f"\n🎉 SUCCESS: {OUTPUT_FILE} has been created/updated.")


# --- THE MISSING PART: YOU MUST CALL THE FUNCTION ---
if __name__ == "__main__":
    generate_gallery_map()