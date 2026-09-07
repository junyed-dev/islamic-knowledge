/* =========================================================
   ISLAMIC SOLDIER — DUA 2.0
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. DUA DATA
   ========================================================= */

const duaData = [

    {
        id: 1,
        category: "daily",
        categoryName: "Daily",
        title: "সর্বাধিক গুরুত্বপূর্ণ দোয়া",
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa 'azaaban-naar.",
        meaning: "হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দান করুন এবং আখিরাতেও কল্যাণ দান করুন এবং আমাদের জাহান্নামের শাস্তি থেকে রক্ষা করুন।",
        reference: "সূরা আল-বাকারা ২:২০১"
    },


    {
        id: 2,
        category: "forgiveness",
        categoryName: "Forgiveness",
        title: "ক্ষমা প্রার্থনার দোয়া",
        arabic: "رَبِّ اغْفِرْ لِي وَارْحَمْنِي",
        transliteration: "Rabbighfir lee warhamnee.",
        meaning: "হে আমার রব! আমাকে ক্ষমা করুন এবং আমার প্রতি দয়া করুন।",
        reference: "সূরা আল-মুমিনূন ২৩:১১৮"
    },


    {
        id: 3,
        category: "morning",
        categoryName: "Morning",
        title: "সকালের কল্যাণের দোয়া",
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذَا الْيَوْمِ",
        transliteration: "Allahumma innee as'aluka khayra haazal-yawm.",
        meaning: "হে আল্লাহ! আমি আপনার কাছে এই দিনের কল্যাণ প্রার্থনা করছি।",
        reference: "সকাল-সন্ধ্যার দোয়ার মর্মার্থ"
    },


    {
        id: 4,
        category: "evening",
        categoryName: "Evening",
        title: "সন্ধ্যার স্মরণ",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ",
        transliteration: "Allahumma anta Rabbee laa ilaaha illaa ant.",
        meaning: "হে আল্লাহ! আপনি আমার রব। আপনি ছাড়া কোনো সত্য উপাস্য নেই।",
        reference: "সহিহ বুখারি — সাইয়্যিদুল ইস্তিগফার"
    },


    {
        id: 5,
        category: "food",
        categoryName: "Food",
        title: "খাবার শুরু করার দোয়া",
        arabic: "بِسْمِ اللَّهِ",
        transliteration: "Bismillaah.",
        meaning: "আল্লাহর নামে শুরু করছি।",
        reference: "সুনান আবু দাউদ"
    },


    {
        id: 6,
        category: "food",
        categoryName: "Food",
        title: "খাবার শেষে দোয়া",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ",
        transliteration: "Alhamdu lillaahil-lazee at'amanee haazaa wa razaqaneehi.",
        meaning: "সমস্ত প্রশংসা আল্লাহর, যিনি আমাকে এই খাবার খাওয়ালেন এবং তা রিজিক হিসেবে দান করলেন।",
        reference: "সুনান আবু দাউদ"
    },


    {
        id: 7,
        category: "travel",
        categoryName: "Travel",
        title: "সফরের দোয়া",
        arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
        transliteration: "Subhaanallazee sakhkhara lanaa haazaa wa maa kunnaa lahoo muqrineen.",
        meaning: "পবিত্র তিনি, যিনি এটিকে আমাদের অধীন করে দিয়েছেন; অথচ আমরা নিজেরা এটিকে নিয়ন্ত্রণ করতে সক্ষম ছিলাম না।",
        reference: "সূরা আয-যুখরুফ ৪৩:১৩"
    },


    {
        id: 8,
        category: "protection",
        categoryName: "Protection",
        title: "সুরক্ষার দোয়া",
        arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
        transliteration: "A'oodhu bi kalimaatillaahit-taammaati min sharri maa khalaq.",
        meaning: "আমি আল্লাহর পূর্ণাঙ্গ বাণীসমূহের মাধ্যমে তাঁর সৃষ্টির অনিষ্ট থেকে আশ্রয় চাই।",
        reference: "সহিহ মুসলিম"
    },


    {
        id: 9,
        category: "sleep",
        categoryName: "Sleep",
        title: "ঘুমানোর দোয়া",
        arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Bismikallaahumma amootu wa ahyaa.",
        meaning: "হে আল্লাহ! আপনার নামেই আমি মৃত্যুবরণ করি এবং জীবিত হই।",
        reference: "সহিহ বুখারি"
    },


    {
        id: 10,
        category: "sleep",
        categoryName: "Sleep",
        title: "ঘুম থেকে ওঠার দোয়া",
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
        transliteration: "Alhamdu lillaahil-lazee ahyaanaa ba'da maa amaatanaa.",
        meaning: "সমস্ত প্রশংসা আল্লাহর, যিনি আমাদের মৃত্যুর মতো ঘুমের পর জীবিত করেছেন।",
        reference: "সহিহ বুখারি"
    },


    {
        id: 11,
        category: "salah",
        categoryName: "Salah",
        title: "সালাতের পর ক্ষমা প্রার্থনা",
        arabic: "أَسْتَغْفِرُ اللَّهَ",
        transliteration: "Astaghfirullaah.",
        meaning: "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।",
        reference: "সহিহ মুসলিম"
    },


    {
        id: 12,
        category: "daily",
        categoryName: "Daily",
        title: "জ্ঞান বৃদ্ধির দোয়া",
        arabic: "رَبِّ زِدْنِي عِلْمًا",
        transliteration: "Rabbi zidnee 'ilmaa.",
        meaning: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করুন।",
        reference: "সূরা ত্ব-হা ২০:১১৪"
    },


    {
        id: 13,
        category: "daily",
        categoryName: "Daily",
        title: "মাতৃ-পিতৃয়ের জন্য দোয়া",
        arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir-hamhumaa kamaa rabbayaanee sagheeraa.",
        meaning: "হে আমার রব! তাঁদের প্রতি দয়া করুন, যেমন তাঁরা আমাকে ছোটবেলায় লালন-পালন করেছেন।",
        reference: "সূরা আল-ইসরা ১৭:২৪"
    },


    {
        id: 14,
        category: "protection",
        categoryName: "Protection",
        title: "দুশ্চিন্তা থেকে আশ্রয়ের দোয়া",
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        transliteration: "Allahumma innee a'oodhu bika minal-hammi wal-hazan.",
        meaning: "হে আল্লাহ! আমি আপনার কাছে দুশ্চিন্তা ও দুঃখ থেকে আশ্রয় চাই।",
        reference: "সহিহ বুখারি"
    },


    {
        id: 15,
        category: "daily",
        categoryName: "Daily",
        title: "সঠিক পথে থাকার দোয়া",
        arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
        transliteration: "Rabbanaa laa tuzigh quloobanaa ba'da iz hadaytanaa.",
        meaning: "হে আমাদের রব! আপনি আমাদের হেদায়েত দেওয়ার পর আমাদের অন্তরগুলোকে বক্র করে দেবেন না।",
        reference: "সূরা আলে ইমরান ৩:৮"
    },


    {
        id: 16,
        category: "forgiveness",
        categoryName: "Forgiveness",
        title: "সাইয়্যিদুল ইস্তিগফার",
        arabic: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ",
        transliteration: "Allahumma anta Rabbee laa ilaaha illaa anta khalaqtanee wa ana 'abduk.",
        meaning: "হে আল্লাহ! আপনি আমার রব, আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা।",
        reference: "সহিহ বুখারি"
    }

];


