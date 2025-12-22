import os, json, re
from urllib.parse import quote

LOCAL_ASSETS_DIR = os.path.join('assets_for_ethel_songs', 'images')
OUTPUT_FILE = os.path.join('assets_for_ethel_songs', 'gallery_map.json')
BASE_URL = "https://NJsalubrious.github.io/pixelstortion-assets/assets_for_ethel_songs/images/"


def generate_gallery_map():
    gallery_data = {}
    for folder in sorted(os.listdir(LOCAL_ASSETS_DIR)):
        path = os.path.join(LOCAL_ASSETS_DIR, folder)
        if os.path.isdir(path):
            files = sorted([f for f in os.listdir(path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))])

            track_data = []
            for f in files:
                # Regex looks for digits followed by 's' at the end of the name (e.g., _042s.jpg)
                match = re.search(r'_(\d+)s\.', f)
                timestamp = int(match.group(1)) if match else None

                track_data.append(
                    {
                        "t": timestamp,
                        "u": f"{BASE_URL}{folder}/{quote(f)}"
                        }
                    )

            gallery_data[folder] = track_data

    with open(OUTPUT_FILE, 'w') as f:
        json.dump(gallery_data, f, indent=4)