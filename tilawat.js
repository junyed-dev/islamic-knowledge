/* =========================================================
   ISLAMIC SOLDIER — TILAWAT ENGINE
   Quran Learning System v2.0
   A → Z COMPLETE VERSION
========================================================= */


/* =========================================================
   LESSON DATA
========================================================= */

const lessons = [
    {
        id: 1,
        title: "Arabic Letters",
        description: "Learn and recognize the 28 basic Arabic letters."
    },
    {
        id: 2,
        title: "Harakat",
        description: "Learn Fatha, Kasra and Damma."
    },
    {
        id: 3,
        title: "Tanween",
        description: "Learn the three forms of Tanween."
    },
    {
        id: 4,
        title: "Sukoon",
        description: "Learn how Sukoon affects pronunciation."
    },
    {
        id: 5,
        title: "Shaddah",
        description: "Learn doubled-letter sounds."
    },
    {
        id: 6,
        title: "Madd",
        description: "Learn the basic rules of stretching sounds."
    }
];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const learningPath =
    document.getElementById("learningPath");

const progressFill =
    document.getElementById("progressFill");

const progressPercent =
    document.getElementById("progressPercent");

const completedLessons =
    document.getElementById("completedLessons");

const totalLessons =
    document.getElementById("totalLessons");

const progressStatus =
    document.getElementById("progressStatus");

const startLearningBtn =
    document.getElementById("startLearningBtn");

const continueBtn =
    document.getElementById("continueBtn");

const themeBtn =
    document.getElementById("themeBtn");


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY =
    "islamicSoldierTilawatProgress";

const THEME_KEY =
    "islamicSoldierTilawatTheme";


function getProgress() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            return [];
        }

        const data =
            JSON.parse(saved);

        if (!Array.isArray(data)) {
            return [];
        }

        return data
            .map(Number)
            .filter(function (id) {
                return Number.isInteger(id) &&
                    id >= 1 &&
                    id <= lessons.length;
            })
            .filter(function (id, index, array) {
                return array.indexOf(id) === index;
            })
            .sort(function (a, b) {
                return a - b;
            });

    } catch (error) {

        console.error(
            "Progress loading error:",
            error
        );

        return [];
    }
}


function saveProgress(progress) {

    const cleanProgress =
        [...new Set(progress)]
            .map(Number)
            .filter(function (id) {
                return id >= 1 &&
                    id <= lessons.length;
            })
            .sort(function (a, b) {
                return a - b;
            });

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cleanProgress)
    );
}


/* =========================================================
   ARABIC LETTER DATA
========================================================= */

const arabicLetters = [

    {
        letter: "ا",
        name: "ألف",
        sound: "ألف",
        aliases: ["ألف", "الف", "alif", "aleef"]
    },

    {
        letter: "ب",
        name: "باء",
        sound: "باء",
        aliases: ["باء", "با", "baa", "ba"]
    },

    {
        letter: "ت",
        name: "تاء",
        sound: "تاء",
        aliases: ["تاء", "تا", "taa", "ta"]
    },

    {
        letter: "ث",
        name: "ثاء",
        sound: "ثاء",
        aliases: ["ثاء", "ثا", "thaa", "tha"]
    },

    {
        letter: "ج",
        name: "جيم",
        sound: "جيم",
        aliases: ["جيم", "جیم", "jeem", "jim"]
    },

    {
        letter: "ح",
        name: "حاء",
        sound: "حاء",
        aliases: ["حاء", "حا", "haa", "ha"]
    },

    {
        letter: "خ",
        name: "خاء",
        sound: "خاء",
        aliases: ["خاء", "خا", "khaa", "kha"]
    },

    {
        letter: "د",
        name: "دال",
        sound: "دال",
        aliases: ["دال", "daal", "dal"]
    },

    {
        letter: "ذ",
        name: "ذال",
        sound: "ذال",
        aliases: ["ذال", "dhaal", "dhal", "thal"]
    },

    {
        letter: "ر",
        name: "راء",
        sound: "راء",
        aliases: ["راء", "را", "raa", "ra"]
    },

    {
        letter: "ز",
        name: "زاي",
        sound: "زاي",
        aliases: ["زاي", "زايه", "zaay", "zay", "zai"]
    },

    {
        letter: "س",
        name: "سين",
        sound: "سين",
        aliases: ["سين", "seen", "sin"]
    },

    {
        letter: "ش",
        name: "شين",
        sound: "شين",
        aliases: ["شين", "sheen", "shin"]
    },

    {
        letter: "ص",
        name: "صاد",
        sound: "صاد",
        aliases: ["صاد", "saad", "sad"]
    },

    {
        letter: "ض",
        name: "ضاد",
        sound: "ضاد",
        aliases: ["ضاد", "daad", "dad", "dhaad"]
    },

    {
        letter: "ط",
        name: "طاء",
        sound: "طاء",
        aliases: ["طاء", "taa", "tah"]
    },

    {
        letter: "ظ",
        name: "ظاء",
        sound: "ظاء",
        aliases: ["ظاء", "zaa", "thaa", "zah"]
    },

    {
        letter: "ع",
        name: "عين",
        sound: "عين",
        aliases: ["عين", "ayn", "ain"]
    },

    {
        letter: "غ",
        name: "غين",
        sound: "غين",
        aliases: ["غين", "ghayn", "ghain", "ghen"]
    },

    {
        letter: "ف",
        name: "فاء",
        sound: "فاء",
        aliases: ["فاء", "فا", "faa", "fa"]
    },

    {
        letter: "ق",
        name: "قاف",
        sound: "قاف",
        aliases: ["قاف", "qaaf", "qaf"]
    },

    {
        letter: "ك",
        name: "كاف",
        sound: "كاف",
        aliases: ["كاف", "kaaf", "kaf"]
    },

    {
        letter: "ل",
        name: "لام",
        sound: "لام",
        aliases: ["لام", "laam", "lam"]
    },

    {
        letter: "م",
        name: "ميم",
        sound: "ميم",
        aliases: ["ميم", "meem", "mim"]
    },

    {
        letter: "ن",
        name: "نون",
        sound: "نون",
        aliases: ["نون", "noon", "nun"]
    },

    {
        letter: "ه",
        name: "هاء",
        sound: "هاء",
        aliases: ["هاء", "ها", "haa", "ha"]
    },

    {
        letter: "و",
        name: "واو",
        sound: "واو",
        aliases: ["واو", "waaw", "waw", "wow"]
    },

    {
        letter: "ي",
        name: "ياء",
        sound: "ياء",
        aliases: ["ياء", "يا", "yaa", "ya"]
    }

];


