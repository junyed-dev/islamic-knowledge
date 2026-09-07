/* =========================================================
   ISLAMIC SOLDIER
   TASBIH 2.0
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   01. STORAGE KEYS
========================================================= */

const STORAGE_KEY = "islamicSoldierTasbih";

const SOUND_STORAGE_KEY = "islamicSoldierTasbihSound";


/* =========================================================
   02. DEFAULT STATE
========================================================= */

const defaultState = {
    count: 0,
    target: 33,
    zikr: "SubhanAllah",
    meaning: "Glory be to Allah"
};


/* =========================================================
   03. CURRENT STATE
========================================================= */

let state = {
    ...defaultState
};


/* =========================================================
   04. SOUND STATE
========================================================= */

let soundEnabled = true;


/* =========================================================
   05. AUDIO CONTEXT
========================================================= */

let audioContext = null;


/* =========================================================
   06. DOM ELEMENTS
========================================================= */

const countDisplay =
    document.getElementById("countDisplay");

const targetDisplay =
    document.getElementById("targetDisplay");

const progressPercent =
    document.getElementById("progressPercent");

const progressFill =
    document.getElementById("progressFill");

const counterRing =
    document.getElementById("counterRing");

const currentZikr =
    document.getElementById("currentZikr");

const currentMeaning =
    document.getElementById("currentMeaning");

const tapButton =
    document.getElementById("tapButton");

const minusButton =
    document.getElementById("minusButton");

const resetButton =
    document.getElementById("resetButton");

const completionMessage =
    document.getElementById("completionMessage");

const soundToggle =
    document.getElementById("soundToggle");

const soundIcon =
    document.getElementById("soundIcon");

const soundText =
    document.getElementById("soundText");

const customTargetButton =
    document.getElementById("customTargetButton");

const customTargetArea =
    document.getElementById("customTargetArea");

const customTarget =
    document.getElementById("customTarget");

const applyCustomTarget =
    document.getElementById("applyCustomTarget");


/* =========================================================
   07. ZIKR BUTTONS
========================================================= */

const zikrButtons =
    document.querySelectorAll(".zikr-btn");


/* =========================================================
   08. TARGET BUTTONS
========================================================= */

const targetButtons =
    document.querySelectorAll(".target-btn");


/* =========================================================
   09. LOAD SAVED STATE
========================================================= */

function loadState() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            state = {
                ...defaultState
            };

            return;
        }

        const parsed =
            JSON.parse(saved);

        if (
            parsed &&
            typeof parsed === "object"
        ) {

            state = {
                ...defaultState,
                ...parsed
            };

        }

    } catch (error) {

        console.warn(
            "Tasbih state could not be loaded.",
            error
        );

        state = {
            ...defaultState
        };
    }
}


/* =========================================================
   10. SAVE STATE
========================================================= */

function saveState() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state)
        );

    } catch (error) {

        console.warn(
            "Tasbih state could not be saved.",
            error
        );
    }
}


/* =========================================================
   11. LOAD SOUND PREFERENCE
========================================================= */

function loadSoundPreference() {

    try {

        const saved =
            localStorage.getItem(
                SOUND_STORAGE_KEY
            );

        if (saved === null) {

            soundEnabled = true;

            return;
        }

        soundEnabled =
            saved === "true";

    } catch (error) {

        console.warn(
            "Sound preference could not be loaded.",
            error
        );

        soundEnabled = true;
    }
}


/* =========================================================
   12. SAVE SOUND PREFERENCE
========================================================= */

function saveSoundPreference() {

    try {

        localStorage.setItem(
            SOUND_STORAGE_KEY,
            String(soundEnabled)
        );

    } catch (error) {

        console.warn(
            "Sound preference could not be saved.",
            error
        );
    }
}


/* =========================================================
   13. UPDATE SOUND UI
========================================================= */

function updateSoundUI() {

    if (!soundToggle) {
        return;
    }


    soundToggle.setAttribute(
        "aria-pressed",
        String(soundEnabled)
    );


    if (soundEnabled) {

        soundIcon.textContent = "🔊";

        soundText.textContent =
            "Sound ON";

        soundToggle.classList.add(
            "sound-on"
        );

        soundToggle.classList.remove(
            "sound-off"
        );

    } else {

        soundIcon.textContent = "🔇";

        soundText.textContent =
            "Sound OFF";

        soundToggle.classList.add(
            "sound-off"
        );

        soundToggle.classList.remove(
            "sound-on"
        );
    }
}