/* =========================================================
   2. SETTINGS
   ========================================================= */

const FAVORITES_KEY =
    "islamicSoldierDuaFavorites";


/* =========================================================
   3. APP STATE
   ========================================================= */

let currentCategory = "all";

let showingFavorites = false;

let currentSearch = "";

let currentDuaId = null;

let isSpeaking = false;


/* =========================================================
   4. DOM ELEMENTS
   ========================================================= */

const duaGrid =
    document.getElementById("duaGrid");

const duaSearch =
    document.getElementById("duaSearch");

const clearSearch =
    document.getElementById("clearSearch");

const categoryGrid =
    document.getElementById("categoryGrid");

const favoritesToggle =
    document.getElementById("favoritesToggle");

const favoriteCount =
    document.getElementById("favoriteCount");

const listTitle =
    document.getElementById("listTitle");

const duaCount =
    document.getElementById("duaCount");

const emptyState =
    document.getElementById("emptyState");

const duaModal =
    document.getElementById("duaModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const closeModalBtn =
    document.getElementById("closeModal");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalArabic =
    document.getElementById("modalArabic");

const modalTransliteration =
    document.getElementById("modalTransliteration");

const modalMeaning =
    document.getElementById("modalMeaning");

const modalReference =
    document.getElementById("modalReference");

const modalFavorite =
    document.getElementById("modalFavorite");

const modalListen =
    document.getElementById("modalListen");

const listenIcon =
    document.getElementById("listenIcon");

const listenText =
    document.getElementById("listenText");


/* =========================================================
   5. FAVORITES
   ========================================================= */

function getFavorites() {

    try {

        const saved =
            localStorage.getItem(FAVORITES_KEY);

        if (!saved) {
            return [];
        }

        const parsed =
            JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed;

    } catch (error) {

        console.warn(
            "Could not load Dua favorites:",
            error
        );

        return [];
    }
}


function saveFavorites(favorites) {

    try {

        localStorage.setItem(
            FAVORITES_KEY,
            JSON.stringify(favorites)
        );

    } catch (error) {

        console.warn(
            "Could not save Dua favorites:",
            error
        );
    }
}


function isFavorite(id) {

    return getFavorites().includes(id);
}


function toggleFavorite(id) {

    let favorites =
        getFavorites();

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId => favoriteId !== id
            );

    } else {

        favorites.push(id);
    }

    saveFavorites(favorites);

    updateFavoriteCount();

    renderDuas();

    if (currentDuaId === id) {
        updateModalFavoriteButton();
    }
}


