// config.js - DOM references, data constants, and state variables
// MUST load first - other scripts depend on these globals

// --- DOM REFERENCES ---
const leftPanel = document.getElementById('leftPanel');
const rightPanel = document.getElementById('rightPanel');
const body = document.body;
const cursor = document.getElementById('cursor');
const title = document.getElementById('glitchTitle');
const subtitle = document.getElementById('subtitleText');
const subjectLabel = document.querySelector('.text-gray-500');
const messageWrapper = document.querySelectorAll('.redacted-wrapper')[1];

// --- STATE VARIABLES (shared across scripts) ---
let nalaniAudioController = null;
let lastNalaniTrack = null;
let isCharacterActive = false;
let lastSelectedCharacter = null;
let lastSelectedMessage = null;
let lastSelectedTrack = null;
let ambientGlitchTimeout = null;
let isGlitching = false;

// --- CONSTANTS ---
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Audio tracks with character associations - 25 song snippets
const audioTracks = [
    // ETHEL tracks (25 total) - STATUS: SURVEILLANCE
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "If I second guess he writes the end.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_If_I_second_guess_he_writes_the_end.wav" },
    //{ character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "I rotate fate.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_I_rotate_fate.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "You made a cage for you.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_you_made_a_cage_for_you.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "The pub, that's the vantage.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_The_pub_thats_the_vantage.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Testing their perspectives.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Testing_their_perspectives.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "So I watched the systems, not the world they sell.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_So_I_watched_the_systems_not_the_world_the_sell.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Note on the bike, ride it.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Note_on_the_bike_ride_it.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Normal buys the t-shirt.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Normal_buys_the_t_shirt.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "My father not met, assessed.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_My_father_not_met_assessed.wav" },
    // { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "It back in neutral hue.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_it_back_in_neutral_hue.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Half a block to lose.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Half_A_block_to_loose.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Gran was a chemist.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Gran_was_a_chemist.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Face like a window, talk like a screen.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Face_like_a_window_talk_like_a_screen.wav" },
    //{ character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "AFP number, as if she'd drawn the fuse.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_AFP_number_as_if_shed_drawn_the_fuse.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "They Rewrite You.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_The_rewrite_you.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "I'll stitch the cost.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ETHEL_Stitch_The_Cost.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Silence = Debt Alive", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ETHEL_Silence_Keeps_the_debt_alive.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Silence isn't free!", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ETHEL_silence_isnt_free.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Silence is the warning", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ETHEL_Silence_is_the_warning.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Frame before it sets.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Read_the_frame.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Not belief its balance", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Not%20Belief_Its_balance.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Hero! Killer!", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ETHEL_Hero_Killer.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Don't light a candle.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ETHEL_DONT-LIGHT_A_CANDLE.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "See mind blind now.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ETHEL_See_my_min_blind_now.wav" },
    { character: "ETHEL", subtitle: "CIRCUIT BREAKER", status: "SURVEILLANCE", text: "Truth In Open Air", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Ethel_Truth%20In_Open_Air.wav" },

    // ISLA tracks (18 total) - STATUS: PUBLIC FIGURE
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "I climbed the pit screaming.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_I_climbed_the_pit_screaming.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "This is proof.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/isla_this_is_proof.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "No price too steep.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_no_proce_too_steep.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "I'm split inside.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/isla_Im_split_inside.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "You think you're the gate.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_You_thing_your_the_gate.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Radio host.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/isla_radio_host.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Eyes wide I scream.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_Eyes_wide_I_scream.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "I sing the cut, I feed it air, give it back.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/isla_I_sing_the_cut_I_feed_it_air_give_it_back.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Court Locked Dirt.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_Court_locked_dirt.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Cant Keep Me Quiet", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_cant_keep_me_quiet.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Survival is a win", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ISLA_Survival_Is_A_Win.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Me? Not his mess!", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_Me_Step_trash.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Married Banker. Wrong night!!", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/ISLA_Married_Bankers.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Leave the hinge singing.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_Leave_the_hinge_sining.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "I'm the new crazy!", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_Im_the_new_crazy.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Clicks like it knows", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_Crosswalk_klicks.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "Inside? passwords!", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_Cookies_cracked_inside_passwords.wav" },
    { character: "ISLA", subtitle: "CATALYST", status: "PUBLIC FIGURE", text: "A mind I knew so well", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Isla_A_Mind_I_knew_so_Well.wav" },

    // DOMINIC tracks (3 total) - STATUS: ESCAPED
    { character: "DOMINIC", subtitle: "CALM MENACE", status: "ESCAPED", text: "Why hold burdens?", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/DOMINIC_Burdens_I_Can_Carry.wav" },
    { character: "DOMINIC", subtitle: "CALM MENACE", status: "ESCAPED", text: "They look at reaction.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/DOMINIC_flag_tour_tone.wav" },
    { character: "DOMINIC", subtitle: "CALM MENACE", status: "ESCAPED", text: "1 omission + 2 suggestions.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/DOMINIC_one_omission_two_suggestions.wav" },

    // WITNESS track (1 total) - STATUS: UNKNOWN
    { character: "WITNESS", subtitle: "WITNESS", status: "UNKNOWN", text: "Casual. Gone.", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/Dominic_Casual_Gone.wav" },

    // KINLEY track (1 total) - STATUS: COMPROMISED
    { character: "KINLEY", subtitle: "POWER BROKER", status: "COMPROMISED", text: "Guilt Money", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/KINLEY_Guilt_Money.wav" },

    // STICKY track (1 total) - STATUS: ACTIVE
    { character: "STICKY", subtitle: "TRUTH SEEKER", status: "ACTIVE", text: "Systems broke. Fix it", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/STICKY_Systems_broke_fix_it.wav" }
];

// NALANI tracks (4 total) - Play randomly when clicking NALANI image
const nalaniTracks = [
    { text: "Storm unseen", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/NALANI_Storm_unseen.wav" },
    { text: "I questioned proud", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.de/audio/NALANI_I_questioned_proud.wav" },
    { text: "Out past the reef", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/NALANI_Out_past_the_reef.wav" },
    { text: "Maps were drawn", url: "https://pub-111e813bd5634cd8a9ecdd3d5c2a0916.r2.dev/audio/NALANI_Maps_were_drawn.wav" }
];

// Character subtitle mapping for SILENCE (no audio)
const characterSubtitles = {
    "SILENCE": "IS THE TRAUMA",
    "ETHEL": "CIRCUIT BREAKER",
    "ISLA": "CATALYST",
    "DOMINIC": "CALM MENACE",
    "DOM'S HENCHMAN": "WITNESS"
};