/* =========================================================
   14. INITIALIZE AUDIO CONTEXT
========================================================= */

function initializeAudioContext() {

    if (audioContext) {
        return;
    }

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) {
        return;
    }

    try {

        audioContext =
            new AudioContext();

    } catch (error) {

        console.warn(
            "Audio context could not be created.",
            error
        );
    }
}


/* =========================================================
   15. RESUME AUDIO CONTEXT
========================================================= */

function resumeAudioContext() {

    if (!audioContext) {
        initializeAudioContext();
    }

    if (
        audioContext &&
        audioContext.state === "suspended"
    ) {

        audioContext.resume()
            .catch(() => {});

    }
}


/* =========================================================
   16. PLAY TAP SOUND
========================================================= */

function playTapSound() {

    if (!soundEnabled) {
        return;
    }

    if (!audioContext) {
        initializeAudioContext();
    }

    if (!audioContext) {
        return;
    }

    resumeAudioContext();


    try {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(
            520,
            audioContext.currentTime
        );


        oscillator.frequency.exponentialRampToValueAtTime(
            260,
            audioContext.currentTime + 0.06
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.08,
            audioContext.currentTime + 0.005
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.07
        );


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.08
        );

    } catch (error) {

        console.warn(
            "Tap sound could not play.",
            error
        );
    }
}


/* =========================================================
   17. PLAY COMPLETION SOUND
========================================================= */

function playCompletionSound() {

    if (!soundEnabled) {
        return;
    }

    if (!audioContext) {
        initializeAudioContext();
    }

    if (!audioContext) {
        return;
    }

    resumeAudioContext();


    try {

        const now =
            audioContext.currentTime;


        const notes = [
            {
                frequency: 523.25,
                time: 0
            },
            {
                frequency: 659.25,
                time: 0.12
            },
            {
                frequency: 783.99,
                time: 0.24
            }
        ];


        notes.forEach(
            (note) => {

                const oscillator =
                    audioContext.createOscillator();

                const gain =
                    audioContext.createGain();


                oscillator.type =
                    "sine";


                oscillator.frequency.value =
                    note.frequency;


                gain.gain.setValueAtTime(
                    0.0001,
                    now + note.time
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.07,
                    now + note.time + 0.01
                );


                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    now + note.time + 0.2
                );


                oscillator.connect(gain);

                gain.connect(
                    audioContext.destination
                );


                oscillator.start(
                    now + note.time
                );


                oscillator.stop(
                    now + note.time + 0.22
                );

            }
        );

    } catch (error) {

        console.warn(
            "Completion sound could not play.",
            error
        );
    }
}


/* =========================================================
   18. UPDATE COUNTER UI
========================================================= */

function updateUI() {

    countDisplay.textContent =
        state.count;


    targetDisplay.textContent =
        state.target;


    currentZikr.textContent =
        state.zikr;


    currentMeaning.textContent =
        state.meaning;


    let percentage =
        (state.count / state.target) * 100;


    percentage =
        Math.min(
            100,
            Math.max(
                0,
                percentage
            )
        );


    const roundedPercentage =
        Math.round(percentage);


    progressPercent.textContent =
        `${roundedPercentage}%`;


    progressFill.style.width =
        `${percentage}%`;


    counterRing.style.setProperty(
        "--progress",
        `${percentage * 3.6}deg`
    );


    updateZikrButtons();

    updateTargetButtons();

    updateCompletionState();

    saveState();
}


/* =========================================================
   19. UPDATE ZIKR BUTTONS
========================================================= */

function updateZikrButtons() {

    zikrButtons.forEach(
        (button) => {

            const selected =
                button.dataset.zikr ===
                state.zikr;

            button.classList.toggle(
                "active",
                selected
            );

        }
    );
}


/* =========================================================
   20. UPDATE TARGET BUTTONS
========================================================= */