/* =========================================================
   6. FAVORITE COUNT
   ========================================================= */

function updateFavoriteCount() {

    if (!favoriteCount) {
        return;
    }

    favoriteCount.textContent =
        getFavorites().length;
}


/* =========================================================
   7. ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;
}


/* =========================================================
   8. FILTER DUA
   ========================================================= */

function getFilteredDuas() {

    let result =
        [...duaData];


    /* Category */
    if (currentCategory !== "all") {

        result =
            result.filter(
                dua =>
                    dua.category === currentCategory
            );
    }


    /* Favorites */
    if (showingFavorites) {

        const favorites =
            getFavorites();

        result =
            result.filter(
                dua =>
                    favorites.includes(dua.id)
            );
    }


    /* Search */
    const query =
        currentSearch
            .trim()
            .toLowerCase();


    if (query) {

        result =
            result.filter(dua => {

                const searchableText = [
                    dua.title,
                    dua.arabic,
                    dua.transliteration,
                    dua.meaning,
                    dua.reference,
                    dua.categoryName
                ]
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(query);
            });
    }


    return result;
}


/* =========================================================
   9. UPDATE LIST TITLE
   ========================================================= */

function updateListTitle() {

    if (!listTitle) {
        return;
    }


    if (showingFavorites) {

        listTitle.textContent =
            "আমার পছন্দের দোয়া";

        return;
    }


    const titles = {

        all: "সব দোয়া",

        daily: "দৈনন্দিন দোয়া",

        morning: "সকালের দোয়া",

        evening: "সন্ধ্যার দোয়া",

        salah: "সালাতের দোয়া",

        food: "খাবারের দোয়া",

        travel: "সফরের দোয়া",

        protection: "সুরক্ষার দোয়া",

        forgiveness: "ক্ষমার দোয়া",

        sleep: "ঘুমের দোয়া"

    };


    listTitle.textContent =
        titles[currentCategory] ||
        "সব দোয়া";
}


/* =========================================================
   10. UPDATE DUA COUNT
   ========================================================= */

