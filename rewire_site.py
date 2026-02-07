import os

# DEFINING THE OPERATIONS
# Maps the [Old Fragile Path] to the [New Manifest Path]
REPLACEMENTS = {
    # 1. CRITICAL: Connect the Brain (Manifest)
    'src="../../pixelstortion/site-manifest.js"': 'src="/site-manifest.js"',
    'src="https://raw.githack.com/NJsalubrious/pixelstortion-assets/main/pixelstortion/site-manifest.js"': 'src="/site-manifest.js"',
    
    # 2. CHARACTERS
    '../../assets_for_ethel_songs/': '/library/char_ethel_media/',
    '../../Ethel_misc/':             '/library/char_ethel_misc/',
    '../../assets_for_nalani_song/': '/library/char_nalani_media/',
    '../../Isla_misc/':              '/library/char_isla_misc/',
    '../../Dominic_misc/':           '/library/char_dominic_misc/',
    '../../Elizabeth_ryker_misc/':   '/library/char_elizabeth_misc/',
    '../../writers/':                '/library/char_writers/',

    # 3. LOCATIONS
    '../../MATAALA/':                '/library/loc_mataala/',
    '../../archives/':               '/library/loc_archives/',

    # 4. MEDIA & ART
    '../../isla_art/':               '/library/char_isla_art/',
    '../../album_ep_single_covers/': '/library/media_covers_album/',
    '../../SongCovers/':             '/library/media_covers_song/',
    '../../cinema/':                 '/library/media_cinema/',
    '../../_master_images/':         '/library/media_ui_master/',
    
    # 5. GAMES FIX (They were moved into zones/games, so relative links might be deeper)
    '../games/':                     '/zones/games/',
}

def rewire_files():
    print("--- STARTING SURGICAL RE-WIRE ---")
    
    # Target files: Root index.html + everything in zones/
    files_to_patch = ["index.html"]
    
    # Scan zones for HTML files
    for root, dirs, files in os.walk("zones"):
        for file in files:
            if file.endswith(".html") or file.endswith(".js"):
                files_to_patch.append(os.path.join(root, file))

    count = 0
    for file_path in files_to_patch:
        if not os.path.exists(file_path): continue
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            changes_in_file = 0
            
            for old, new in REPLACEMENTS.items():
                if old in new_content:
                    new_content = new_content.replace(old, new)
                    changes_in_file += 1
            
            if changes_in_file > 0:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f" [FIXED] {file_path} ({changes_in_file} links updated)")
                count += 1
            else:
                print(f" [CLEAN] {file_path}")
                
        except Exception as e:
            print(f" [ERROR] Could not process {file_path}: {e}")

    print(f"\n--- OPERATION COMPLETE. {count} FILES UPDATED. ---")

if __name__ == "__main__":
    rewire_files()
    input("Press Enter to close...")
