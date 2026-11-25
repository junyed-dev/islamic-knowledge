/* =========================================================
   ISLAMIC SOLDIER — REAL QIBLA COMPASS ENGINE
   ========================================================= */

"use strict";

const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

// -----------------------------
// HTML ELEMENTS
// -----------------------------

const compass = document.getElementById("compass");
const compassDial = document.getElementById("compassDial");
const degreeTicks = document.getElementById("degreeTicks");
const degreeNumbers = document.getElementById("degreeNumbers");

const qiblaIndicator = document.getElementById("qiblaIndicator");
const compassNeedle = document.getElementById("compassNeedle");

const headingDegree = document.getElementById("headingDegree");
const headingDirection = document.getElementById("headingDirection");

const qiblaDegree = document.getElementById("qiblaDegree");
const qiblaDirection = document.getElementById("qiblaDirection");

const largeHeading = document.getElementById("largeHeading");
const largeDirection = document.getElementById("largeDirection");

const compassState = document.getElementById("compassState");
const statusIndicator = document.getElementById("statusIndicator");

const gpsStateTop = document.getElementById("gpsStateTop");
const gpsSignal = document.getElementById("gpsSignal");

const locationText = document.getElementById("locationText");
const coordinatesText = document.getElementById("coordinatesText");
const accuracyState = document.getElementById("accuracyState");

const qiblaInstruction = document.getElementById("qiblaInstruction");

const detectBtn = document.getElementById("detectBtn");
const calibrateBtn = document.getElementById("calibrateBtn");

const sensorMessage = document.getElementById("sensorMessage");

// -----------------------------
// VARIABLES
// -----------------------------

let currentHeading = null;
let qiblaBearing = null;

let userLatitude = null;
let userLongitude = null;
let gpsAccuracy = null;

let compassListenerAdded = false;
let gpsWatchId = null;


// =========================================================
// ANGLE FUNCTIONS
// =========================================================

function normalizeAngle(angle) {
    angle = angle % 360;

    if (angle < 0) {
        angle += 360;
    }

    return angle;
}


function shortestAngleDifference(from, to) {
    return ((to - from + 540) % 360) - 180;
}


function smoothHeading(current, target, factor = 0.18) {
    const difference = shortestAngleDifference(current, target);

    return normalizeAngle(
        current + difference * factor
    );
}


// =========================================================
// DIRECTION
// =========================================================

function getDirection(angle) {

    const directions = [
        "N",
        "NE",
        "E",
        "SE",
        "S",
        "SW",
        "W",
        "NW"
    ];

    const index =
        Math.round(normalizeAngle(angle) / 45) % 8;

    return directions[index];
}


// =========================================================
// CREATE DEGREE TICKS
// =========================================================

function createDegreeTicks() {

    if (!degreeTicks) return;

    degreeTicks.innerHTML = "";

    for (let degree = 0; degree < 360; degree += 5) {

        const tick = document.createElement("span");

        tick.className = "degree-tick";

        if (degree % 30 === 0) {
            tick.classList.add("major");
        }
        else if (degree % 10 === 0) {
            tick.classList.add("medium");
        }

        tick.style.transform =
            `rotate(${degree}deg)`;

        degreeTicks.appendChild(tick);
    }
}


// =========================================================
// CREATE DEGREE NUMBERS
// =========================================================

function createDegreeNumbers() {

    if (!degreeNumbers) return;

    degreeNumbers.innerHTML = "";

    for (let degree = 0; degree < 360; degree += 30) {

        const number = document.createElement("span");

        number.className = "degree-number";

        number.textContent = `${degree}°`;

        number.style.transform =
            `rotate(${degree}deg)`;

        degreeNumbers.appendChild(number);
    }
}


// =========================================================
// UPDATE COMPASS DIAL
// =========================================================

function updateDial(heading) {

    if (!compassDial) return;

    compassDial.style.transform =
        `rotate(${-heading}deg)`;
}


// =========================================================
// UPDATE QIBLA INDICATOR
// =========================================================

function updateQiblaIndicator(heading) {

    if (!qiblaIndicator || qiblaBearing === null) {
        return;
    }

    const relativeAngle =
        shortestAngleDifference(
            heading,
            qiblaBearing
        );

    qiblaIndicator.style.transform =
        `translate(-50%, -50%) rotate(${relativeAngle}deg)`;
}


// =========================================================
// UPDATE HEADING UI
// =========================================================