function updateDuaCount(count) {

    if (!duaCount) {
        return;
    }

    duaCount.textContent =
        `${count} দোয়া`;
}


/* =========================================================
   11. CREATE DUA CARD
   ========================================================= */

function createDuaCard(dua) {

    const favorite =
        isFavorite(dua.id);


    const article =
        document.createElement("article");

    article.className =
        "dua-card";


    article.dataset.id =
        dua.id;


    article.innerHTML = `

        <div class="dua-card-header">

            <div>

                <span class="dua-card-category">
                    ${escapeHTML(dua.categoryName)}
                </span>

                <h3>
                    ${escapeHTML(dua.title)}
                </h3>

            </div>


            <button
                type="button"
                class="favorite-card-btn ${favorite ? "active" : ""}"
                data-action="favorite"
                data-id="${dua.id}"
                aria-label="Favorite Dua"
                aria-pressed="${favorite}"
            >
                ${favorite ? "★" : "☆"}
            </button>

        </div>


        <div
            class="dua-card-arabic"
            dir="rtl"
        >
            ${escapeHTML(dua.arabic)}
        </div>


        <p class="dua-card-meaning">
            ${escapeHTML(dua.meaning)}
        </p>


        <div class="dua-card-footer">

            <button
                type="button"
                class="read-dua-btn"
                data-action="open"
                data-id="${dua.id}"
            >
                <span>📖</span>
                <span>পড়ুন</span>
            </button>


            <span class="dua-reference">
                ${escapeHTML(dua.reference)}
            </span>

        </div>

    `;


    return article;
}


/* =========================================================
   12. RENDER DUAS
   ========================================================= */

function renderDuas() {

    if (!duaGrid) {
        return;
    }


    const filteredDuas =
        getFilteredDuas();


    duaGrid.innerHTML =
        "";


    filteredDuas.forEach(dua => {

        const card =
            createDuaCard(dua);

        duaGrid.appendChild(card);

    });


    updateListTitle();

    updateDuaCount(
        filteredDuas.length
    );


    if (emptyState) {

        emptyState.hidden =
            filteredDuas.length !== 0;
    }

}


/* =========================================================
   13. CATEGORY ACTIVE STATE
   ========================================================= */

function updateCategoryButtons() {

    if (!categoryGrid) {
        return;
    }


    const buttons =
        categoryGrid.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(button => {

        const category =
            button.dataset.category;


        const active =
            !showingFavorites &&
            category === currentCategory;


        button.classList.toggle(
            "active",
            active
        );

    });

}


/* =========================================================
   14. FAVORITES BUTTON STATE
   ========================================================= */

function updateFavoritesButton() {

    if (!favoritesToggle) {
        return;
    }


    favoritesToggle.classList.toggle(
        "active",
        showingFavorites
    );


    favoritesToggle.setAttribute(
        "aria-pressed",
        String(showingFavorites)
    );

}


/* =========================================================
   15. REFRESH UI
   ========================================================= */

function refreshUI() {

    renderDuas();

    updateCategoryButtons();

    updateFavoritesButton();

    updateFavoriteCount();

}


/* =========================================================
   16. OPEN DUA MODAL
   ========================================================= */

function openDua(id) {

    const dua =
        duaData.find(
            item => item.id === id
        );


    if (!dua) {
        return;
    }


    currentDuaId =
        dua.id;


    stopSpeech();


    if (modalCategory) {
        modalCategory.textContent =
            dua.categoryName;
    }


    if (modalTitle) {
        modalTitle.textContent =
            dua.title;
    }


    if (modalArabic) {
        modalArabic.textContent =
            dua.arabic;
    }


    if (modalTransliteration) {
        modalTransliteration.textContent =
            dua.transliteration;
    }


    if (modalMeaning) {
        modalMeaning.textContent =
            dua.meaning;
    }


    if (modalReference) {
        modalReference.textContent =
            dua.reference;
    }


    updateModalFavoriteButton();

    resetListenButton();


    if (duaModal) {

        duaModal.classList.add("show");

        duaModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";
    }

}


