/* =====================================================
   QIBLA FINDER 3.0
   ISLAMIC SOLDIER
===================================================== */


/* =====================================================
   HTML ELEMENTS
===================================================== */

const needle =
    document.querySelector(".needle");

const detectBtn =
    document.getElementById("detectBtn");

const btnText =
    document.getElementById("btnText");

const locationText =
    document.getElementById("locationText");

const qiblaDegree =
    document.getElementById("qiblaDegree");

const statusText =
    document.getElementById("statusText");

const compassState =
    document.getElementById("compassState");

const gpsState =
    document.getElementById("gpsState");

const bearingState =
    document.getElementById("bearingState");


/* =====================================================
   KAABA COORDINATES
===================================================== */

const KAABA_LAT =
    21.4225;

const KAABA_LON =
    39.8262;


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let heading = 0;

let smoothHeading = 0;

let qiblaAngle = 0;

let compassStarted = false;

let locationDetected = false;


/* =====================================================
   DEGREE → RADIAN
===================================================== */

function toRad(degree) {

    return degree *
        Math.PI /
        180;

}


/* =====================================================
   RADIAN → DEGREE
===================================================== */

function toDeg(radian) {

    return radian *
        180 /
        Math.PI;

}


/* =====================================================
   CALCULATE QIBLA
===================================================== */

function calculateQibla(
    latitude,
    longitude
) {

    const lat1 =
        toRad(latitude);

    const lon1 =
        toRad(longitude);

    const lat2 =
        toRad(KAABA_LAT);

    const lon2 =
        toRad(KAABA_LON);


    const dLon =
        lon2 - lon1;


    const y =
        Math.sin(dLon);


    const x =

        Math.cos(lat1) *
        Math.tan(lat2)

        -

        Math.sin(lat1) *
        Math.cos(dLon);


    let angle =
        Math.atan2(y, x);


    angle =
        toDeg(angle);


    angle =
        (angle + 360) % 360;


    return angle;

}


/* =====================================================
   UPDATE NEEDLE
===================================================== */

function updateCompass() {

    if (!needle) return;


    const rotation =
        qiblaAngle -
        smoothHeading;


    needle.style.transform =

        `translateX(-50%) rotate(${rotation}deg)`;

}


/* =====================================================
   UPDATE DEGREE
===================================================== */

function updateDegree() {

    const degree =
        qiblaAngle.toFixed(1);


    qiblaDegree.textContent =
        `${degree}°`;


    bearingState.textContent =
        `${degree}°`;

}


/* =====================================================
   SHOW LOCATION
===================================================== */

function showLocation(
    latitude,
    longitude
) {

    locationText.innerHTML =

        `
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
   GPS DETECTION
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


            qiblaAngle =
                calculateQibla(
                    latitude,
                    longitude
                );


            locationDetected =
                true;


            showLocation(
                latitude,
                longitude
            );


            updateDegree();


            updateCompass();


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

            enableHighAccuracy:
                true,

            timeout:
                15000,

            maximumAge:
                0

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
   HANDLE DEVICE ORIENTATION
===================================================== */

function handleOrientation(event) {


    if (event.alpha === null) {

        return;

    }


    heading =
        event.alpha;


    if (
        typeof event.webkitCompassHeading !==
        "undefined"
    ) {

        heading =
            event.webkitCompassHeading;

    }


    smoothCompass();

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

                await
                DeviceOrientationEvent
                    .requestPermission();


            if (
                permission ===
                "granted"
            ) {

                startCompass();

            } else {

                compassState.textContent =
                    "Permission denied";

                statusText.textContent =
                    "Compass permission denied";

            }


        } catch (error) {

            console.error(
                "Compass permission error:",
                error
            );

        }


    } else {


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


    if (
        difference > 180
    ) {

        difference -= 360;

    }


    if (
        difference < -180
    ) {

        difference += 360;

    }


    smoothHeading +=
        difference *
        0.12;


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


        if (
            difference > 180
        ) {

            difference -= 360;

        }


        if (
            difference < -180
        ) {

            difference += 360;

        }


        smoothHeading +=
            difference *
            0.12;


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


        if (
            !document.hidden
        ) {

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


        bearingState.textContent =
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