function updateHeadingUI(heading) {

    const rounded =
        Math.round(normalizeAngle(heading));

    const direction =
        getDirection(rounded);

    if (headingDegree) {
        headingDegree.textContent =
            `${rounded}°`;
    }

    if (headingDirection) {
        headingDirection.textContent =
            direction;
    }

    if (largeHeading) {
        largeHeading.textContent =
            `${rounded}°`;
    }

    if (largeDirection) {
        largeDirection.textContent =
            direction;
    }

    if (compassState) {
        compassState.textContent =
            `Heading ${rounded}° • ${direction}`;
    }

    if (statusIndicator) {
        statusIndicator.classList.add("active");
    }
}


// =========================================================
// UPDATE EVERYTHING
// =========================================================

function updateCompass(heading) {

    if (
        typeof heading !== "number" ||
        !Number.isFinite(heading)
    ) {
        return;
    }

    heading = normalizeAngle(heading);

    if (currentHeading === null) {

        currentHeading = heading;

    } else {

        currentHeading =
            smoothHeading(
                currentHeading,
                heading,
                0.25
            );
    }

    updateDial(currentHeading);

    updateQiblaIndicator(currentHeading);

    updateHeadingUI(currentHeading);

    if (compass) {
        compass.classList.add("sensor-active");
    }
}


// =========================================================
// DEVICE ORIENTATION
// =========================================================

function handleOrientation(event) {

    let heading = null;

    // iPhone / Safari
    if (
        typeof event.webkitCompassHeading === "number" &&
        Number.isFinite(event.webkitCompassHeading)
    ) {

        heading =
            event.webkitCompassHeading;

    }

    // Android / other browsers
    else if (
        typeof event.alpha === "number" &&
        Number.isFinite(event.alpha)
    ) {

        heading =
            360 - event.alpha;

        const orientation =
            getScreenOrientation();

        heading += orientation;
    }

    if (
        typeof heading === "number" &&
        Number.isFinite(heading)
    ) {

        updateCompass(
            normalizeAngle(heading)
        );
    }
}


// =========================================================
// SCREEN ORIENTATION
// =========================================================

function getScreenOrientation() {

    if (
        screen.orientation &&
        typeof screen.orientation.angle === "number"
    ) {

        return screen.orientation.angle;
    }

    if (
        typeof window.orientation === "number"
    ) {

        return window.orientation;
    }

    return 0;
}


// =========================================================
// START COMPASS
// =========================================================

async function startCompass() {

    if (
        typeof DeviceOrientationEvent ===
        "undefined"
    ) {

        showSensorError(
            "This device does not support a compass sensor."
        );

        return;
    }


    // iOS permission
    if (
        typeof DeviceOrientationEvent.requestPermission ===
        "function"
    ) {

        try {

            const permission =
                await DeviceOrientationEvent.requestPermission();

            if (permission !== "granted") {

                showSensorError(
                    "Compass permission was denied."
                );

                return;
            }

        }
        catch (error) {

            console.error(
                "Compass permission error:",
                error
            );

            showSensorError(
                "Compass permission could not be granted."
            );

            return;
        }
    }


    // Prevent duplicate listeners
    if (compassListenerAdded) {
        return;
    }

    compassListenerAdded = true;


    if (
        "ondeviceorientationabsolute" in window
    ) {

        window.addEventListener(
            "deviceorientationabsolute",
            handleOrientation,
            true
        );

    } else {

        window.addEventListener(
            "deviceorientation",
            handleOrientation,
            true
        );
    }


    if (sensorMessage) {
        sensorMessage.textContent =
            "Compass sensor is active. Move your phone slowly for calibration.";
    }

    if (compassState) {
        compassState.textContent =
            "Compass sensor active";
    }
}


// =========================================================
// SENSOR ERROR
// =========================================================

function showSensorError(message) {

    if (sensorMessage) {
        sensorMessage.textContent =
            message;
    }

    if (compassState) {
        compassState.textContent =
            message;
    }
}


// =========================================================
// GPS
// =========================================================

function startGPS() {

    if (!navigator.geolocation) {

        setGPSUnavailable();

        return;
    }


    if (gpsStateTop) {
        gpsStateTop.textContent =
            "Locating...";
    }

    if (locationText) {
        locationText.textContent =
            "Detecting your location...";
    }


    if (gpsWatchId !== null) {

        navigator.geolocation.clearWatch(
            gpsWatchId
        );
    }


    gpsWatchId =
        navigator.geolocation.watchPosition(
            handleGPSPosition,
            handleGPSError,
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 5000
            }
        );
}


// =========================================================
// GPS SUCCESS
// =========================================================