/* =========================================================
   17. CLOSE MODAL
   ========================================================= */

function closeDuaModal() {

    stopSpeech();


    if (duaModal) {

        duaModal.classList.remove(
            "show"
        );

        duaModal.setAttribute(
            "aria-hidden",
            "true"
        );
    }


    document.body.style.overflow =
        "";


    currentDuaId =
        null;
}


/* =========================================================
   18. MODAL FAVORITE BUTTON
   ========================================================= */

function updateModalFavoriteButton() {

    if (
        !modalFavorite ||
        currentDuaId === null
    ) {
        return;
    }


    const favorite =
        isFavorite(currentDuaId);


    modalFavorite.classList.toggle(
        "active",
        favorite
    );


    modalFavorite.setAttribute(
        "aria-pressed",
        String(favorite)
    );


    modalFavorite.innerHTML = `

        <span>
            ${favorite ? "★" : "☆"}
        </span>

        <span>
            ${favorite ? "Favorited" : "Favorite"}
        </span>

    `;
}


/* =========================================================
   19. SPEECH SYNTHESIS
   ========================================================= */

function getArabicVoice() {

    if (
        !("speechSynthesis" in window)
    ) {
        return null;
    }


    const voices =
        window.speechSynthesis.getVoices();


    if (!voices.length) {
        return null;
    }


    return (
        voices.find(
            voice =>
                voice.lang &&
                voice.lang.toLowerCase()
                    .startsWith("ar")
        ) ||
        voices.find(
            voice =>
                voice.name &&
                voice.name.toLowerCase()
                    .includes("arab")
        ) ||
        null
    );
}


/* =========================================================
   20. SPEAK DUA
   ========================================================= */

function speakCurrentDua() {

    if (
        currentDuaId === null ||
        !("speechSynthesis" in window)
    ) {
        return;
    }


    const dua =
        duaData.find(
            item => item.id === currentDuaId
        );


    if (!dua) {
        return;
    }


    if (isSpeaking) {

        stopSpeech();

        return;
    }


    window.speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            dua.arabic
        );


    utterance.lang =
        "ar-SA";


    utterance.rate =
        0.62;


    utterance.pitch =
        1;


    utterance.volume =
        1;


    const voice =
        getArabicVoice();


    if (voice) {
        utterance.voice =
            voice;
    }


    utterance.onstart = () => {

        isSpeaking =
            true;

        setListenButton(
            true
        );
    };


    utterance.onend = () => {

        isSpeaking =
            false;

        setListenButton(
            false
        );
    };


    utterance.onerror = () => {

        isSpeaking =
            false;

        setListenButton(
            false
        );
    };


    window.speechSynthesis.speak(
        utterance
    );


    setListenButton(
        true
    );
}


/* =========================================================
   21. STOP SPEECH
   ========================================================= */

function stopSpeech() {

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();
    }


    isSpeaking =
        false;


    resetListenButton();
}


/* =========================================================
   22. LISTEN BUTTON
   ========================================================= */

function setListenButton(active) {

    if (!listenIcon || !listenText) {
        return;
    }


    if (active) {

        listenIcon.textContent =
            "⏹️";

        listenText.textContent =
            "Stop";

    } else {

        listenIcon.textContent =
            "🔊";

        listenText.textContent =
            "Listen";
    }

}


function resetListenButton() {

    setListenButton(false);
}


/* =========================================================
   23. SEARCH
   ========================================================= */

function handleSearch() {

    if (!duaSearch) {
        return;
    }


    currentSearch =
        duaSearch.value;


    if (clearSearch) {

        clearSearch.classList.toggle(
            "show",
            duaSearch.value.length > 0
        );
    }


    renderDuas();

}


/* =========================================================
   24. CLEAR SEARCH
   ========================================================= */

function clearSearchInput() {

    if (!duaSearch) {
        return;
    }


    duaSearch.value =
        "";

    currentSearch =
        "";


    if (clearSearch) {

        clearSearch.classList.remove(
            "show"
        );
    }


    renderDuas();


    duaSearch.focus();
}