/* =========================================================
   LESSON CONTENT
========================================================= */

const lessonContent = {

    2: {
        title: "Harakat",
        intro: "Learn the three basic short vowel marks used in Arabic reading.",

        items: [
            {
                symbol: "بَ",
                name: "Fatha",
                description: "Fatha gives a short 'a' sound.",
                speak: "بَ"
            },
            {
                symbol: "بِ",
                name: "Kasra",
                description: "Kasra gives a short 'i' sound.",
                speak: "بِ"
            },
            {
                symbol: "بُ",
                name: "Damma",
                description: "Damma gives a short 'u' sound.",
                speak: "بُ"
            }
        ],

        quiz: [
            {
                question: "Which Harakah is this: بَ ?",
                options: ["Fatha", "Kasra", "Damma"],
                answer: 0
            },
            {
                question: "Which Harakah is this: بِ ?",
                options: ["Damma", "Fatha", "Kasra"],
                answer: 2
            },
            {
                question: "Which Harakah is this: بُ ?",
                options: ["Kasra", "Damma", "Fatha"],
                answer: 1
            }
        ]
    },

    3: {
        title: "Tanween",
        intro: "Tanween is a double vowel mark that adds an 'n' sound at the end.",

        items: [
            {
                symbol: "بً",
                name: "Fathatain",
                description: "Double Fatha: 'an' sound.",
                speak: "بً"
            },
            {
                symbol: "بٍ",
                name: "Kasratain",
                description: "Double Kasra: 'in' sound.",
                speak: "بٍ"
            },
            {
                symbol: "بٌ",
                name: "Dammatain",
                description: "Double Damma: 'un' sound.",
                speak: "بٌ"
            }
        ],

        quiz: [
            {
                question: "بً is called what?",
                options: ["Fathatain", "Kasratain", "Dammatain"],
                answer: 0
            },
            {
                question: "بٍ is called what?",
                options: ["Dammatain", "Kasratain", "Fathatain"],
                answer: 1
            },
            {
                question: "بٌ is called what?",
                options: ["Kasratain", "Fathatain", "Dammatain"],
                answer: 2
            }
        ]
    },

    4: {
        title: "Sukoon",
        intro: "Sukoon means that the letter has no short vowel sound after it.",

        items: [
            {
                symbol: "بْ",
                name: "Sukoon",
                description: "The small circle indicates no vowel after the letter.",
                speak: "بْ"
            },
            {
                symbol: "مْ",
                name: "Sukoon",
                description: "The letter ends without a short vowel.",
                speak: "مْ"
            }
        ],

        quiz: [
            {
                question: "What is this mark: ْ ?",
                options: ["Sukoon", "Fatha", "Shaddah"],
                answer: 0
            },
            {
                question: "What does Sukoon indicate?",
                options: [
                    "Long vowel",
                    "No short vowel",
                    "Double letter"
                ],
                answer: 1
            }
        ]
    },

    5: {
        title: "Shaddah",
        intro: "Shaddah indicates that the consonant is doubled.",

        items: [
            {
                symbol: "بّ",
                name: "Shaddah",
                description: "The letter is pronounced with emphasis/doubling.",
                speak: "بّ"
            },
            {
                symbol: "مّ",
                name: "Shaddah",
                description: "The consonant is doubled.",
                speak: "مّ"
            }
        ],

        quiz: [
            {
                question: "What is this mark: ّ ?",
                options: ["Sukoon", "Shaddah", "Fatha"],
                answer: 1
            },
            {
                question: "What does Shaddah indicate?",
                options: [
                    "A doubled consonant",
                    "No vowel",
                    "A long vowel"
                ],
                answer: 0
            }
        ]
    },

    6: {
        title: "Madd",
        intro: "Madd means stretching a vowel sound according to the reading rule.",

        items: [
            {
                symbol: "بَا",
                name: "Madd with Alif",
                description: "The Alif extends the 'aa' sound.",
                speak: "بَا"
            },
            {
                symbol: "بِي",
                name: "Madd with Ya",
                description: "Ya can extend the 'ee' sound.",
                speak: "بِي"
            },
            {
                symbol: "بُو",
                name: "Madd with Waw",
                description: "Waw can extend the 'oo' sound.",
                speak: "بُو"
            }
        ],

        quiz: [
            {
                question: "What does Madd mean?",
                options: [
                    "Stopping",
                    "Stretching a sound",
                    "Doubling a letter"
                ],
                answer: 1
            },
            {
                question: "Which letter commonly extends an 'aa' sound?",
                options: ["Alif", "Ba", "Ta"],
                answer: 0
            },
            {
                question: "Which is an example of a long 'oo' sound?",
                options: ["بَ", "بِ", "بُو"],
                answer: 2
            }
        ]
    }

};


/* =========================================================
   GLOBAL STATE
========================================================= */

let selectedLetter =
    arabicLetters[0];

let testQuestions = [];

let currentQuestion = 0;

let testScore = 0;

let recognition = null;

let recognitionRunning = false;

let activeLessonId = null;

let activeQuiz = null;

let activeQuizQuestion = 0;

