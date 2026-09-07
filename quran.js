/* =====================================================
   ISLAMIC SOLDIER — QURAN 2.0
   COMPLETE JAVASCRIPT
===================================================== */

"use strict";


/* =====================================================
   API
===================================================== */

const API_BASE =
    "https://api.alquran.cloud/v1";


/* =====================================================
   SURAH DATA
===================================================== */

const surahs = [

    [1,"Al-Fatihah","الفاتحة","The Opening",7,"Meccan"],
    [2,"Al-Baqarah","البقرة","The Cow",286,"Medinan"],
    [3,"Aal-E-Imran","آل عمران","Family of Imran",200,"Medinan"],
    [4,"An-Nisa","النساء","The Women",176,"Medinan"],
    [5,"Al-Maidah","المائدة","The Table Spread",120,"Medinan"],
    [6,"Al-Anam","الأنعام","The Cattle",165,"Meccan"],
    [7,"Al-Araf","الأعراف","The Heights",206,"Meccan"],
    [8,"Al-Anfal","الأنفال","The Spoils of War",75,"Medinan"],
    [9,"At-Tawbah","التوبة","The Repentance",129,"Medinan"],
    [10,"Yunus","يونس","Jonah",109,"Meccan"],
    [11,"Hud","هود","Hud",123,"Meccan"],
    [12,"Yusuf","يوسف","Joseph",111,"Meccan"],
    [13,"Ar-Rad","الرعد","The Thunder",43,"Medinan"],
    [14,"Ibrahim","إبراهيم","Abraham",52,"Meccan"],
    [15,"Al-Hijr","الحجر","The Rocky Tract",99,"Meccan"],
    [16,"An-Nahl","النحل","The Bee",128,"Meccan"],
    [17,"Al-Isra","الإسراء","The Night Journey",111,"Meccan"],
    [18,"Al-Kahf","الكهف","The Cave",110,"Meccan"],
    [19,"Maryam","مريم","Mary",98,"Meccan"],
    [20,"Ta-Ha","طه","Ta-Ha",135,"Meccan"],
    [21,"Al-Anbiya","الأنبياء","The Prophets",112,"Meccan"],
    [22,"Al-Hajj","الحج","The Pilgrimage",78,"Medinan"],
    [23,"Al-Muminun","المؤمنون","The Believers",118,"Meccan"],
    [24,"An-Nur","النور","The Light",64,"Medinan"],
    [25,"Al-Furqan","الفرقان","The Criterion",77,"Meccan"],
    [26,"Ash-Shuara","الشعراء","The Poets",227,"Meccan"],
    [27,"An-Naml","النمل","The Ant",93,"Meccan"],
    [28,"Al-Qasas","القصص","The Stories",88,"Meccan"],
    [29,"Al-Ankabut","العنكبوت","The Spider",69,"Meccan"],
    [30,"Ar-Rum","الروم","The Romans",60,"Meccan"],
    [31,"Luqman","لقمان","Luqman",34,"Meccan"],
    [32,"As-Sajdah","السجدة","The Prostration",30,"Meccan"],
    [33,"Al-Ahzab","الأحزاب","The Combined Forces",73,"Medinan"],
    [34,"Saba","سبأ","Sheba",54,"Meccan"],
    [35,"Fatir","فاطر","Originator",45,"Meccan"],
    [36,"Ya-Sin","يس","Ya Sin",83,"Meccan"],
    [37,"As-Saffat","الصافات","Those Who Set The Ranks",182,"Meccan"],
    [38,"Sad","ص","The Letter Sad",88,"Meccan"],
    [39,"Az-Zumar","الزمر","The Groups",75,"Meccan"],
    [40,"Ghafir","غافر","The Forgiver",85,"Meccan"],
    [41,"Fussilat","فصلت","Explained in Detail",54,"Meccan"],
    [42,"Ash-Shura","الشورى","The Consultation",53,"Meccan"],
    [43,"Az-Zukhruf","الزخرف","The Ornaments of Gold",89,"Meccan"],
    [44,"Ad-Dukhan","الدخان","The Smoke",59,"Meccan"],
    [45,"Al-Jathiyah","الجاثية","The Crouching",37,"Meccan"],
    [46,"Al-Ahqaf","الأحقاف","The Wind-Curved Sandhills",35,"Meccan"],
    [47,"Muhammad","محمد","Muhammad",38,"Medinan"],
    [48,"Al-Fath","الفتح","The Victory",29,"Medinan"],
    [49,"Al-Hujurat","الحجرات","The Rooms",18,"Medinan"],
    [50,"Qaf","ق","The Letter Qaf",45,"Meccan"],
    [51,"Adh-Dhariyat","الذاريات","The Winnowing Winds",60,"Meccan"],
    [52,"At-Tur","الطور","The Mount",49,"Meccan"],
    [53,"An-Najm","النجم","The Star",62,"Meccan"],
    [54,"Al-Qamar","القمر","The Moon",55,"Meccan"],
    [55,"Ar-Rahman","الرحمن","The Beneficent",78,"Medinan"],
    [56,"Al-Waqiah","الواقعة","The Inevitable",96,"Meccan"],
    [57,"Al-Hadid","الحديد","The Iron",29,"Medinan"],
    [58,"Al-Mujadilah","المجادلة","The Pleading Woman",22,"Medinan"],
    [59,"Al-Hashr","الحشر","The Exile",24,"Medinan"],
    [60,"Al-Mumtahanah","الممتحanah","She That Is To Be Examined",13,"Medinan"],
    [61,"As-Saff","الصف","The Ranks",14,"Medinan"],
    [62,"Al-Jumuah","الجمعة","Friday",11,"Medinan"],
    [63,"Al-Munafiqun","المنافقون","The Hypocrites",11,"Medinan"],
    [64,"At-Taghabun","التغابن","Mutual Disillusion",18,"Medinan"],
    [65,"At-Talaq","الطلاق","The Divorce",12,"Medinan"],
    [66,"At-Tahrim","التحريم","The Prohibition",12,"Medinan"],
    [67,"Al-Mulk","الملك","The Sovereignty",30,"Meccan"],
    [68,"Al-Qalam","القلم","The Pen",52,"Meccan"],
    [69,"Al-Haqqah","الحاقة","The Reality",52,"Meccan"],
    [70,"Al-Maarij","المعارج","The Ascending Stairways",44,"Meccan"],
    [71,"Nuh","نوح","Noah",28,"Meccan"],
    [72,"Al-Jinn","الجن","The Jinn",28,"Meccan"],
    [73,"Al-Muzzammil","المزمل","The Enshrouded One",20,"Meccan"],
    [74,"Al-Muddaththir","المدثر","The Cloaked One",56,"Meccan"],
    [75,"Al-Qiyamah","القيامة","The Resurrection",40,"Meccan"],
    [76,"Al-Insan","الإنسان","The Man",31,"Medinan"],
    [77,"Al-Mursalat","المرسلات","The Emissaries",50,"Meccan"],
    [78,"An-Naba","النبأ","The Tidings",40,"Meccan"],
    [79,"An-Naziat","النازعات","Those Who Drag Forth",46,"Meccan"],
    [80,"Abasa","عبس","He Frowned",42,"Meccan"],
    [81,"At-Takwir","التكوير","The Overthrowing",29,"Meccan"],
    [82,"Al-Infitar","الانفطار","The Cleaving",19,"Meccan"],
    [83,"Al-Mutaffifin","المطففين","The Defrauding",36,"Meccan"],
    [84,"Al-Inshiqaq","الانشقاق","The Sundering",25,"Meccan"],
    [85,"Al-Buruj","البروج","The Mansions of the Stars",22,"Meccan"],
    [86,"At-Tariq","الطارق","The Nightcomer",17,"Meccan"],
    [87,"Al-Ala","الأعلى","The Most High",19,"Meccan"],
    [88,"Al-Ghashiyah","الغاشية","The Overwhelming",26,"Meccan"],
    [89,"Al-Fajr","الفجر","The Dawn",30,"Meccan"],
    [90,"Al-Balad","البلد","The City",20,"Meccan"],
    [91,"Ash-Shams","الشمس","The Sun",15,"Meccan"],
    [92,"Al-Layl","الليل","The Night",21,"Meccan"],
    [93,"Ad-Duha","الضحى","The Morning Hours",11,"Meccan"],
    [94,"Ash-Sharh","الشرح","The Relief",8,"Meccan"],
    [95,"At-Tin","التين","The Fig",8,"Meccan"],
    [96,"Al-Alaq","العلق","The Clot",19,"Meccan"],
    [97,"Al-Qadr","القدر","The Power",5,"Meccan"],
    [98,"Al-Bayyinah","البينة","The Clear Proof",8,"Medinan"],
    [99,"Az-Zalzalah","الزلزلة","The Earthquake",8,"Medinan"],
    [100,"Al-Adiyat","العاديات","The Courser",11,"Meccan"],
    [101,"Al-Qariah","القارعة","The Calamity",11,"Meccan"],
    [102,"At-Takathur","التكاثر","The Rivalry in World Increase",8,"Meccan"],
    [103,"Al-Asr","العصر","The Declining Day",3,"Meccan"],
    [104,"Al-Humazah","الهمزة","The Traducer",9,"Meccan"],
    [105,"Al-Fil","الفيل","The Elephant",5,"Meccan"],
    [106,"Quraysh","قريش","Quraysh",4,"Meccan"],
    [107,"Al-Maun","الماعون","The Small Kindnesses",7,"Meccan"],
    [108,"Al-Kawthar","الكوثر","The Abundance",3,"Meccan"],
    [109,"Al-Kafirun","الكافرون","The Disbelievers",6,"Meccan"],
    [110,"An-Nasr","النصر","The Divine Support",3,"Medinan"],
    [111,"Al-Masad","المسد","The Palm Fiber",5,"Meccan"],
    [112,"Al-Ikhlas","الإخلاص","The Sincerity",4,"Meccan"],
    [113,"Al-Falaq","الفلق","The Daybreak",5,"Meccan"],
    [114,"An-Nas","الناس","Mankind",6,"Meccan"]

];


