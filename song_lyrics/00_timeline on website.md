const tracks = [
    // --- THE ORIGIN (AGE 15) ---
    { 
        id: 1, 
        title: "Ethel's Introduction", 
        videoId: "YKQk4G_XJ1w", 
        time: "1:01", 
        lyric: "Some look at me and see cold...", 
        galleryPath: "assets/images/track1/", 
        imageCount: 11,
        storyDate: "2024 (ARCHIVE REVIEW)" 
    },
    { 
        id: 2, 
        title: "The Drop 1", 
        videoId: "zHWwhom80go", 
        time: "3:17", 
        lyric: "I was there for a pixel on satellite...", 
        galleryPath: "assets/images/track2/", 
        imageCount: 33,
        storyDate: "NOV 14, 2016 (AGE 15)" // Adjusted: Two years prior
    },
    { 
        id: 3, 
        title: "Ethel's Intro: The Drop", 
        videoId: "lV4572kA1RE", 
        time: "1:10", 
        lyric: "It wasn't a cliff to me. It was geometry...", 
        galleryPath: "assets/images/track3/", 
        imageCount: 12,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 4, 
        title: "The Drop 2", 
        videoId: "K0ILO8MwX4Y", 
        time: "2:41", 
        lyric: "Geometry never changes but perspectives do...", 
        galleryPath: "assets/images/track4/", 
        imageCount: 27,
        storyDate: "NOV 14, 2016 (AGE 15)"
    },
    
    // --- ISLA & THE WEDDING (FLASH FORWARD) ---
    { 
        id: 5, 
        title: "Ethel's Intro: Polished Vomit", 
        videoId: "VKJaSC_-0sM", 
        time: "2:00", 
        lyric: "Lets talk about Isla...", 
        galleryPath: "assets/images/track5/", 
        imageCount: 20,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 6, 
        title: "Polished Vomit", 
        videoId: "MhEeDcdscrs", 
        time: "3:00", 
        lyric: "\"Polished Vomit\" is Isla at a wedding...", 
        galleryPath: "assets/images/track6/", 
        imageCount: 30,
        storyDate: "FEB 14, 2019 (THE WEDDING)" 
    },
    
    // --- DOMINIC (CONTEXT) ---
    { 
        id: 7, 
        title: "Ethel's Intro: Dominic's Intent", 
        videoId: "Jl8T2gWUVMY", 
        time: "2:17", 
        lyric: "There's a thing people do...", 
        galleryPath: "assets/images/track7/", 
        imageCount: 23,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 8, 
        title: "Structural Psychopathy", 
        videoId: "8rvIVBLZg2o", 
        time: "4:36", 
        lyric: "People don’t see the cause...", 
        galleryPath: "assets/images/track8/", 
        imageCount: 46,
        storyDate: "MAR 2019 (PROFILE)"
    },
    
    // --- RURAL AUSTRALIA (THE CRASH ERA - AGE 17) ---
    { 
        id: 9, 
        title: "Ethel's Intro: Ride", 
        videoId: "Wvu0JIV1ePQ", 
        time: "1:11", 
        lyric: "Seventeen. Still with Gran and Pop...", 
        galleryPath: "assets/images/track9/", 
        imageCount: 12,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 10, 
        title: "Ride", 
        videoId: "0sgcZRtPO6s", 
        time: "3:38", 
        lyric: "When others slipped into easy crime...", 
        galleryPath: "assets/images/track11/", 
        imageCount: 37,
        storyDate: "JAN 20, 2019 (AGE 17)" // Matches Lyric
    },
    
    // --- THE CRASH & MOVE (AGE 17) ---
    { 
        id: 11, 
        title: "Ethel's Intro: Grief", 
        videoId: "95wQ9YZUbcA", 
        time: "1:07", 
        lyric: "Those rides… they were how I thought...", 
        galleryPath: "assets/images/track11b/", 
        imageCount: 12,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 12, 
        title: "Grief", 
        videoId: "PMy76HBgpL8", 
        time: "3:29", 
        lyric: "Bank vault room smelled cold and empty...", 
        galleryPath: "assets/images/track12/", 
        imageCount: 35,
        storyDate: "FEB 28, 2019 (THE CRASH)" 
    },
    { 
        id: 13, 
        title: "Ethel's Intro: Gotta Move", 
        videoId: "IuyKvsxwBgY", 
        time: "2:06", 
        lyric: "That's where my red dirt ends...", 
        galleryPath: "assets/images/track13/", 
        imageCount: 21,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 14, 
        title: "Gotta Move", 
        videoId: "06qE_-OeIT0", 
        time: "3:53", 
        lyric: "You don't place me. You pass me...", 
        galleryPath: "assets/images/track14/", 
        imageCount: 39,
        storyDate: "MAR 02, 2019 (LEAVING HOME)"
    },
    
    // --- ARRIVAL IN MOSMAN (AGE 17) ---
    { 
        id: 15, 
        title: "Ethel's Intro: Won't Break", 
        videoId: "oPOEgISVQYk", 
        time: "2:01", 
        lyric: "I didn't get a real choice...", 
        galleryPath: "assets/images/track15/", 
        imageCount: 21,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 16, 
        title: "Won't Break Where Others End", 
        videoId: "fJNMlT7UeW0", 
        time: "4:56", 
        lyric: "Don't light a candle...", 
        galleryPath: "assets/images/track16/", 
        imageCount: 50,
        storyDate: "MAR 05, 2019 (MOSMAN)"
    },
    { 
        id: 17, 
        title: "Ethel's Intro: Big House", 
        videoId: "8UvIT2TgY_Y", 
        time: "1:36", 
        lyric: "The drive to Mosman wasn't scenic...", 
        galleryPath: "assets/images/track17/", 
        imageCount: 16,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 18, 
        title: "Big House", 
        videoId: "mj9MGf-VzJY", 
        time: "4:28", 
        lyric: "Mosman. Money...", 
        galleryPath: "assets/images/track18/", 
        imageCount: 45,
        storyDate: "MAR 05, 2019"
    },
    
    // --- MEETING ISLA (AGE 17) ---
    { 
        id: 19, 
        title: "Ethel's Intro: Peek-A-Boo", 
        videoId: "GaSUHEFlJVc", 
        time: "2:09", 
        lyric: "We met in what Isla calls \"the crazy house\"...", 
        galleryPath: "assets/images/track19/", 
        imageCount: 22,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 20, 
        title: "Peek-A-Boo", 
        videoId: "qbFxG7sK0pE", 
        time: "3:14", 
        lyric: "Isla was chaos wrapped in neon...", 
        galleryPath: "assets/images/track20/", 
        imageCount: 33,
        storyDate: "MAR 10, 2019"
    },
    { 
        id: 21, 
        title: "Ethel's Intro: Northern Road", 
        videoId: "dIh_CL7h7zU", 
        time: "2:10", 
        lyric: "My father Dominic was rarely there...", 
        galleryPath: "assets/images/track21/", 
        imageCount: 22,
        storyDate: "2024 (ARCHIVE REVIEW)"
    },
    { 
        id: 22, 
        title: "Northern Road", 
        videoId: "P19KBEQdVjQ", 
        time: "4:51", 
        lyric: "Here is all we know...", 
        galleryPath: "assets/images/track22/", 
        imageCount: 49,
        storyDate: "MAR 15, 2019"
    }
];