let activeQuizScore = 0;

let speechVoices = [];


/* =========================================================
   RENDER LESSON CARDS
========================================================= */

function renderLessons() {

    if (!learningPath) {

        console.warn(
            "learningPath element not found."
        );

        return;
    }

    const progress =
        getProgress();

    learningPath.innerHTML = "";

    lessons.forEach(function (lesson) {

        const completed =
            progress.includes(lesson.id);

        const unlocked =
            lesson.id === 1 ||
            progress.includes(lesson.id - 1);

        const card =
            document.createElement("article");

        card.className =
            "lesson-card";

        if (!unlocked) {
            card.classList.add("locked");
        }

        if (completed) {
            card.classList.add("completed");
        }

        card.dataset.lessonId =
            lesson.id;

        card.innerHTML = `

            <div class="lesson-number">
                ${completed ? "✓" : lesson.id}
            </div>

            <h3>
                ${lesson.title}
            </h3>

            <p>
                ${lesson.description}
            </p>

            <span class="lesson-status">
                ${
                    completed
                        ? "✓ Completed"
                        : unlocked
                            ? "Start Lesson →"
                            : "🔒 Locked"
                }
            </span>

        `;

        if (unlocked) {

            card.addEventListener(
                "click",
                function () {

                    openLesson(
                        lesson.id
                    );

                }
            );
        }

        learningPath.appendChild(
            card
        );

    });

    updateProgress();
}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {

    const progress =
        getProgress();

    const completed =
        progress.length;

    const total =
        lessons.length;

    const percent =
        total > 0
            ? Math.round(
                (completed / total) * 100
            )
            : 0;

    if (completedLessons) {

        completedLessons.textContent =
            completed;
    }

    if (totalLessons) {

        totalLessons.textContent =
            total;
    }

    if (progressPercent) {

        progressPercent.textContent =
            percent + "%";
    }

    if (progressFill) {

        progressFill.style.width =
            percent + "%";
    }

    if (progressStatus) {

        if (percent === 0) {

            progressStatus.textContent =
                "Begin your first lesson";

        } else if (percent === 100) {

            progressStatus.textContent =
                "🎉 Quran learning journey completed!";

        } else {

            progressStatus.textContent =
                "Keep learning — you are doing great.";
        }
    }
}


/* =========================================================
   OPEN LESSON
========================================================= */

function openLesson(id) {

    const lesson =
        lessons.find(function (item) {
            return item.id === id;
        });

    if (!lesson) {
        return;
    }

    const progress =
        getProgress();

    const unlocked =
        id === 1 ||
        progress.includes(id - 1);

    if (!unlocked) {

        alert(
            "🔒 Please complete Lesson " +
            (id - 1) +
            " first."
        );

        return;
    }

    activeLessonId =
        id;

    if (id === 1) {

        openArabicLettersLesson();

        return;
    }

    if (lessonContent[id]) {

        openTheoryLesson(id);

        return;
    }

    alert(
        "This lesson is coming next, In Sha Allah."
    );
}


/* =========================================================
   CLOSE EXISTING LESSON
========================================================= */

function closeExistingLesson() {

    const modal =
        document.getElementById(
            "activeLessonModal"
        );

    if (modal) {
        modal.remove();
    }

    stopAllVoice();

    activeLessonId =
        null;

    activeQuiz =
        null;

    activeQuizQuestion =
        0;

    activeQuizScore =
        0;
}


/* =========================================================
   STOP ALL VOICE
========================================================= */

function stopAllVoice() {

    if (
        "speechSynthesis" in window
    ) {

        try {
            window.speechSynthesis.cancel();
        } catch (error) {
            console.log(error);
        }
    }

    if (recognition) {

        try {
            recognition.abort();
        } catch (error) {
            console.log(error);
        }

        recognition =
            null;
    }

    recognitionRunning =
        false;
}


/* =========================================================
   ARABIC LETTER LESSON
========================================================= */

function openArabicLettersLesson() {

    closeExistingLesson();

    activeLessonId =
        1;

    const lesson =
        document.createElement("div");

    lesson.className =
        "lesson-modal";

    lesson.id =
        "activeLessonModal";

    lesson.innerHTML = `

        <div class="lesson-modal-box">

            <button
                class="lesson-close"
                id="closeActiveLesson"
                type="button"
            >
                ×
            </button>

            <span class="eyebrow">
                LESSON 01
            </span>

            <h2>
                Arabic Letters
            </h2>

            <p class="lesson-intro">
                Learn the 28 Arabic letters.
                Tap a letter to hear its name.
            </p>

            <div class="lesson-step">

                <span class="step-number">
                    STEP 1
                </span>

                <h3>
                    Learn the Letters
                </h3>

                <p>
                    Press any letter to hear its Arabic name.
                </p>

            </div>

            <div
                class="arabic-letters"
                id="arabicLetters"
            ></div>

            <div
                class="letter-learning-card"
                id="letterLearningCard"
            >

                <div class="selected-letter">
                    ا
                </div>

                <div>

                    <strong>
                        ألف
                    </strong>

                    <p>
                        Pronunciation: ألف
                    </p>

                </div>

                <button
                    class="speak-letter-btn"
                    id="speakLetterBtn"
                    type="button"
                >
                    🔊 Hear
                </button>

            </div>

            <div class="lesson-practice">

                <span class="step-number">
                    STEP 2
                </span>

                <h3>
                    Voice Recognition Test
                </h3>

                <p>
                    Look at the letter and say its Arabic name.
                </p>

                <button
                    class="practice-start-btn"
                    id="startLetterTest"
                    type="button"
                >
                    🎯 Start Letter Test
                </button>

            </div>

            <div
                id="letterTestArea"
                class="letter-test-area"
            ></div>

        </div>

    `;

    document.body.appendChild(
        lesson
    );

    renderArabicLetters();

    const closeButton =
        document.getElementById(
            "closeActiveLesson"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeExistingLesson
        );
    }

    const testButton =
        document.getElementById(
            "startLetterTest"
        );

    if (testButton) {

        testButton.addEventListener(
            "click",
            startLetterTest
        );
    }
}