/* =====================================================
   FIX SURAH DATA TYPO
===================================================== */

surahs[59][1] = "Al-Mumtahanah";



/* =====================================================
   DOM
===================================================== */

const surahGrid =
    document.getElementById("surahGrid");

const surahSearch =
    document.getElementById("surahSearch");

const clearSearch =
    document.getElementById("clearSearch");

const surahCount =
    document.getElementById("surahCount");

const emptyState =
    document.getElementById("emptyState");

const readingModal =
    document.getElementById("readingModal");

const readingSurahNumber =
    document.getElementById("readingSurahNumber");

const readingSurahName =
    document.getElementById("readingSurahName");

const readingSurahInfo =
    document.getElementById("readingSurahInfo");

const ayahContainer =
    document.getElementById("ayahContainer");

const ayahLoading =
    document.getElementById("ayahLoading");

const bismillah =
    document.getElementById("bismillah");

const readingProgress =
    document.getElementById("readingProgress");

const bookmarkPanel =
    document.getElementById("bookmarkPanel");

const bookmarkList =
    document.getElementById("bookmarkList");

const toast =
    document.getElementById("toast");



/* =====================================================
   STATE
===================================================== */

let currentSurah = null;

let currentAudio = null;

let currentAudioButton = null;

let translationVisible = true;

