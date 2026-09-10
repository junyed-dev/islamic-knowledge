/* =====================================================
   QIBLA FINDER 3.0
   ISLAMIC SOLDIER
   Stable Mobile + Laptop + Desktop Version
===================================================== */


/* =====================================================
   HTML ELEMENTS
===================================================== */

const needle = document.getElementById("qiblaArrow");

const detectBtn = document.getElementById("detectBtn");
const btnText = document.getElementById("btnText");

const locationText = document.getElementById("locationText");
const qiblaDegree = document.getElementById("qiblaDegree");

const statusText = document.getElementById("statusText");
const compassState = document.getElementById("compassState");
const gpsState = document.getElementById("gpsState");


/* =====================================================
   KAABA COORDINATES
===================================================== */

const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let heading = 0;
let smoothHeading = 0;

let qiblaAngle = 0;

let compassStarted = false;
let absoluteOrientationDetected = false;


/* =====================================================
   DEGREE → RADIAN
===================================================== */

function toRad(degree) {
    return degree * Math.PI / 180;
}


/* =====================================================
   RADIAN → DEGREE
===================================================== */

function toDeg(radian) {
    return radian * 180 / Math.PI;
}


/* =====================================================
   CALCULATE QIBLA
===================================================== */

function calculateQibla(latitude, longitude) {

    const lat1 = toRad(latitude);
    const lon1 = toRad(longitude);

    const lat2 = toRad(KAABA_LAT);
    const lon2 = toRad(KAABA_LON);

    const dLon = lon2 - lon1;

    const y = Math.sin(dLon);

    const x =
        Math.cos(lat1) * Math.tan(lat2)
        -
        Math.sin(lat1) * Math.cos(dLon);

    let angle = Math.atan2(y, x);

    angle = toDeg(angle);

    angle = (angle + 360) % 360;

    return angle;
}


/* =====================================================
   UPDATE QIBLA NEEDLE
===================================================== */

function updateCompass() {

    if (!needle) return;

    let rotation =
        qiblaAngle - smoothHeading;

    /*
       Keep rotation between -180° and +180°
       This prevents the needle from suddenly
       spinning the long way around.
    */

    rotation =
        (rotation + 540) % 360 - 180;

    needle.style.transform =
        `translate(-50%, -50%) rotate(${rotation}deg)`;
}


/* =====================================================
   UPDATE QIBLA DEGREE
===================================================== */

function updateDegree() {

    if (!qiblaDegree) return;

    const degree =
        qiblaAngle.toFixed(1);

    qiblaDegree.textContent =
        `${degree}°`;
}


/* =====================================================
   SHOW LOCATION
===================================================== */

function showLocation(latitude, longitude) {

    if (!locationText) return;

    locationText.innerHTML = `
        Latitude:
        ${latitude.toFixed(6)}

        <br>

        Longitude:
        ${longitude.toFixed(6)}

        <br><br>

        🕋 Qibla:
        ${qiblaAngle.toFixed(1)}°
    `;
}


/* =====================================================
   DETECT LOCATION
===================================================== */

function detectLocation() {

    if (!navigator.geolocation) {

        gpsState.textContent =
            "Not supported";

        locationText.textContent =
            "❌ Geolocation is not supported.";

        resetButton();

        return;
    }


    detectBtn.disabled = true;

    btnText.textContent =
        "Detecting...";

    gpsState.textContent =
        "Searching";

    statusText.textContent =
        "Finding your location";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            /*
               Calculate Qibla bearing
            */

            qiblaAngle =
                calculateQibla(
                    latitude,
                    longitude
                );


            /*
               Show location
            */

            showLocation(
                latitude,
                longitude
            );


            /*
               Update degree
            */

            updateDegree();


            /*
               Update compass
            */

            updateCompass();


            /*
               Update status
            */

            gpsState.textContent =
                "Connected";

            compassState.textContent =
                compassStarted
                    ? "Active"
                    : "Waiting";

            statusText.textContent =
                "Qibla direction calculated";

            btnText.textContent =
                "Qibla Detected";

            detectBtn.disabled =
                false;
        },


        function(error) {

            gpsState.textContent =
                "Error";


            switch (error.code) {

                case error.PERMISSION_DENIED:

                    locationText.textContent =
                        "❌ Location permission denied.";

                    statusText.textContent =
                        "Location permission required";

                    break;


                case error.POSITION_UNAVAILABLE:

                    locationText.textContent =
                        "❌ Location unavailable.";

                    statusText.textContent =
                        "Location unavailable";

                    break;


                case error.TIMEOUT:

                    locationText.textContent =
                        "❌ Location request timed out.";

                    statusText.textContent =
                        "GPS request timed out";

                    break;


                default:

                    locationText.textContent =
                        "❌ Unable to detect location.";

                    statusText.textContent =
                        "Detection failed";
            }


            resetButton();
        },


        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}


/* =====================================================
   RESET BUTTON
===================================================== */