/* =========================================================
   RENDER ARABIC LETTERS
========================================================= */

function renderArabicLetters() {

    const container =
        document.getElementById(
            "arabicLetters"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    arabicLetters.forEach(
        function (item, index) {

            const button =
                document.createElement(
                    "button"
                );

            button.type =
                "button";

            button.className =
                "arabic-letter";

            button.textContent =
                item.letter;

            button.title =
                item.name;

            if (
                selectedLetter.letter ===
                item.letter
            ) {

                button.classList.add(
                    "selected"
                );
            }

            button.addEventListener(
                "click",
                function () {

                    selectedLetter =
                        item;

                    selectLetterUI(
                        button
                    );

                    speakArabicLetter(
                        item
                    );

                }
            );

            container.appendChild(
                button
            );

        }
    );

    updateSelectedLetterCard();
}


/* =========================================================
   SELECT LETTER UI
========================================================= */

function selectLetterUI(button) {

    document
        .querySelectorAll(
            ".arabic-letter"
        )
        .forEach(
            function (item) {

                item.classList.remove(
                    "selected"
                );

            }
        );

    button.classList.add(
        "selected"
    );

    updateSelectedLetterCard();
}


/* =========================================================
   UPDATE SELECTED LETTER
========================================================= */

function updateSelectedLetterCard() {

    const card =
        document.getElementById(
            "letterLearningCard"
        );

    if (!card) {
        return;
    }

    const letter =
        card.querySelector(
            ".selected-letter"
        );

    const title =
        card.querySelector(
            "strong"
        );

    const description =
        card.querySelector(
            "p"
        );

    if (letter) {

        letter.textContent =
            selectedLetter.letter;
    }

    if (title) {

        title.textContent =
            selectedLetter.name;
    }

    if (description) {

        description.textContent =
            "Pronunciation: " +
            selectedLetter.sound;
    }

    const speakButton =
        document.getElementById(
            "speakLetterBtn"
        );

    if (speakButton) {

        speakButton.onclick =
            function () {

                speakArabicLetter(
                    selectedLetter
                );

            };
    }
}


/* =========================================================
   LOAD SPEECH VOICES
========================================================= */

function loadSpeechVoices() {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }

    speechVoices =
        window.speechSynthesis.getVoices();

    console.log(
        "Available voices:",
        speechVoices
    );
}


loadSpeechVoices();


if (
    "speechSynthesis" in window
) {

    window.speechSynthesis.onvoiceschanged =
        loadSpeechVoices;
}


/* =========================================================
   ARABIC TEXT TO SPEECH
========================================================= */

function speakArabicLetter(letterData) {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Your browser does not support voice playback."
        );

        return;
    }

    try {

        stopSpeechOnly();

        const speech =
            new SpeechSynthesisUtterance();

        speech.text =
            letterData.name;

        speech.lang =
            "ar-SA";

        speech.rate =
            0.58;

        speech.pitch =
            1;

        speech.volume =
            1;

        const voices =
            window.speechSynthesis.getVoices();

        const arabicVoices =
            voices.filter(
                function (voice) {

                    return (
                        voice.lang &&
                        voice.lang
                            .toLowerCase()
                            .startsWith("ar")
                    );

                }
            );

        const preferredVoice =
            arabicVoices.find(
                function (voice) {

                    return (
                        voice.lang
                            .toLowerCase()
                            .startsWith("ar-sa")
                    );

                }
            ) ||
            arabicVoices.find(
                function (voice) {

                    return (
                        voice.lang
                            .toLowerCase()
                            .startsWith("ar-eg")
                    );

                }
            ) ||
            arabicVoices[0];

        if (preferredVoice) {

            speech.voice =
                preferredVoice;

            console.log(
                "Arabic voice:",
                preferredVoice.name,
                preferredVoice.lang
            );
        }

        speech.onerror =
            function (event) {

                console.warn(
                    "Speech synthesis error:",
                    event
                );

            };

        window.speechSynthesis.speak(
            speech
        );

    } catch (error) {

        console.error(
            "Arabic speech error:",
            error
        );
    }
}


/* =========================================================
   STOP SPEECH ONLY
========================================================= */

function stopSpeechOnly() {

    if (
        "speechSynthesis" in window
    ) {

        try {
            window.speechSynthesis.cancel();
        } catch (error) {
            console.log(error);
        }
    }
}


/* =========================================================
   START LETTER TEST
========================================================= */

function startLetterTest() {

    const area =
        document.getElementById(
            "letterTestArea"
        );

    if (!area) {
        return;
    }

    stopAllVoice();

    testQuestions =
        shuffle(
            [...arabicLetters]
        ).slice(0, 10);

    currentQuestion =
        0;

    testScore =
        0;

    renderLetterTestQuestion();
}


/* =========================================================
   RENDER LETTER TEST QUESTION
========================================================= */