let arabicFontSize = 34;

let currentFilter = "all";



/* =====================================================
   STORAGE
===================================================== */

const FAVORITE_KEY =
    "islamicSoldierQuranFavorites";

const BOOKMARK_KEY =
    "islamicSoldierQuranBookmarks";

const THEME_KEY =
    "islamicSoldierQuranTheme";

const LAST_SURAH_KEY =
    "islamicSoldierQuranLastSurah";



function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem(FAVORITE_KEY)
        ) || [];

    } catch {

        return [];

    }

}


function saveFavorites(data) {

    localStorage.setItem(
        FAVORITE_KEY,
        JSON.stringify(data)
    );

}


function getBookmarks() {

    try {

        return JSON.parse(
            localStorage.getItem(BOOKMARK_KEY)
        ) || [];

    } catch {

        return [];

    }

}


function saveBookmarks(data) {

    localStorage.setItem(
        BOOKMARK_KEY,
        JSON.stringify(data)
    );

}



/* =====================================================
   RENDER SURAH GRID
===================================================== */

function renderSurahs(list = surahs) {

    surahGrid.innerHTML = "";

    const favorites =
        getFavorites();

    let filtered = list.filter(surah => {

        if (currentFilter === "all") {
            return true;
        }

        if (currentFilter === "meccan") {
            return surah[5] === "Meccan";
        }

        if (currentFilter === "medinan") {
            return surah[5] === "Medinan";
        }

        if (currentFilter === "favorite") {
            return favorites.includes(surah[0]);
        }

        return true;

    });


    if (!filtered.length) {

        emptyState.classList.remove("hidden");

    } else {

        emptyState.classList.add("hidden");

    }


    filtered.forEach(surah => {

        const [
            number,
            name,
            arabic,
            meaning,
            ayahs,
            place
        ] = surah;


        const isFavorite =
            favorites.includes(number);


        const card =
            document.createElement("article");

        card.className =
            "surah-card";


        card.innerHTML = `

            <div class="surah-number">
                ${number}
            </div>

            <button
                class="surah-favorite ${isFavorite ? "active" : ""}"
                data-favorite="${number}"
                aria-label="Favorite Surah">

                ${isFavorite ? "♥" : "♡"}

            </button>

            <div class="surah-card-content">

                <h3>
                    ${name}
                </h3>

                <div class="surah-english">
                    ${meaning}
                </div>

                <div class="surah-meta">

                    <span>
                        ${ayahs} Ayahs
                    </span>

                    <span>•</span>

                    <span>
                        ${place}
                    </span>

                </div>

            </div>

            <div class="surah-arabic">
                ${arabic}
            </div>
        `;


        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest(
                        ".surah-favorite"
                    )
                ) {

                    return;

                }

                openSurah(number);

            }
        );


        const favoriteButton =
            card.querySelector(
                ".surah-favorite"
            );


        favoriteButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleSurahFavorite(number);

            }
        );


        surahGrid.appendChild(card);

    });


    surahCount.textContent =
        `${filtered.length} Surah${filtered.length !== 1 ? "s" : ""}`;

}