function updateTargetButtons() {

    targetButtons.forEach(
        (button) => {

            if (
                !button.dataset.target
            ) {
                return;
            }


            const selected =
                Number(
                    button.dataset.target
                ) === state.target;


            button.classList.toggle(
                "active",
                selected
            );

        }
    );


    if (
        Number(state.target) !== 33 &&
        Number(state.target) !== 99 &&
        Number(state.target) !== 100
    ) {

        customTargetButton.classList.add(
            "active"
        );

    } else {

        customTargetButton.classList.remove(
            "active"
        );
    }
}


/* =========================================================
   21. COMPLETION STATE
========================================================= */

function updateCompletionState() {

    if (
        state.count >= state.target
    ) {

        completionMessage.hidden =
            false;

        counterRing.classList.add(
            "completed"
        );

        tapButton.classList.add(
            "completed"
        );

    } else {

        completionMessage.hidden =
            true;

        counterRing.classList.remove(
            "completed"
        );

        tapButton.classList.remove(
            "completed"
        );
    }
}


/* =========================================================
   22. ADD COUNT
========================================================= */

function addCount() {

    initializeAudioContext();

    resumeAudioContext();


    if (
        state.count >= state.target
    ) {

        return;
    }


    state.count += 1;


    playTapSound();


    animateTap();


    if (
        state.count === state.target
    ) {

        showCompletion();

    }


    updateUI();
}


/* =========================================================
   23. REMOVE COUNT
========================================================= */

function removeCount() {

    if (
        state.count <= 0
    ) {

        return;
    }


    state.count -= 1;


    completionMessage.hidden =
        true;


    counterRing.classList.remove(
        "completed"
    );


    tapButton.classList.remove(
        "completed"
    );


    updateUI();
}


/* =========================================================
   24. RESET COUNTER
========================================================= */

function resetCounter() {

    const confirmed =
        window.confirm(
            "Are you sure you want to reset the counter?"
        );


    if (!confirmed) {
        return;
    }


    state.count = 0;


    completionMessage.hidden =
        true;


    counterRing.classList.remove(
        "completed"
    );


    tapButton.classList.remove(
        "completed"
    );


    updateUI();
}


/* =========================================================
   25. SHOW COMPLETION
========================================================= */

function showCompletion() {

    completionMessage.hidden =
        false;


    counterRing.classList.add(
        "completed"
    );


    tapButton.classList.add(
        "completed"
    );


    playCompletionSound();


    createCompletionParticles();

}


/* =========================================================
   26. TAP ANIMATION
========================================================= */

function animateTap() {

    tapButton.classList.remove(
        "tap-active"
    );


    void tapButton.offsetWidth;


    tapButton.classList.add(
        "tap-active"
    );


    setTimeout(
        () => {

            tapButton.classList.remove(
                "tap-active"
            );

        },
        180
    );
}


/* =========================================================
   27. COMPLETION PARTICLES
========================================================= */

function createCompletionParticles() {

    const particleCount =
        18;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "tasbih-particle";


        particle.textContent =
            "✦";


        particle.style.setProperty(
            "--x",
            `${Math.random() * 240 - 120}px`
        );


        particle.style.setProperty(
            "--y",
            `${Math.random() * -180 - 30}px`
        );


        particle.style.setProperty(
            "--delay",
            `${Math.random() * 0.25}s`
        );


        counterRing.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            1300
        );
    }
}


/* =========================================================
   28. CHANGE ZIKR
========================================================= */

function changeZikr(button) {

    const newZikr =
        button.dataset.zikr;

    const newMeaning =
        button.dataset.meaning;


    if (!newZikr) {
        return;
    }


    state.zikr =
        newZikr;


    state.meaning =
        newMeaning ||
        "";


    state.count = 0;


    completionMessage.hidden =
        true;


    counterRing.classList.remove(
        "completed"
    );


    tapButton.classList.remove(
        "completed"
    );


    updateUI();
}


/* =========================================================
   29. CHANGE TARGET
========================================================= */

function changeTarget(target) {

    const numericTarget =
        Number(target);


    if (
        !Number.isFinite(
            numericTarget
        )
    ) {

        return;
    }


    if (
        numericTarget < 1
    ) {

        return;
    }


    state.target =
        Math.floor(
            numericTarget
        );


    if (
        state.count > state.target
    ) {

        state.count =
            state.target;
    }


    completionMessage.hidden =
        true;


    counterRing.classList.remove(
        "completed"
    );


    tapButton.classList.remove(
        "completed"
    );


    updateUI();
}