function renderLetterTestQuestion() {

    const area =
        document.getElementById(
            "letterTestArea"
        );

    if (!area) {
        return;
    }

    const question =
        testQuestions[
            currentQuestion
        ];

    if (!question) {
        return;
    }

    area.innerHTML = `

        <div class="test-box">

            <span class="step-number">
                LETTER TEST
            </span>

            <h3>
                Can you recognize the letter?
            </h3>

            <p id="testInstruction">
                Look at the letter and say its Arabic name aloud.
            </p>

            <div
                class="test-letter"
                id="testLetter"
            >
                ${question.letter}
            </div>

            <div
                class="test-progress"
                id="testProgress"
            >
                Question ${currentQuestion + 1}
                /
                ${testQuestions.length}
            </div>

            <button
                class="voice-test-btn"
                id="voiceTestBtn"
                type="button"
            >
                🎙️ Speak Answer
            </button>

            <button
                class="hear-test-btn"
                id="hearTestBtn"
                type="button"
            >
                🔊 Hear Letter
            </button>

            <div
                class="test-feedback"
                id="testFeedback"
            >
                Press "Speak Answer" and say the letter name.
            </div>

        </div>

    `;

    const voiceButton =
        document.getElementById(
            "voiceTestBtn"
        );

    if (voiceButton) {

        voiceButton.addEventListener(
            "click",
            startVoiceRecognition
        );
    }

    const hearButton =
        document.getElementById(
            "hearTestBtn"
        );

    if (hearButton) {

        hearButton.addEventListener(
            "click",
            function () {

                speakArabicLetter(
                    question
                );

            }
        );
    }
}


/* =========================================================
   NORMALIZE VOICE TEXT
========================================================= */

function normalizeVoiceText(text) {

    if (!text) {
        return "";
    }

    return String(text)
        .toLowerCase()
        .normalize("NFKC")

        /* Arabic diacritics */
        .replace(
            /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g,
            ""
        )

        /* Tatweel */
        .replace(
            /\u0640/g,
            ""
        )

        /* Arabic punctuation */
        .replace(
            /[،؛؟«»“”‘’]/g,
            ""
        )

        /* English punctuation */
        .replace(
            /[.,!?;:'"`()[\]{}]/g,
            ""
        )

        .replace(
            /\s+/g,
            " "
        )

        .trim();
}


/* =========================================================
   ACCEPTED ANSWERS
========================================================= */

function getAcceptedNames(letter) {

    const names =
        Array.isArray(letter.aliases)
            ? letter.aliases
            : [letter.name];

    return [
        ...new Set(
            names
                .filter(Boolean)
                .map(normalizeVoiceText)
                .filter(Boolean)
        )
    ];
}


/* =========================================================
   CHECK VOICE ANSWER
========================================================= */

function checkVoiceAnswer(
    transcript
) {

    const question =
        testQuestions[
            currentQuestion
        ];

    if (!question) {
        return;
    }

    const answer =
        normalizeVoiceText(
            transcript
        );

    const accepted =
        getAcceptedNames(
            question
        );

    console.log(
        "Expected:",
        accepted
    );

    console.log(
        "Recognized:",
        answer
    );

    const isCorrect =
        accepted.some(
            function (name) {

                return (
                    answer === name
                );

            }
        );

    if (isCorrect) {

        testScore++;

        showTestFeedback(
            "✅ Correct! Well done.",
            "success"
        );

    } else {

        showTestFeedback(
            "❌ Not quite. Correct answer: " +
            question.name,
            "warning"
        );
    }

    /*
       Move only after a real answer.
       Recognition errors never reach here.
    */

    setTimeout(
        function () {

            if (
                currentQuestion <
                testQuestions.length
            ) {

                nextQuestion();
            }

        },
        1200
    );
}


/* =========================================================
   VOICE RECOGNITION
========================================================= */

function startVoiceRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    const voiceButton =
        document.getElementById(
            "voiceTestBtn"
        );

    if (!SpeechRecognition) {

        showTestFeedback(
            "⚠️ Voice recognition is not supported. Please use Google Chrome.",
            "warning"
        );

        return;
    }

    const question =
        testQuestions[
            currentQuestion
        ];

    if (!question) {

        showTestFeedback(
            "⚠️ Please start the Letter Test first.",
            "warning"
        );

        return;
    }

    if (recognitionRunning) {

        showTestFeedback(
            "🎙️ Already listening. Please speak now.",
            "listening"
        );

        return;
    }

    if (recognition) {

        try {
            recognition.abort();
        } catch (error) {
            console.log(error);
        }

        recognition =
            null;
    }

    const recognizer =
        new SpeechRecognition();

    recognition =
        recognizer;

    recognitionRunning =
        true;

    /*
       IMPORTANT:
       Recognition listens for Arabic.
    */

    recognizer.lang =
        "ar-SA";

    recognizer.continuous =
        false;

    recognizer.interimResults =
        false;

    recognizer.maxAlternatives =
        5;

    if (voiceButton) {

        voiceButton.disabled =
            true;

        voiceButton.textContent =
            "🎙️ Listening...";
    }

    showTestFeedback(
        "🎙️ Listening... Say the Arabic letter name.",
        "listening"
    );


    /* =====================================================
       RESULT
    ===================================================== */

    recognizer.onresult =
        function (event) {

            try {

                if (
                    !event.results ||
                    !event.results.length
                ) {

                    showTestFeedback(
                        "⚠️ I couldn't understand. Try again.",
                        "warning"
                    );

                    return;
                }

                const result =
                    event.results[0];

                const alternatives = [];

                for (
                    let i = 0;
                    i < result.length;
                    i++
                ) {

                    if (
                        result[i] &&
                        result[i].transcript
                    ) {

                        alternatives.push(
                            result[i].transcript
                        );
                    }
                }

                console.log(
                    "Voice alternatives:",
                    alternatives
                );

                const question =
                    testQuestions[
                        currentQuestion
                    ];

                const accepted =
                    getAcceptedNames(
                        question
                    );

                let matchedTranscript =
                    alternatives[0] || "";

                let foundMatch =
                    false;

                for (
                    let i = 0;
                    i < alternatives.length;
                    i++
                ) {

                    const normalized =
                        normalizeVoiceText(
                            alternatives[i]
                        );

                    if (
                        accepted.includes(
                            normalized
                        )
                    ) {

                        matchedTranscript =
                            alternatives[i];

                        foundMatch =
                            true;

                        break;
                    }
                }

                console.log(
                    "Voice match:",
                    foundMatch
                );

                checkVoiceAnswer(
                    matchedTranscript
                );

            } catch (error) {

                console.error(
                    "Voice result error:",
                    error
                );

                showTestFeedback(
                    "⚠️ I couldn't process that answer. Try again.",
                    "warning"
                );
            }
        };


    /* =====================================================
       ERROR
    ===================================================== */

    recognizer.onerror =
        function (event) {

            const errorType =
                event &&
                event.error
                    ? event.error
                    : "unknown";

            console.warn(
                "Speech recognition error:",
                errorType
            );

            let message =
                "⚠️ Voice recognition had a problem. Try again.";

            if (
                errorType ===
                "no-speech"
            ) {

                message =
                    "🎙️ I didn't hear anything. Press Speak Answer and speak clearly.";
            }

            else if (
                errorType ===
                "audio-capture"
            ) {

                message =
                    "🎤 Microphone could not be accessed. Check your microphone.";
            }

            else if (
                errorType ===
                "not-allowed"
            ) {

                message =
                    "🎤 Microphone permission is blocked. Allow microphone access in Chrome.";
            }

            else if (
                errorType ===
                "network"
            ) {

                message =
                    "🌐 Voice service could not connect. Check your internet and try again.";
            }

            else if (
                errorType ===
                "service-not-allowed"
            ) {

                message =
                    "⚠️ Browser voice service is unavailable. Try Google Chrome.";
            }

            else if (
                errorType ===
                "aborted"
            ) {

                /*
                   Abort is normally caused by
                   closing/changing the lesson.
                */

                message =
                    "🔄 Voice recognition stopped.";
            }

            showTestFeedback(
                message,
                "warning"
            );

            /*
               IMPORTANT:
               Never call nextQuestion()
               from onerror.
            */
        };


    /* =====================================================
       END
    ===================================================== */

    recognizer.onend =
        function () {

            console.log(
                "Voice recognition ended."
            );

            if (
                recognition ===
                recognizer
            ) {

                recognition =
                    null;
            }

            recognitionRunning =
                false;

            const button =
                document.getElementById(
                    "voiceTestBtn"
                );

            if (button) {

                button.disabled =
                    false;

                button.textContent =
                    "🎙️ Speak Answer";
            }
        };


    /* =====================================================
       START
    ===================================================== */

    try {

        recognizer.start();

    } catch (error) {

        console.error(
            "Recognition start error:",
            error
        );

        recognitionRunning =
            false;

        recognition =
            null;

        if (voiceButton) {

            voiceButton.disabled =
                false;

            voiceButton.textContent =
                "🎙️ Speak Answer";
        }

        showTestFeedback(
            "⚠️ Voice recognition could not start. Try again.",
            "warning"
        );
    }
}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    if (recognition) {

        try {
            recognition.abort();
        } catch (error) {
            console.log(error);
        }

        recognition =
            null;
    }

    recognitionRunning =
        false;

    currentQuestion++;

    if (
        currentQuestion >=
        testQuestions.length
    ) {

        finishLetterTest();

        return;
    }

    renderLetterTestQuestion();
}