/* =====================================================
   SEARCH
===================================================== */

function searchSurahs() {

    const query =
        surahSearch.value
            .trim()
            .toLowerCase();


    if (query) {

        clearSearch.style.display =
            "block";

    } else {

        clearSearch.style.display =
            "none";

    }


    const result =
        surahs.filter(surah => {

            return (
                String(surah[0])
                    .includes(query) ||

                surah[1]
                    .toLowerCase()
                    .includes(query) ||

                surah[2]
                    .includes(query) ||

                surah[3]
                    .toLowerCase()
                    .includes(query)
            );

        });


    renderSurahs(result);

}


surahSearch.addEventListener(
    "input",
    searchSurahs
);


clearSearch.addEventListener(
    "click",
    () => {

        surahSearch.value = "";

        clearSearch.style.display =
            "none";

        renderSurahs();

        surahSearch.focus();

    }
);



/* =====================================================
   FILTERS
===================================================== */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                renderSurahs();

            }
        );

    });



/* =====================================================
   SURAH FAVORITE
===================================================== */

function toggleSurahFavorite(number) {

    let favorites =
        getFavorites();


    if (favorites.includes(number)) {

        favorites =
            favorites.filter(
                id => id !== number
            );

        showToast("Removed from favorites");

    } else {

        favorites.push(number);

        showToast("❤️ Added to favorites");

    }


    saveFavorites(favorites);

    renderSurahs(
        getSearchFilteredSurahs()
    );

}


function getSearchFilteredSurahs() {

    const query =
        surahSearch.value
            .trim()
            .toLowerCase();


    if (!query) {

        return surahs;

    }


    return surahs.filter(surah => {

        return (
            String(surah[0]).includes(query) ||
            surah[1].toLowerCase().includes(query) ||
            surah[2].includes(query) ||
            surah[3].toLowerCase().includes(query)
        );

    });

}



/* =====================================================
   OPEN SURAH
===================================================== */