function resetButton() {

    detectBtn.disabled =
        false;

    btnText.textContent =
        "Detect Qibla";
}


/* =====================================================
   START COMPASS
===================================================== */

function startCompass() {

    if (compassStarted) {
        return;
    }


    if (
        typeof window.DeviceOrientationEvent ===
        "undefined"
    ) {

        compassState.textContent =
            "Not supported";

        statusText.textContent =
            "Compass not supported";

        return;
    }


    /*
       Absolute orientation
    */

    window.addEventListener(
        "deviceorientationabsolute",
        handleAbsoluteOrientation,
        true
    );


    /*
       Normal orientation fallback
    */

    window.addEventListener(
        "deviceorientation",
        handleOrientation,
        true
    );


    compassStarted =
        true;


    compassState.textContent =
        "Active";

    statusText.textContent =
        "Compass active";
}


/* =====================================================
   ABSOLUTE ORIENTATION
===================================================== */

function handleAbsoluteOrientation(event) {

    if (event.alpha === null) {
        return;
    }


    absoluteOrientationDetected =
        true;


    /*
       iPhone / Safari
    */

    if (
        typeof event.webkitCompassHeading ===
        "number"
    ) {

        heading =
            event.webkitCompassHeading;
    }

    /*
       Android / other browsers
    */

    else {

        heading =
            (360 - event.alpha) % 360;
    }


    normalizeHeading();

    smoothCompass();
}


/* =====================================================
   NORMAL ORIENTATION FALLBACK
===================================================== */

function handleOrientation(event) {

    /*
       If absolute compass is working,
       don't use normal orientation.
    */

    if (absoluteOrientationDetected) {
        return;
    }


    if (event.alpha === null) {
        return;
    }


    /*
       iPhone / Safari
    */

    if (
        typeof event.webkitCompassHeading ===
        "number"
    ) {

        heading =
            event.webkitCompassHeading;
    }

    /*
       Android / other browsers
    */

    else {

        heading =
            (360 - event.alpha) % 360;
    }


    normalizeHeading();

    smoothCompass();
}


/* =====================================================
   NORMALIZE HEADING
===================================================== */

function normalizeHeading() {

    heading =
        (heading + 360) % 360;
}


/* =====================================================
   IOS COMPASS PERMISSION
===================================================== */

async function requestCompassPermission() {

    if (
        typeof DeviceOrientationEvent !==
            "undefined"
        &&
        typeof DeviceOrientationEvent
            .requestPermission ===
            "function"
    ) {

        try {

            const permission =
                await DeviceOrientationEvent
                    .requestPermission();


            if (
                permission ===
                "granted"
            ) {

                startCompass();
            }

            else {

                compassState.textContent =
                    "Permission denied";

                statusText.textContent =
                    "Compass permission denied";
            }

        }

        catch (error) {

            console.error(
                "Compass permission error:",
                error
            );

            compassState.textContent =
                "Permission error";

            statusText.textContent =
                "Unable to start compass";
        }

    }

    else {

        startCompass();
    }
}


/* =====================================================
   SMOOTH COMPASS
===================================================== */

function smoothCompass() {

    let difference =
        heading -
        smoothHeading;


    /*
       Handle 360° → 0°
       crossing smoothly.
    */

    if (difference > 180) {
        difference -= 360;
    }


    if (difference < -180) {
        difference += 360;
    }


    smoothHeading +=
        difference * 0.12;


    /*
       Normalize smooth heading
    */

    smoothHeading =
        (smoothHeading + 360) % 360;


    updateCompass();
}


/* =====================================================
   CONTINUOUS ANIMATION
===================================================== */

function compassAnimation() {

    if (compassStarted) {

        let difference =
            heading -
            smoothHeading;


        if (difference > 180) {
            difference -= 360;
        }


        if (difference < -180) {
            difference += 360;
        }


        smoothHeading +=
            difference * 0.12;


        smoothHeading =
            (smoothHeading + 360) % 360;


        updateCompass();
    }


    requestAnimationFrame(
        compassAnimation
    );
}


/* =====================================================
   DETECT BUTTON
===================================================== */

detectBtn.addEventListener(
    "click",
    async function() {

        statusText.textContent =
            "Starting compass";


        await
            requestCompassPermission();


        detectLocation();
    }
);


/* =====================================================
   VISIBILITY CHANGE
===================================================== */

document.addEventListener(
    "visibilitychange",
    function() {

        if (!document.hidden) {

            updateCompass();
        }
    }
);


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    function() {

        btnText.textContent =
            "Detect Qibla";


        qiblaDegree.textContent =
            "--°";


        compassState.textContent =
            "Waiting";


        gpsState.textContent =
            "Waiting";


        statusText.textContent =
            "Ready to detect Qibla";


        console.log(
            "✅ Qibla Finder 3.0 Ready"
        );
    }
);


/* =====================================================
   START ANIMATION
===================================================== */

requestAnimationFrame(
    compassAnimation
);