/* =========================================================
   FINISH LETTER TEST
========================================================= */

function finishLetterTest() {

    stopAllVoice();

    const area =
        document.getElementById(
            "letterTestArea"
        );

    if (!area) {
        return;
    }

    const total =
        testQuestions.length;

    const percentage =
        total > 0
            ? Math.round(
                (testScore / total) * 100
            )
            : 0;

    const passed =
        percentage >= 80;

    area.innerHTML = `

        <div class="test-result">

            <div class="result-icon">
                ${passed ? "🎉" : "📚"}
            </div>

            <span class="step-number">
                TEST COMPLETE
            </span>

            <h3>
                ${
                    passed
                        ? "Lesson Passed!"
                        : "Keep Practicing"
                }
            </h3>

            <div class="score">
                ${testScore} / ${total}
            </div>

            <strong>
                ${percentage}% Score
            </strong>

            <p>
                ${
                    passed
                        ? "Excellent! You have shown good recognition of the Arabic letters."
                        : "Good effort! Practice the letters again and try the test once more."
                }
            </p>

            ${
                passed
                    ? `
                        <button
                            class="practice-start-btn"
                            id="completeLessonBtn"
                            type="button"
                        >
                            ✅ Complete Lesson & Unlock Next
                        </button>
                    `
                    : `
                        <button
                            class="practice-start-btn"
                            id="tryTestAgainBtn"
                            type="button"
                        >
                            🔄 Try Test Again
                        </button>
                    `
            }

        </div>

    `;

    const completeButton =
        document.getElementById(
            "completeLessonBtn"
        );

    if (completeButton) {

        completeButton.onclick =
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                completeCurrentLesson();

            };
    }

    const retryButton =
        document.getElementById(
            "tryTestAgainBtn"
        );

    if (retryButton) {

        retryButton.onclick =
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                startLetterTest();

            };
    }
}


/* =========================================================
   OPEN THEORY LESSONS 2–6
========================================================= */