async function openSurah(number) {

    const surah =
        surahs.find(
            item => item[0] === number
        );


    if (!surah) {
        return;
    }


    currentSurah =
        number;


    localStorage.setItem(
        LAST_SURAH_KEY,
        number
    );


    readingModal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";


    readingSurahNumber.textContent =
        surah[0];


    readingSurahName.textContent =
        surah[1];


    readingSurahInfo.textContent =
        `${surah[3]} • ${surah[4]} Ayahs`;


    ayahContainer.innerHTML =
        "";


    ayahLoading.classList.remove(
        "hidden"
    );


    bismillah.style.display =
        "block";


    if (
        number === 9
    ) {

        bismillah.style.display =
            "none";

    }


    stopAudio();


    try {

        const response =
            await fetch(
                `${API_BASE}/surah/${number}/editions/quran-uthmani,bn.bengali`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load Quran"
            );

        }


        const data =
            await response.json();


        const arabicEdition =
            data.data[0];


        const banglaEdition =
            data.data[1];


        renderAyahs(
            arabicEdition,
            banglaEdition
        );


    } catch (error) {

        console.error(error);

        ayahContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Quran could not be loaded
                </h3>

                <p>
                    Please check your internet
                    connection and try again.
                </p>

                <button
                    class="primary-btn"
                    onclick="openSurah(${number})"
                    style="margin-top:20px;">
                    🔄 Try Again
                </button>

            </div>
        `;

    } finally {

        ayahLoading.classList.add(
            "hidden"
        );

    }

}



/* =====================================================
   RENDER AYAHS
===================================================== */

function renderAyahs(
    arabicEdition,
    banglaEdition
) {

    ayahContainer.innerHTML =
        "";


    const arabicAyahs =
        arabicEdition.ayahs;


    const banglaAyahs =
        banglaEdition.ayahs;


    const bookmarks =
        getBookmarks();


    arabicAyahs.forEach(
        (ayah, index) => {

            const bangla =
                banglaAyahs[index];


            const key =
                `${currentSurah}:${ayah.numberInSurah}`;


            const isBookmarked =
                bookmarks.includes(key);


            const card =
                document.createElement("article");


            card.className =
                "ayah-card";


            card.dataset.ayah =
                ayah.numberInSurah;


            card.innerHTML = `

                <div class="ayah-top">

                    <div class="ayah-number">
                        ${ayah.numberInSurah}
                    </div>

                    <div class="ayah-tools">

                        <button
                            class="ayah-tool play-audio"
                            title="Play Ayah">

                            ▶

                        </button>

                        <button
                            class="ayah-tool stop-audio"
                            title="Stop Audio">

                            ■

                        </button>

                        <button
                            class="ayah-tool bookmark-ayah ${isBookmarked ? "favorite-active" : ""}"
                            title="Bookmark">

                            ${isBookmarked ? "🔖" : "🔖"}

                        </button>

                    </div>

                </div>


                <div class="arabic-text">
                    ${ayah.text}
                </div>


                <div
                    class="translation ${translationVisible ? "" : "hidden-translation"}">

                    ${bangla ? bangla.text : ""}

                </div>


                <div
                    class="audio-status hidden">

                    🔊 Playing...

                </div>
            `;


            const playButton =
                card.querySelector(
                    ".play-audio"
                );


            const stopButton =
                card.querySelector(
                    ".stop-audio"
                );


            const bookmarkButton =
                card.querySelector(
                    ".bookmark-ayah"
                );


            playButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    playAyah(
                        ayah.audio,
                        card,
                        playButton
                    );

                }
            );


            stopButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    stopAudio();

                }
            );


            bookmarkButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    toggleBookmark(
                        currentSurah,
                        ayah.numberInSurah,
                        ayah.text
                    );

                }
            );


            ayahContainer.appendChild(
                card
            );

        }
    );


    updateReadingProgress();

}



/* =====================================================
   AUDIO
===================================================== */

function playAyah(
    audioUrl,
    card,
    button
) {

    stopAudio();


    if (!audioUrl) {

        showToast(
            "Audio is not available"
        );

        return;

    }


    currentAudio =
        new Audio(audioUrl);


    currentAudioButton =
        button;


    const status =
        card.querySelector(
            ".audio-status"
        );


    status.classList.remove(
        "hidden"
    );


    button.textContent =
        "⏸";


    currentAudio.play()
        .catch(error => {

            console.error(error);

            status.classList.add(
                "hidden"
            );

            button.textContent =
                "▶";

            showToast(
                "Could not play audio"
            );

        });


    currentAudio.addEventListener(
        "ended",
        () => {

            status.classList.add(
                "hidden"
            );

            button.textContent =
                "▶";

            currentAudio =
                null;

            currentAudioButton =
                null;

        }
    );


    currentAudio.addEventListener(
        "error",
        () => {

            status.classList.add(
                "hidden"
            );

            button.textContent =
                "▶";

            showToast(
                "Audio error"
            );

        }
    );

}



function stopAudio() {

    if (currentAudio) {

        currentAudio.pause();

        currentAudio.currentTime =
            0;

    }


    if (currentAudioButton) {

        currentAudioButton.textContent =
            "▶";

    }


    document
        .querySelectorAll(
            ".audio-status"
        )
        .forEach(
            status =>
                status.classList.add(
                    "hidden"
                )
        );


    currentAudio =
        null;

    currentAudioButton =
        null;

}



/* =====================================================
   BOOKMARK
===================================================== */

function toggleBookmark(
    surahNumber,
    ayahNumber,
    arabicText
) {

    const key =
        `${surahNumber}:${ayahNumber}`;


    let bookmarks =
        getBookmarks();


    if (
        bookmarks.includes(key)
    ) {

        bookmarks =
            bookmarks.filter(
                item => item !== key
            );

        showToast(
            "🔖 Bookmark removed"
        );

    } else {

        bookmarks.push(key);

        showToast(
            "🔖 Ayah bookmarked"
        );

    }


    saveBookmarks(bookmarks);


    if (currentSurah) {

        const currentAyah =
            document.querySelector(
                `.ayah-card[data-ayah="${ayahNumber}"]`
            );


        if (currentAyah) {

            const btn =
                currentAyah.querySelector(
                    ".bookmark-ayah"
                );


            btn.classList.toggle(
                "favorite-active",
                bookmarks.includes(key)
            );

        }

    }

}



/* =====================================================
   BOOKMARK PANEL
===================================================== */

function renderBookmarks() {

    const bookmarks =
        getBookmarks();


    bookmarkList.innerHTML =
        "";


    if (!bookmarks.length) {

        bookmarkList.innerHTML = `

            <div class="no-bookmarks">

                <div style="font-size:35px;">
                    🔖
                </div>

                <p>
                    You don't have any bookmarks yet.
                </p>

            </div>

        `;

        return;

    }


    bookmarks.forEach(key => {

        const [
            surahNumber,
            ayahNumber
        ] =
            key.split(":")
                .map(Number);


        const surah =
            surahs.find(
                item =>
                    item[0] === surahNumber
            );


        if (!surah) {
            return;
        }


        const item =
            document.createElement(
                "div"
            );


        item.className =
            "bookmark-item";


        item.innerHTML = `

            <strong>
                ${surahNumber}. ${surah[1]}
            </strong>

            <p>
                Ayah ${ayahNumber}
            </p>

        `;


        item.addEventListener(
            "click",
            () => {

                bookmarkPanel.classList.add(
                    "hidden"
                );

                openSurah(
                    surahNumber
                );

            }
        );


        bookmarkList.appendChild(
            item
        );

    });

}



/* =====================================================
   READING MODAL CLOSE
===================================================== */

document
    .getElementById("closeReading")
    .addEventListener(
        "click",
        closeReading
    );


function closeReading() {

    stopAudio();

    readingModal.classList.add(
        "hidden"
    );

    document.body.style.overflow =
        "";

}



/* =====================================================
   TRANSLATION TOGGLE
===================================================== */

document
    .getElementById("translationToggle")
    .addEventListener(
        "click",
        () => {

            translationVisible =
                !translationVisible;


            document
                .querySelectorAll(
                    ".translation"
                )
                .forEach(
                    item => {

                        item.classList.toggle(
                            "hidden-translation",
                            !translationVisible
                        );

                    }
                );


            document
                .getElementById(
                    "translationToggle"
                )
                .classList.toggle(
                    "active",
                    translationVisible
                );

        }
    );



/* =====================================================
   FONT SIZE
===================================================== */

document
    .getElementById("fontIncrease")
    .addEventListener(
        "click",
        () => {

            if (
                arabicFontSize < 50
            ) {

                arabicFontSize += 2;

                document.documentElement
                    .style
                    .setProperty(
                        "--arabic-size",
                        `${arabicFontSize}px`
                    );

            }

        }
    );


document
    .getElementById("fontDecrease")
    .addEventListener(
        "click",
        () => {

            if (
                arabicFontSize > 24
            ) {

                arabicFontSize -= 2;

                document.documentElement
                    .style
                    .setProperty(
                        "--arabic-size",
                        `${arabicFontSize}px`
                    );

            }

        }
    );



/* =====================================================
   PREVIOUS / NEXT SURAH
===================================================== */

document
    .getElementById("previousSurah")
    .addEventListener(
        "click",
        () => {

            if (
                currentSurah > 1
            ) {

                openSurah(
                    currentSurah - 1
                );

            }

        }
    );


document
    .getElementById("nextSurah")
    .addEventListener(
        "click",
        () => {

            if (
                currentSurah < 114
            ) {

                openSurah(
                    currentSurah + 1
                );

            }

        }
    );



/* =====================================================
   READING PROGRESS
===================================================== */

function updateReadingProgress() {

    if (!ayahContainer) {
        return;
    }


    const cards =
        ayahContainer.querySelectorAll(
            ".ayah-card"
        );


    if (!cards.length) {

        readingProgress.textContent =
            "0%";

        return;

    }


    const scrollTop =
        ayahContainer.scrollTop;


    const scrollHeight =
        ayahContainer.scrollHeight -
        ayahContainer.clientHeight;


    if (scrollHeight <= 0) {

        readingProgress.textContent =
            "100%";

        return;

    }


    const percent =
        Math.round(
            (scrollTop / scrollHeight) *
            100
        );


    readingProgress.textContent =
        `${Math.min(percent, 100)}%`;

}


ayahContainer.addEventListener(
    "scroll",
    updateReadingProgress
);



/* =====================================================
   CONTINUE READING
===================================================== */

document
    .getElementById("continueReadingBtn")
    .addEventListener(
        "click",
        () => {

            const lastSurah =
                Number(
                    localStorage.getItem(
                        LAST_SURAH_KEY
                    )
                );


            if (
                lastSurah >= 1 &&
                lastSurah <= 114
            ) {

                openSurah(
                    lastSurah
                );

            } else {

                openSurah(1);

            }

        }
    );



/* =====================================================
   RANDOM SURAH
===================================================== */

document
    .getElementById("randomSurahBtn")
    .addEventListener(
        "click",
        () => {

            const number =
                Math.floor(
                    Math.random() * 114
                ) + 1;


            openSurah(
                number
            );

        }
    );



/* =====================================================
   BOOKMARK BUTTON
===================================================== */

document
    .getElementById("bookmarkBtn")
    .addEventListener(
        "click",
        () => {

            renderBookmarks();

            bookmarkPanel.classList.remove(
                "hidden"
            );

        }
    );


document
    .getElementById("closeBookmark")
    .addEventListener(
        "click",
        () => {

            bookmarkPanel.classList.add(
                "hidden"
            );

        }
    );


bookmarkPanel.addEventListener(
    "click",
    event => {

        if (
            event.target === bookmarkPanel
        ) {

            bookmarkPanel.classList.add(
                "hidden"
            );

        }

    }
);



/* =====================================================
   THEME
===================================================== */

const themeBtn =
    document.getElementById(
        "themeBtn"
    );


function applyTheme() {

    const theme =
        localStorage.getItem(
            THEME_KEY
        );


    if (
        theme === "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );

        themeBtn.textContent =
            "☀️";

    } else {

        document.body.classList.remove(
            "light-theme"
        );

        themeBtn.textContent =
            "🌙";

    }

}


themeBtn.addEventListener(
    "click",
    () => {

        const isLight =
            document.body.classList.contains(
                "light-theme"
            );


        if (isLight) {

            document.body.classList.remove(
                "light-theme"
            );

            localStorage.setItem(
                THEME_KEY,
                "dark"
            );

            themeBtn.textContent =
                "🌙";

        } else {

            document.body.classList.add(
                "light-theme"
            );

            localStorage.setItem(
                THEME_KEY,
                "light"
            );

            themeBtn.textContent =
                "☀️";

        }

    }
);



/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeReading();

            bookmarkPanel.classList.add(
                "hidden"
            );

        }

    }
);



/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}



/* =====================================================
   INITIALIZE
===================================================== */

function initializeQuran() {

    renderSurahs();

    applyTheme();

    console.log(
        "Islamic Soldier Quran initialized successfully."
    );

}


initializeQuran();