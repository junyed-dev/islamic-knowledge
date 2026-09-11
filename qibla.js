"use strict";

/* =========================================================
   ISLAMIC SOLDIER — REAL QIBLA COMPASS
========================================================= */


/* =========================================================
   KAABA COORDINATES
========================================================= */

const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;


/* =========================================================
   ELEMENTS
========================================================= */

const compass = document.getElementById("compass");
const compassDial = document.getElementById("compassDial");
const compassNeedle = document.getElementById("compassNeedle");

const degreeTicks = document.getElementById("degreeTicks");
const degreeNumbers = document.getElementById("degreeNumbers");

const qiblaIndicator = document.getElementById("qiblaIndicator");

const headingDegree = document.getElementById("headingDegree");
const headingDirection = document.getElementById("headingDirection");

const qiblaDegree = document.getElementById("qiblaDegree");
const qiblaDirection = document.getElementById("qiblaDirection");

const largeHeading = document.getElementById("largeHeading");
const largeDirection = document.getElementById("largeDirection");

const locationText = document.getElementById("locationText");
const coordinatesText = document.getElementById("coordinatesText");

const accuracyState = document.getElementById("accuracyState");
const gpsSignal = document.getElementById("gpsSignal");

const compassState = document.getElementById("compassState");
const gpsStateTop = document.getElementById("gpsStateTop");

const statusIndicator = document.getElementById("statusIndicator");

const qiblaInstruction = document.getElementById("qiblaInstruction");

const detectBtn = document.getElementById("detectBtn");
const calibrateBtn = document.getElementById("calibrateBtn");

const sensorMessage = document.getElementById("sensorMessage");


/* =========================================================
   STATE
========================================================= */

let currentHeading = null;
let qiblaBearing = null;

let latitude = null;
let longitude = null;

let gpsAccuracy = null;

let compassStarted = false;
let gpsStarted = false;

let calibrationOffset = 0;

let lastHeadingTime = 0;


/* =========================================================
   ANGLE HELPERS
========================================================= */

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


function smoothAngle(current, target, amount = 0.18) {

    const difference = shortestAngleDifference(
        current,
        target
    );

    return normalizeAngle(
        current + difference * amount
    );
}


/* =========================================================
   DIRECTION
========================================================= */

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
        Math.round(angle / 45) % 8;

    return directions[index];
}


function getFullDirection(angle) {

    const directions = [
        "North",
        "North-East",
        "East",
        "South-East",
        "South",
        "South-West",
        "West",
        "North-West"
    ];

    const index =
        Math.round(angle / 45) % 8;

    return directions[index];
}


/* =========================================================
   CREATE 360° TICKS
========================================================= */

function createDegreeTicks() {

    if (!degreeTicks) {
        return;
    }

    degreeTicks.innerHTML = "";

    for (let degree = 0; degree < 360; degree += 2) {

        const tick = document.createElement("span");

        tick.className = "degree-tick";

        if (degree % 30 === 0) {

            tick.classList.add("major");

        } else if (degree % 10 === 0) {

            tick.classList.add("medium");
        }

        tick.style.transform =
            `rotate(${degree}deg)`;

        degreeTicks.appendChild(tick);
    }
}


/* =========================================================
   CREATE DEGREE NUMBERS
========================================================= */