function openTheoryLesson(id) {

    closeExistingLesson();

    activeLessonId =
        id;

    const data =
        lessonContent[id];

    if (!data) {
        return;
    }

    const modal =
        document.createElement("div");

    modal.className =
        "lesson-modal";

    modal.id =
        "activeLessonModal";

    modal.innerHTML = `

        <div class="lesson-modal-box">

            <button
                class="lesson-close"
                id="closeActiveLesson"
                type="button"
            >
                ×
            </button>

            <span class="eyebrow">
                LESSON ${String(id).padStart(2, "0")}
            </span>

            <h2>
                ${data.title}
            </h2>

            <p class="lesson-intro">
                ${data.intro}
            </p>

            <div class="lesson-items">

                ${data.items.map(function (item, index) {

                    return `

                        <div class="lesson-item">

                            <div
                                class="lesson-item-symbol"
                            >
                                ${item.symbol}
                            </div>

                            <div>

                                <h3>
                                    ${item.name}
                                </h3>

                                <p>
                                    ${item.description}
                                </p>

                            </div>

                            <button
                                type="button"
                                class="speak-content-btn"
                                data-speak="${item.speak}"
                            >
                                🔊 Hear
                            </button>

                        </div>

                    `;

                }).join("")}

            </div>

            <div class="lesson-practice">

                <span class="step-number">
                    PRACTICE
                </span>

                <h3>
                    Quick Knowledge Test
                </h3>

                <p>
                    Answer the questions correctly to complete this lesson.
                </p>

                <button
                    type="button"
                    class="practice-start-btn"
                    id="startTheoryQuiz"
                >
                    🎯 Start Test
                </button>

            </div>

            <div
                id="theoryQuizArea"
                class="letter-test-area"
            ></div>

        </div>

    `;

    document.body.appendChild(
        modal
    );

    const closeButton =
        document.getElementById(
            "closeActiveLesson"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeExistingLesson
        );
    }

    const quizButton =
        document.getElementById(
            "startTheoryQuiz"
        );

    if (quizButton) {

        quizButton.addEventListener(
            "click",
            function () {

                startTheoryQuiz(id);

            }
        );
    }

    document
        .querySelectorAll(
            ".speak-content-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        speakArabicText(
                            button.dataset.speak
                        );

                    }
                );

            }
        );
}


/* =========================================================
   SPEAK ARABIC CONTENT
========================================================= */

function speakArabicText(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;
    }

    stopSpeechOnly();

    const speech =
        new SpeechSynthesisUtterance(
            text
        );

    speech.lang =
        "ar-SA";

    speech.rate =
        0.58;

    speech.pitch =
        1;

    speech.volume =
        1;

    const voices =
        window.speechSynthesis.getVoices();

    const arabicVoice =
        voices.find(
            function (voice) {

                return (
                    voice.lang &&
                    voice.lang
                        .toLowerCase()
                        .startsWith("ar")
                );

            }
        );

    if (arabicVoice) {

        speech.voice =
            arabicVoice;
    }

    window.speechSynthesis.speak(
        speech
    );
}


/* =========================================================
   THEORY QUIZ
========================================================= */

function startTheoryQuiz(id) {

    const data =
        lessonContent[id];

    if (!data) {
        return;
    }

    activeLessonId =
        id;

    activeQuiz =
        data.quiz;

    activeQuizQuestion =
        0;

    activeQuizScore =
        0;

    renderTheoryQuiz();
}


/* =========================================================
   RENDER THEORY QUIZ
========================================================= */

function renderTheoryQuiz() {

    const area =
        document.getElementById(
            "theoryQuizArea"
        );

    if (!area || !activeQuiz) {
        return;
    }

    const question =
        activeQuiz[
            activeQuizQuestion
        ];

    if (!question) {
        finishTheoryQuiz();
        return;
    }

    area.innerHTML = `

        <div class="test-box">

            <span class="step-number">
                QUESTION
                ${activeQuizQuestion + 1}
                /
                ${activeQuiz.length}
            </span>

            <h3>
                ${question.question}
            </h3>

            <div class="quiz-options">

                ${question.options.map(
                    function (option, index) {

                        return `

                            <button
                                type="button"
                                class="quiz-option"
                                data-answer="${index}"
                            >
                                ${option}
                            </button>

                        `;

                    }
                ).join("")}

            </div>

            <div
                class="test-feedback"
                id="theoryQuizFeedback"
            >
                Choose the correct answer.
            </div>

        </div>

    `;

    area
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        answerTheoryQuestion(
                            Number(
                                button.dataset.answer
                            )
                        );

                    }
                );

            }
        );
}


/* =========================================================
   ANSWER THEORY QUESTION
========================================================= */

function answerTheoryQuestion(answer) {

    if (!activeQuiz) {
        return;
    }

    const question =
        activeQuiz[
            activeQuizQuestion
        ];

    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );

    buttons.forEach(
        function (button) {

            button.disabled =
                true;

        }
    );

    if (
        answer ===
        question.answer
    ) {

        activeQuizScore++;

        showTheoryFeedback(
            "✅ Correct! Well done.",
            "success"
        );

    } else {

        showTheoryFeedback(
            "❌ Not quite. Correct answer: " +
            question.options[
                question.answer
            ],
            "warning"
        );
    }

    setTimeout(
        function () {

            activeQuizQuestion++;

            renderTheoryQuiz();

        },
        1000
    );
}


/* =========================================================
   THEORY QUIZ FEEDBACK
========================================================= */

function showTheoryFeedback(
    message,
    type
) {

    const feedback =
        document.getElementById(
            "theoryQuizFeedback"
        );

    if (!feedback) {
        return;
    }

    feedback.textContent =
        message;

    feedback.className =
        "test-feedback";

    feedback.classList.add(
        type
    );
}


/* =========================================================
   FINISH THEORY QUIZ
========================================================= */

