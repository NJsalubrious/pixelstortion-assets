import os
import shutil

# === CONFIGURATION ===
# Source folder containing your 100 master images (001_track.jpg ... 100_track.jpg)
SOURCE_DIR = "_master_images"

# Destination where the website assets will be built
BASE_DEST_DIR = "assets/images"

# Track Data:
# Paths now use underscores (track_01)
# Image Counts calculated from your V8.1 timing audit (One image every 6 seconds)
TRACK_DATA = [
    {"id": 1, "path": "track_01", "count": 11},
    {"id": 2, "path": "track_02", "count": 33},
    {"id": 3, "path": "track_03", "count": 12},
    {"id": 4, "path": "track_04", "count": 27},
    {"id": 5, "path": "track_05", "count": 20},
    {"id": 6, "path": "track_06", "count": 30},
    {"id": 7, "path": "track_07", "count": 23},
    {"id": 8, "path": "track_08", "count": 46},
    {"id": 9, "path": "track_90", "count": 12},  # Ethel's Intro: Ride
    {"id": 10, "path": "track_10", "count": 37},  # Ride
    {"id": 11, "path": "track_11b", "count": 12},  # Intro: Grief (Duplicate ID handled with 'b')
    {"id": 12, "path": "track_12", "count": 35},
    {"id": 13, "path": "track_13", "count": 21},
    {"id": 14, "path": "track_14", "count": 39},
    {"id": 15, "path": "track_15", "count": 21},
    {"id": 16, "path": "track_16", "count": 50},
    {"id": 17, "path": "track_17", "count": 16},
    {"id": 18, "path": "track_18", "count": 45},
    {"id": 19, "path": "track_19", "count": 22},
    {"id": 20, "path": "track_20", "count": 33},
    {"id": 21, "path": "track_21", "count": 22},
    {"id": 22, "path": "track_22", "count": 49},
    {"id": 23, "path": "track_23", "count": 20},
    {"id": 24, "path": "track_24", "count": 24},
    {"id": 25, "path": "track_25", "count": 24},
    {"id": 26, "path": "track_26", "count": 52},
    {"id": 27, "path": "track_27", "count": 20},
    {"id": 28, "path": "track_28", "count": 12},
    {"id": 29, "path": "track_29", "count": 16},
    {"id": 30, "path": "track_30", "count": 34},
    {"id": 31, "path": "track_31", "count": 9},
    {"id": 32, "path": "track_32", "count": 36},
    {"id": 33, "path": "track_33", "count": 15},
    {"id": 34, "path": "track_34", "count": 39},
    {"id": 35, "path": "track_35", "count": 14},
    {"id": 36, "path": "track_36", "count": 36},
    {"id": 37, "path": "track_37", "count": 21},
    {"id": 38, "path": "track_38", "count": 34},
    {"id": 39, "path": "track_39", "count": 33},
    {"id": 40, "path": "track_40", "count": 17},
    {"id": 41, "path": "track_41", "count": 39},
    {"id": 42, "path": "track_42", "count": 61},
    {"id": 43, "path": "track_43", "count": 26},
    {"id": 44, "path": "track_44", "count": 21},
    {"id": 45, "path": "track_45", "count": 53},
    {"id": 46, "path": "track_46", "count": 33},
    {"id": 47, "path": "track_47", "count": 37},
    {"id": 48, "path": "track_48", "count": 39},
    {"id": 49, "path": "track_49", "count": 33},
    {"id": 50, "path": "track_50", "count": 40},
    {"id": 51, "path": "track_51", "count": 40},
    {"id": 52, "path": "track_52", "count": 35},
    {"id": 53, "path": "track_53", "count": 18},
    {"id": 54, "path": "track_54", "count": 35},
    {"id": 55, "path": "track_55", "count": 37},
    {"id": 56, "path": "track_56", "count": 56},
    {"id": 57, "path": "track_57", "count": 24},
    {"id": 58, "path": "track_58", "count": 59},
    {"id": 59, "path": "track_59", "count": 53},
    {"id": 60, "path": "track_60", "count": 24},
    {"id": 61, "path": "track_61", "count": 11},
    {"id": 62, "path": "track_62", "count": 24},
    {"id": 63, "path": "track_63", "count": 42},
    {"id": 64, "path": "track_64", "count": 55},
    {"id": 65, "path": "track_65", "count": 63},
    {"id": 66, "path": "track_66", "count": 48},
    {"id": 67, "path": "track_67", "count": 44},
    {"id": 68, "path": "track_68", "count": 55},
    {"id": 69, "path": "track_69", "count": 45},
    {"id": 70, "path": "track_70", "count": 34}
    ]


def setup_folders():
    # 1. Check Source
    if not os.path.exists(SOURCE_DIR):
        print(f"❌ ERROR: Master folder '{SOURCE_DIR}' missing.")
        print(f"Create it and add images '001_track.jpg' through '100_track.jpg'.")
        return

    print("🚀 Starting Archive Generation...")

    total_images_copied = 0

    for track in TRACK_DATA:
        # Create folder: assets/images/track_01
        dest_folder_path = os.path.join(BASE_DEST_DIR, track['path'])
        if not os.path.exists(dest_folder_path):
            os.makedirs(dest_folder_path)

        count = track['count']
        print(f"[{track['id']}] {track['path']} -> Need {count} images.")

        for i in range(1, count + 1):
            # Filename: 001_track.jpg (Preserved from source)
            filename = f"{i:03d}_track.jpg"

            src_path = os.path.join(SOURCE_DIR, filename)
            dest_path = os.path.join(dest_folder_path, filename)

            if os.path.exists(src_path):
                shutil.copy(src_path, dest_path)
                total_images_copied += 1
            else:
                print(f"   ⚠️ MISSING: {filename}")

    print("\n✅ GENERATION COMPLETE")
    print(f"Total Images Copied: {total_images_copied}")


if __name__ == "__main__":
    setup_folders()