/* =========================================================
   25. CATEGORY HANDLER
   ========================================================= */

function selectCategory(category) {

    if (!category) {
        return;
    }


    currentCategory =
        category;


    showingFavorites =
        false;


    refreshUI();

}


/* =========================================================
   26. FAVORITES VIEW
   ========================================================= */

function toggleFavoritesView() {

    showingFavorites =
        !showingFavorites;


    if (showingFavorites) {

        currentCategory =
            "all";
    }


    refreshUI();

}


/* =========================================================
   27. EVENT — CATEGORY
   ========================================================= */

if (categoryGrid) {

    categoryGrid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".category-btn"
                );


            if (!button) {
                return;
            }


            selectCategory(
                button.dataset.category
            );

        }
    );
}


/* =========================================================
   28. EVENT — DUA GRID
   ========================================================= */

if (duaGrid) {

    duaGrid.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-action]"
                );


            if (!button) {
                return;
            }


            const action =
                button.dataset.action;


            const id =
                Number(
                    button.dataset.id
                );


            if (!Number.isFinite(id)) {
                return;
            }


            if (action === "favorite") {

                toggleFavorite(id);

                return;
            }


            if (action === "open") {

                openDua(id);

                return;
            }

        }
    );
}


/* =========================================================
   29. EVENT — SEARCH
   ========================================================= */

if (duaSearch) {

    duaSearch.addEventListener(
        "input",
        handleSearch
    );
}


/* =========================================================
   30. EVENT — CLEAR SEARCH
   ========================================================= */

if (clearSearch) {

    clearSearch.addEventListener(
        "click",
        clearSearchInput
    );
}


/* =========================================================
   31. EVENT — FAVORITES
   ========================================================= */

if (favoritesToggle) {

    favoritesToggle.addEventListener(
        "click",
        toggleFavoritesView
    );
}


/* =========================================================
   32. EVENT — MODAL CLOSE
   ========================================================= */

if (closeModalBtn) {

    closeModalBtn.addEventListener(
        "click",
        closeDuaModal
    );
}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeDuaModal
    );
}


/* =========================================================
   33. EVENT — MODAL FAVORITE
   ========================================================= */

if (modalFavorite) {

    modalFavorite.addEventListener(
        "click",
        () => {

            if (currentDuaId === null) {
                return;
            }


            toggleFavorite(
                currentDuaId
            );

        }
    );
}


/* =========================================================
   34. EVENT — LISTEN
   ========================================================= */

if (modalListen) {

    modalListen.addEventListener(
        "click",
        speakCurrentDua
    );
}


/* =========================================================
   35. ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (
                duaModal &&
                duaModal.classList.contains(
                    "show"
                )
            ) {

                closeDuaModal();
            }
        }

    }
);


/* =========================================================
   36. ENTER KEY — SEARCH
   ========================================================= */

if (duaSearch) {

    duaSearch.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                clearSearchInput();

            }

        }
    );
}


/* =========================================================
   37. LOAD SPEECH VOICES
   ========================================================= */

if (
    "speechSynthesis" in window &&
    "onvoiceschanged" in window.speechSynthesis
) {

    window.speechSynthesis.onvoiceschanged =
        () => {

            /*
             * Browser speech voices
             * are now refreshed.
             */
        };
}


/* =========================================================
   38. PREVENT BACKGROUND SCROLL
   ========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        stopSpeech();

        document.body.style.overflow =
            "";

    }
);


/* =========================================================
   39. INITIALIZE APP
   ========================================================= */

function initializeDuaApp() {

    currentCategory =
        "all";

    showingFavorites =
        false;

    currentSearch =
        "";

    currentDuaId =
        null;


    updateFavoriteCount();

    refreshUI();

}


/* =========================================================
   40. START
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeDuaApp,
        {
            once: true
        }
    );

} else {

    initializeDuaApp();
}


/* =========================================================
   END — DUA 2.0 JS
   ========================================================= */