function handleGPSPosition(position) {

    userLatitude =
        position.coords.latitude;

    userLongitude =
        position.coords.longitude;

    gpsAccuracy =
        position.coords.accuracy;


    if (gpsStateTop) {
        gpsStateTop.textContent =
            "Active";
    }

    if (gpsSignal) {
        gpsSignal.textContent =
            "Strong";
    }


    if (accuracyState) {

        accuracyState.textContent =
            `${Math.round(gpsAccuracy)} m`;
    }


    if (locationText) {

        locationText.textContent =
            "Location detected";
    }


    if (coordinatesText) {

        coordinatesText.textContent =
            `${userLatitude.toFixed(5)}, ${userLongitude.toFixed(5)}`;
    }


    // Calculate Qibla
    qiblaBearing =
        calculateQiblaBearing(
            userLatitude,
            userLongitude
        );


    const roundedQibla =
        Math.round(qiblaBearing);


    if (qiblaDegree) {

        qiblaDegree.textContent =
            `${roundedQibla}°`;
    }


    if (qiblaDirection) {

        qiblaDirection.textContent =
            getDirection(qiblaBearing);
    }


    if (qiblaInstruction) {

        qiblaInstruction.textContent =
            `Qibla bearing: ${roundedQibla}°. Turn your phone toward the Qibla indicator.`;
    }


    if (currentHeading !== null) {

        updateQiblaIndicator(
            currentHeading
        );
    }
}


// =========================================================
// GPS ERROR
// =========================================================

function handleGPSError(error) {

    console.error(
        "GPS error:",
        error
    );

    if (gpsStateTop) {
        gpsStateTop.textContent =
            "Unavailable";
    }

    if (gpsSignal) {
        gpsSignal.textContent =
            "No signal";
    }

    if (accuracyState) {
        accuracyState.textContent =
            "--";
    }

    if (locationText) {
        locationText.textContent =
            "Location permission required";
    }

    if (coordinatesText) {
        coordinatesText.textContent =
            "--";
    }
}


// =========================================================
// GPS NOT SUPPORTED
// =========================================================

function setGPSUnavailable() {

    if (gpsStateTop) {
        gpsStateTop.textContent =
            "Unavailable";
    }

    if (gpsSignal) {
        gpsSignal.textContent =
            "Unavailable";
    }

    if (locationText) {
        locationText.textContent =
            "Geolocation is not supported";
    }
}


// =========================================================
// QIBLA BEARING CALCULATION
// =========================================================

function calculateQiblaBearing(
    latitude,
    longitude
) {

    const lat1 =
        degreesToRadians(latitude);

    const lon1 =
        degreesToRadians(longitude);

    const lat2 =
        degreesToRadians(KAABA_LAT);

    const lon2 =
        degreesToRadians(KAABA_LON);


    const deltaLon =
        lon2 - lon1;


    const y =
        Math.sin(deltaLon);


    const x =
        Math.cos(lat1) *
        Math.tan(lat2)
        -
        Math.sin(lat1) *
        Math.cos(deltaLon);


    const bearing =
        Math.atan2(y, x);


    return normalizeAngle(
        radiansToDegrees(bearing)
    );
}


// =========================================================
// CONVERSION
// =========================================================

function degreesToRadians(degrees) {

    return degrees *
        Math.PI /
        180;
}


function radiansToDegrees(radians) {

    return radians *
        180 /
        Math.PI;
}


// =========================================================
// DETECT BUTTON
// =========================================================

if (detectBtn) {

    detectBtn.addEventListener(
        "click",
        async () => {

            startGPS();

            await startCompass();
        }
    );
}


// =========================================================
// CALIBRATE BUTTON
// =========================================================

if (calibrateBtn) {

    calibrateBtn.addEventListener(
        "click",
        () => {

            currentHeading = null;

            if (sensorMessage) {

                sensorMessage.textContent =
                    "Calibration reset. Slowly rotate your phone in a figure-eight motion.";
            }

            if (compassState) {

                compassState.textContent =
                    "Calibrating compass...";
            }
        }
    );
}


// =========================================================
// PAGE VISIBILITY
// =========================================================

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.visibilityState ===
            "visible"
        ) {

            if (
                navigator.geolocation
            ) {

                startGPS();
            }
        }
    }
);


// =========================================================
// INITIALIZE
// =========================================================

function initializeCompass() {

    createDegreeTicks();

    createDegreeNumbers();

    // Start GPS automatically
    startGPS();


    // On iPhone, permission must come
    // from a user click.
    if (
        typeof DeviceOrientationEvent !==
            "undefined" &&
        typeof DeviceOrientationEvent.requestPermission !==
            "function"
    ) {

        startCompass();
    }
}


initializeCompass();