function finishTheoryQuiz() {

    const area =
        document.getElementById(
            "theoryQuizArea"
        );

    if (!area || !activeQuiz) {
        return;
    }

    const total =
        activeQuiz.length;

    const percentage =
        total > 0
            ? Math.round(
                (activeQuizScore / total) * 100
            )
            : 0;

    const passed =
        percentage >= 80;

    area.innerHTML = `

        <div class="test-result">

            <div class="result-icon">
                ${passed ? "🎉" : "📚"}
            </div>

            <span class="step-number">
                TEST COMPLETE
            </span>

            <h3>
                ${
                    passed
                        ? "Lesson Passed!"
                        : "Keep Practicing"
                }
            </h3>

            <div class="score">
                ${activeQuizScore} / ${total}
            </div>

            <strong>
                ${percentage}% Score
            </strong>

            <p>
                ${
                    passed
                        ? "Excellent work! You are ready for the next lesson."
                        : "You need 80% to unlock the next lesson."
                }
            </p>

            ${
                passed
                    ? `
                        <button
                            type="button"
                            class="practice-start-btn"
                            id="completeTheoryLessonBtn"
                        >
                            ✅ Complete Lesson & Unlock Next
                        </button>
                    `
                    : `
                        <button
                            type="button"
                            class="practice-start-btn"
                            id="retryTheoryQuizBtn"
                        >
                            🔄 Try Test Again
                        </button>
                    `
            }

        </div>

    `;

    const completeButton =
        document.getElementById(
            "completeTheoryLessonBtn"
        );

    if (completeButton) {

        completeButton.onclick =
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                completeCurrentLesson();

            };
    }

    const retryButton =
        document.getElementById(
            "retryTheoryQuizBtn"
        );

    if (retryButton) {

        retryButton.onclick =
            function () {

                startTheoryQuiz(
                    activeLessonId
                );

            };
    }
}


/* =========================================================
   COMPLETE CURRENT LESSON
   THIS IS THE MAIN UNLOCK SYSTEM
========================================================= */

function completeCurrentLesson() {

    const lessonId =
        Number(activeLessonId);

    if (
        !lessonId ||
        lessonId < 1 ||
        lessonId > lessons.length
    ) {

        console.error(
            "Invalid active lesson:",
            activeLessonId
        );

        return;
    }

    console.log(
        "Completing lesson:",
        lessonId
    );

    let progress =
        getProgress();

    if (
        !progress.includes(
            lessonId
        )
    ) {

        progress.push(
            lessonId
        );
    }

    saveProgress(
        progress
    );

    console.log(
        "Saved progress:",
        getProgress()
    );

    /*
       IMPORTANT:
       Update lesson cards BEFORE closing modal.
    */

    renderLessons();

    const nextLesson =
        lessons.find(
            function (lesson) {

                return (
                    lesson.id ===
                    lessonId + 1
                );

            }
        );

    closeExistingLesson();

    /*
       Show reaction after UI update.
    */

    setTimeout(
        function () {

            if (nextLesson) {

                alert(
                    "🎉 Lesson " +
                    String(lessonId).padStart(2, "0") +
                    " Completed!\n\n" +
                    "🔓 Lesson " +
                    String(nextLesson.id).padStart(2, "0") +
                    " — " +
                    nextLesson.title +
                    " is now unlocked."
                );

            } else {

                alert(
                    "🎉 MashaAllah!\n\n" +
                    "You have completed all available Tilawat lessons."
                );
            }

            /*
               Re-render once more after alert.
            */

            renderLessons();

        },
        250
    );
}


/* =========================================================
   EVENT DELEGATION FALLBACK
   EVEN IF A BUTTON IS RECREATED, IT STILL WORKS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const completeButton =
            event.target.closest(
                "#completeLessonBtn, #completeTheoryLessonBtn"
            );

        if (completeButton) {

            event.preventDefault();
            event.stopPropagation();

            completeCurrentLesson();

        }

    }
);


/* =========================================================
   SHUFFLE
========================================================= */

function shuffle(array) {

    const result =
        [...array];

    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        const temp =
            result[i];

        result[i] =
            result[j];

        result[j] =
            temp;
    }

    return result;
}


/* =========================================================
   FEEDBACK
========================================================= */

function showTestFeedback(
    message,
    type
) {

    const feedback =
        document.getElementById(
            "testFeedback"
        );

    if (!feedback) {
        return;
    }

    feedback.textContent =
        message;

    feedback.className =
        "test-feedback";

    if (type) {

        feedback.classList.add(
            type
        );
    }
}


/* =========================================================
   HERO — START LEARNING
========================================================= */

if (startLearningBtn) {

    startLearningBtn.addEventListener(
        "click",
        function () {

            const section =
                document.getElementById(
                    "learning-path"
                );

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth"
                });
            }

            setTimeout(
                function () {

                    openLesson(1);

                },
                500
            );
        }
    );
}


/* =========================================================
   HERO — CONTINUE LEARNING
========================================================= */

if (continueBtn) {

    continueBtn.addEventListener(
        "click",
        function () {

            const progress =
                getProgress();

            const nextLesson =
                lessons.find(
                    function (lesson) {

                        const completed =
                            progress.includes(
                                lesson.id
                            );

                        const unlocked =
                            lesson.id === 1 ||
                            progress.includes(
                                lesson.id - 1
                            );

                        return (
                            !completed &&
                            unlocked
                        );
                    }
                );

            if (nextLesson) {

                openLesson(
                    nextLesson.id
                );

            } else {

                alert(
                    "🎉 You have completed all available lessons!"
                );
            }
        }
    );
}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {

    const theme =
        localStorage.getItem(
            THEME_KEY
        ) || "dark";

    document.documentElement.setAttribute(
        "data-tilawat-theme",
        theme
    );

    if (themeBtn) {

        themeBtn.textContent =
            theme === "dark"
                ? "☀️"
                : "🌙";
    }
}


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        function () {

            const current =
                document.documentElement
                    .getAttribute(
                        "data-tilawat-theme"
                    ) || "dark";

            const next =
                current === "dark"
                    ? "light"
                    : "dark";

            localStorage.setItem(
                THEME_KEY,
                next
            );

            applyTheme();
        }
    );
}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeExistingLesson();
        }
    }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initializeTilawat() {

    renderLessons();

    applyTheme();

    loadSpeechVoices();

    console.log(
        "===================================="
    );

    console.log(
        "Islamic Soldier Tilawat Engine v2.0"
    );

    console.log(
        "Lessons: 1 → 2 → 3 → 4 → 5 → 6"
    );

    console.log(
        "Progress:",
        getProgress()
    );

    console.log(
        "===================================="
    );
}


initializeTilawat();