function createDegreeNumbers() {

    if (!degreeNumbers) {
        return;
    }

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


/* =========================================================
   SCREEN ORIENTATION
========================================================= */

function getScreenAngle() {

    if (
        screen.orientation &&
        typeof screen.orientation.angle === "number"
    ) {

        return screen.orientation.angle;
    }

    if (typeof window.orientation === "number") {

        return window.orientation;
    }

    return 0;
}


/* =========================================================
   GET COMPASS HEADING
========================================================= */

function getHeadingFromEvent(event) {

    /*
       iPhone / iPad
    */

    if (
        typeof event.webkitCompassHeading === "number" &&
        Number.isFinite(event.webkitCompassHeading)
    ) {

        return normalizeAngle(
            event.webkitCompassHeading
        );
    }


    /*
       Android / standard orientation
    */

    if (
        typeof event.alpha === "number" &&
        Number.isFinite(event.alpha)
    ) {

        let heading = 360 - event.alpha;

        heading += getScreenAngle();

        return normalizeAngle(heading);
    }


    return null;
}


/* =========================================================
   UPDATE COMPASS
========================================================= */

function updateCompass(heading) {

    if (
        typeof heading !== "number" ||
        !Number.isFinite(heading)
    ) {
        return;
    }

    heading = normalizeAngle(
        heading + calibrationOffset
    );


    /*
       First reading
    */

    if (currentHeading === null) {

        currentHeading = heading;

    } else {

        currentHeading =
            smoothAngle(
                currentHeading,
                heading,
                0.22
            );
    }


    updateHeadingDisplay();

    updateCompassDial();

    updateQiblaIndicator();

    updateQiblaMessage();
}


/* =========================================================
   UPDATE HEADING DISPLAY
========================================================= */

function updateHeadingDisplay() {

    if (currentHeading === null) {
        return;
    }

    const roundedHeading =
        Math.round(currentHeading);

    const direction =
        getDirection(currentHeading);


    if (headingDegree) {

        headingDegree.textContent =
            `${roundedHeading}°`;
    }


    if (headingDirection) {

        headingDirection.textContent =
            direction;
    }


    if (largeHeading) {

        largeHeading.textContent =
            `${roundedHeading}°`;
    }


    if (largeDirection) {

        largeDirection.textContent =
            getFullDirection(currentHeading);
    }


    if (compassState) {

        compassState.textContent =
            `Compass Active • ${roundedHeading}°`;
    }


    if (statusIndicator) {

        statusIndicator.style.background =
            "var(--teal)";
    }


    if (compass) {

        compass.classList.add(
            "sensor-active"
        );
    }
}


/* =========================================================
   ROTATE COMPASS DIAL
========================================================= */

function updateCompassDial() {

    if (
        !compassDial ||
        currentHeading === null
    ) {
        return;
    }


    /*
       The compass dial moves opposite
       to the phone heading.
    */

    compassDial.style.transform =
        `rotate(${-currentHeading}deg)`;
}


/* =========================================================
   QIBLA INDICATOR
========================================================= */

function updateQiblaIndicator() {

    if (
        !qiblaIndicator ||
        qiblaBearing === null ||
        currentHeading === null
    ) {
        return;
    }


    /*
       Difference between current heading
       and Qibla bearing.
    */

    const relativeAngle =
        shortestAngleDifference(
            currentHeading,
            qiblaBearing
        );


    /*
       Qibla indicator points toward
       the Kaaba relative to the phone.
    */

    qiblaIndicator.style.transform =
        `
        translate(-50%, -50%)
        rotate(${relativeAngle}deg)
        `;
}


/* =========================================================
   QIBLA MESSAGE
========================================================= */

function updateQiblaMessage() {

    if (
        qiblaBearing === null ||
        currentHeading === null ||
        !qiblaInstruction
    ) {
        return;
    }


    const difference =
        shortestAngleDifference(
            currentHeading,
            qiblaBearing
        );


    const absoluteDifference =
        Math.abs(difference);


    /*
       Almost perfectly facing Qibla
    */

    if (absoluteDifference <= 5) {

        qiblaInstruction.textContent =
            "You are facing the Holy Kaaba 🕋";

        qiblaInstruction.style.color =
            "var(--teal)";

        return;
    }


    /*
       Need to turn right
    */

    if (difference > 0) {

        qiblaInstruction.textContent =
            `Turn right ${Math.round(absoluteDifference)}° to face Qibla`;

    }


    /*
       Need to turn left
    */

    else {

        qiblaInstruction.textContent =
            `Turn left ${Math.round(absoluteDifference)}° to face Qibla`;
    }


    qiblaInstruction.style.color =
        "var(--gold-bright)";
}


/* =========================================================
   COMPASS SENSOR EVENT
========================================================= */

function handleOrientation(event) {

    const now = Date.now();


    /*
       Prevent excessive updates
    */

    if (now - lastHeadingTime < 25) {
        return;
    }

    lastHeadingTime = now;


    const heading =
        getHeadingFromEvent(event);


    if (heading === null) {
        return;
    }


    compassStarted = true;

    updateCompass(heading);
}


/* =========================================================
   START COMPASS
========================================================= */

async function startCompass() {

    if (
        !("DeviceOrientationEvent" in window)
    ) {

        showCompassUnavailable();

        return;
    }


    /*
       iOS permission
    */

    if (
        typeof DeviceOrientationEvent.requestPermission ===
        "function"
    ) {

        try {

            const permission =
                await DeviceOrientationEvent.requestPermission();


            if (permission !== "granted") {

                showCompassPermissionDenied();

                return;
            }

        } catch (error) {

            console.error(
                "Compass permission error:",
                error
            );

            showCompassPermissionDenied();

            return;
        }
    }


    /*
       Prefer absolute orientation
       when available.
    */

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


    compassStarted = true;


    if (compassState) {

        compassState.textContent =
            "Compass starting...";
    }


    if (sensorMessage) {

        const paragraph =
            sensorMessage.querySelector("p");

        if (paragraph) {

            paragraph.textContent =
                "Move your phone slowly. The compass will automatically read your direction.";
        }
    }
}


/* =========================================================
   COMPASS ERROR STATES
========================================================= */

function showCompassUnavailable() {

    if (compassState) {

        compassState.textContent =
            "Compass unavailable";
    }

    if (statusIndicator) {

        statusIndicator.style.background =
            "var(--red)";
    }
}


function showCompassPermissionDenied() {

    if (compassState) {

        compassState.textContent =
            "Compass permission denied";
    }

    if (statusIndicator) {

        statusIndicator.style.background =
            "var(--red)";
    }

    if (sensorMessage) {

        const paragraph =
            sensorMessage.querySelector("p");

        if (paragraph) {

            paragraph.textContent =
                "Please allow motion and orientation access in your browser settings.";
        }
    }
}


/* =========================================================
   QIBLA BEARING CALCULATION
========================================================= */

function calculateQiblaBearing(
    latitudeValue,
    longitudeValue
) {

    const lat1 =
        degreesToRadians(latitudeValue);

    const lon1 =
        degreesToRadians(longitudeValue);

    const lat2 =
        degreesToRadians(KAABA_LAT);

    const lon2 =
        degreesToRadians(KAABA_LON);


    const deltaLon =
        lon2 - lon1;


    const y =
        Math.sin(deltaLon);


    const x =
        (
            Math.cos(lat1) *
            Math.tan(lat2)
        ) -
        (
            Math.sin(lat1) *
            Math.cos(deltaLon)
        );


    const bearing =
        Math.atan2(y, x);


    return normalizeAngle(
        radiansToDegrees(bearing)
    );
}


/* =========================================================
   LOCATION
========================================================= */

function startGPS() {

    if (!navigator.geolocation) {

        showGPSUnavailable();

        return;
    }


    gpsStarted = true;


    if (gpsStateTop) {

        gpsStateTop.textContent =
            "GPS locating...";
    }


    if (gpsSignal) {

        gpsSignal.textContent =
            "Searching";
    }


    if (locationText) {

        locationText.textContent =
            "Detecting your location...";
    }


    navigator.geolocation.getCurrentPosition(
        handleGPSPosition,
        handleGPSError,
        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}


/* =========================================================
   GPS SUCCESS
========================================================= */

function handleGPSPosition(position) {

    latitude =
        position.coords.latitude;

    longitude =
        position.coords.longitude;

    gpsAccuracy =
        position.coords.accuracy;


    gpsStarted = true;


    /*
       Qibla calculation
    */

    qiblaBearing =
        calculateQiblaBearing(
            latitude,
            longitude
        );


    /*
       Heading display
    */

    if (qiblaDegree) {

        qiblaDegree.textContent =
            `${Math.round(qiblaBearing)}°`;
    }


    if (qiblaDirection) {

        qiblaDirection.textContent =
            getDirection(qiblaBearing);
    }


    /*
       Location
    */

    if (locationText) {

        locationText.textContent =
            "Location detected";
    }


    if (coordinatesText) {

        const latDirection =
            latitude >= 0 ? "N" : "S";

        const lonDirection =
            longitude >= 0 ? "E" : "W";

        coordinatesText.textContent =
            `${Math.abs(latitude).toFixed(5)}° ${latDirection}, ` +
            `${Math.abs(longitude).toFixed(5)}° ${lonDirection}`;
    }


    /*
       Accuracy
    */

    if (accuracyState) {

        accuracyState.textContent =
            `± ${Math.round(gpsAccuracy)} m`;
    }


    /*
       GPS status
    */

    if (gpsStateTop) {

        gpsStateTop.textContent =
            "GPS Active";
    }


    if (gpsSignal) {

        if (gpsAccuracy <= 10) {

            gpsSignal.textContent =
                "Excellent";

        } else if (gpsAccuracy <= 30) {

            gpsSignal.textContent =
                "Good";

        } else {

            gpsSignal.textContent =
                "Fair";
        }
    }


    /*
       Update Qibla immediately
    */

    updateQiblaIndicator();

    updateQiblaMessage();
}


/* =========================================================
   GPS ERROR
========================================================= */

function handleGPSError(error) {

    console.error(
        "GPS error:",
        error
    );


    if (gpsStateTop) {

        gpsStateTop.textContent =
            "GPS unavailable";
    }


    if (gpsSignal) {

        gpsSignal.textContent =
            "Unavailable";
    }


    if (locationText) {

        if (error.code === 1) {

            locationText.textContent =
                "Location permission denied";

        } else {

            locationText.textContent =
                "Unable to detect location";
        }
    }
}


function showGPSUnavailable() {

    if (gpsStateTop) {

        gpsStateTop.textContent =
            "GPS unavailable";
    }


    if (gpsSignal) {

        gpsSignal.textContent =
            "Unavailable";
    }


    if (locationText) {

        locationText.textContent =
            "Geolocation not supported";
    }
}


/* =========================================================
   CALIBRATION
========================================================= */

function calibrateCompass() {

    if (currentHeading === null) {

        if (qiblaInstruction) {

            qiblaInstruction.textContent =
                "Start the compass first, then calibrate.";
        }

        return;
    }


    /*
       Reset software calibration.

       Physical calibration is handled by
       the device sensor itself.
    */

    calibrationOffset = 0;


    if (sensorMessage) {

        const paragraph =
            sensorMessage.querySelector("p");

        if (paragraph) {

            paragraph.textContent =
                "Calibration reset. Slowly move your phone in a figure-8 motion if the direction seems inaccurate.";
        }
    }
}


/* =========================================================
   BUTTONS
========================================================= */

if (detectBtn) {

    detectBtn.addEventListener(
        "click",
        async () => {

            startGPS();

            await startCompass();
        }
    );
}


if (calibrateBtn) {

    calibrateBtn.addEventListener(
        "click",
        () => {

            calibrateCompass();
        }
    );
}


/* =========================================================
   VISIBILITY
========================================================= */

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


/* =========================================================
   UTILITIES
========================================================= */

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


/* =========================================================
   INITIALIZE
========================================================= */

function initializeCompass() {

    createDegreeTicks();

    createDegreeNumbers();


    /*
       GPS can start automatically.
    */

    startGPS();


    /*
       Only start compass automatically
       when iOS permission is not required.
    */

    if (
        "DeviceOrientationEvent" in window &&
        typeof DeviceOrientationEvent.requestPermission !==
        "function"
    ) {

        startCompass();
    }
}


/* =========================================================
   START APP
========================================================= */

initializeCompass();