/* =========================================================
   30. CUSTOM TARGET TOGGLE
========================================================= */

function toggleCustomTarget() {

    customTargetArea.hidden =
        !customTargetArea.hidden;


    if (
        !customTargetArea.hidden
    ) {

        customTarget.focus();
    }
}


/* =========================================================
   31. APPLY CUSTOM TARGET
========================================================= */

function applyCustomTargetValue() {

    const value =
        Number(
            customTarget.value
        );


    if (
        !Number.isFinite(value) ||
        value < 1
    ) {

        customTarget.focus();

        return;
    }


    if (
        value > 99999
    ) {

        customTarget.value =
            "99999";

        changeTarget(99999);

        return;
    }


    changeTarget(value);


    customTargetArea.hidden =
        true;


    customTarget.value =
        "";
}


/* =========================================================
   32. TOGGLE SOUND
========================================================= */

function toggleSound() {

    soundEnabled =
        !soundEnabled;


    saveSoundPreference();

    updateSoundUI();


    if (soundEnabled) {

        initializeAudioContext();

        resumeAudioContext();

        playTapSound();

    }
}


/* =========================================================
   33. ZIKR EVENT LISTENERS
========================================================= */

zikrButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                changeZikr(button);

            }
        );

    }
);


/* =========================================================
   34. TARGET EVENT LISTENERS
========================================================= */

document.querySelectorAll(
    ".target-btn[data-target]"
).forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                changeTarget(
                    button.dataset.target
                );

            }
        );

    }
);


/* =========================================================
   35. CUSTOM TARGET BUTTON
========================================================= */

customTargetButton.addEventListener(
    "click",
    toggleCustomTarget
);


/* =========================================================
   36. APPLY CUSTOM TARGET
========================================================= */

applyCustomTarget.addEventListener(
    "click",
    applyCustomTargetValue
);


/* =========================================================
   37. CUSTOM INPUT ENTER KEY
========================================================= */

customTarget.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter"
        ) {

            applyCustomTargetValue();

        }

    }
);


/* =========================================================
   38. TAP BUTTON
========================================================= */

tapButton.addEventListener(
    "click",
    addCount
);


/* =========================================================
   39. MINUS BUTTON
========================================================= */

minusButton.addEventListener(
    "click",
    removeCount
);


/* =========================================================
   40. RESET BUTTON
========================================================= */

resetButton.addEventListener(
    "click",
    resetCounter
);


/* =========================================================
   41. SOUND BUTTON
========================================================= */

soundToggle.addEventListener(
    "click",
    toggleSound
);


/* =========================================================
   42. KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement &&
            (
                activeElement.tagName ===
                "INPUT" ||
                activeElement.tagName ===
                "TEXTAREA"
            );


        if (isTyping) {
            return;
        }


        if (
            event.code === "Space" ||
            event.code === "Enter"
        ) {

            event.preventDefault();

            addCount();

        }


        if (
            event.key.toLowerCase() === "r"
        ) {

            resetCounter();

        }

    }
);


/* =========================================================
   43. TOUCH FEEDBACK
========================================================= */

tapButton.addEventListener(
    "touchstart",
    () => {

        tapButton.classList.add(
            "touching"
        );

    },
    {
        passive: true
    }
);


tapButton.addEventListener(
    "touchend",
    () => {

        tapButton.classList.remove(
            "touching"
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   44. PREVENT DOUBLE TAP ZOOM
========================================================= */

let lastTapTime = 0;


tapButton.addEventListener(
    "touchend",
    (event) => {

        const currentTime =
            Date.now();


        if (
            currentTime -
            lastTapTime <
            300
        ) {

            event.preventDefault();

        }


        lastTapTime =
            currentTime;

    },
    {
        passive: false
    }
);


/* =========================================================
   45. PAGE VISIBILITY
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            saveState();

            saveSoundPreference();

        }

    }
);


/* =========================================================
   46. BEFORE PAGE CLOSE
========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        saveState();

        saveSoundPreference();

    }
);


/* =========================================================
   47. INITIALIZE
========================================================= */

function initializeTasbih() {

    loadState();

    loadSoundPreference();

    updateSoundUI();

    updateUI();

}


/* =========================================================
   48. START
========================================================= */

initializeTasbih();