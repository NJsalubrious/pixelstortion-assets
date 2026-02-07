import os
import sys

# THE TARGET MAP (Derived from your Manifest v2.0)
# This list defines what "Success" looks like.
TARGET_MAP = {
    "ROOT_FILES": [
        "index.html",
        "site-manifest.js"
    ],
    "ZONES (Code)": [
        "zones/silence",
        "zones/mataala",
        "zones/silentcinema",
        "zones/ethel_gallery",
        "zones/games"
    ],
    "LIBRARY (Assets)": [
        "library/char_dominic_misc",
        "library/char_elizabeth_misc",
        "library/char_ethel_media",
        "library/char_ethel_misc",
        "library/char_isla_art",
        "library/char_isla_misc",
        "library/char_nalani_media",
        "library/char_writers",
        "library/loc_archives",
        "library/loc_mataala",
        "library/media_cinema",
        "library/media_covers_album",
        "library/media_covers_song",
        "library/media_ui_master"
    ]
}

def verify_structure():
    print("========================================")
    print("   PIXELSTORTION STRUCTURAL AUDIT")
    print("========================================\n")
    
    missing_items = []
    
    # Check every section
    for category, items in TARGET_MAP.items():
        print(f"--- CHECKING: {category} ---")
        for item in items:
            if os.path.exists(item):
                # Check if it's supposed to be a directory vs file
                if "." not in item and not os.path.isdir(item):
                     print(f" [WARN] {item} exists but is not a folder.")
                else:
                    print(f" [OK]   {item}")
            else:
                print(f" [FAIL] {item} NOT FOUND")
                missing_items.append(item)
        print("")

    # Final Report
    print("========================================")
    if len(missing_items) == 0:
        print("STATUS: GREEN. INTEGRITY 100%.")
        print("Action: Proceed to HTML Link Updates.")
    else:
        print(f"STATUS: RED. {len(missing_items)} MISSING ITEMS.")
        print("Action: Locate missing folders before updating code.")
        for m in missing_items:
            print(f" - Missing: {m}")
    print("========================================")

if __name__ == "__main__":
    verify_structure()
    input("\nPress Enter to exit...")