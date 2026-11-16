/* =========================================================
   YATRA MATE
   YOUR TRAVEL COMPANION
========================================================= */


/* =========================================================
   NAVIGATION
========================================================= */

function toggleMenu() {

    const nav =
        document.getElementById("navMenu");

    nav.classList.toggle("active");

}


/* =========================================================
   QUICK SEARCH
========================================================= */

function runQuickSearch() {

    const from =
        document.getElementById("quickFrom").value.trim();

    const to =
        document.getElementById("quickTo").value.trim();

    const date =
        document.getElementById("quickDate").value;


    if (!from || !to) {

        alert(
            "Please enter both departure and destination."
        );

        return;

    }


    document.getElementById("transportFrom").value = from;

    document.getElementById("transportTo").value = to;

    if (date) {

        document.getElementById("transportDate").value = date;

    }


    document
        .getElementById("transport")
        .scrollIntoView({
            behavior: "smooth"
        });


    setTimeout(() => {

        searchTransport();

    }, 500);

}


/* =========================================================
   TRANSPORT TYPE
========================================================= */

let selectedTransport = "train";


function selectTransport(type, button) {

    selectedTransport = type;


    document
        .querySelectorAll(".transport-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    button.classList.add("active");


    searchTransport();

}


/* =========================================================
   TRANSPORT DATABASE
========================================================= */

const transportData = {

    train: [

        {
            name: "InterCity Express",
            code: "TM-101",
            route: "Gwalior → Jaipur",
            duration: "6h 20m",
            departure: "07:10 AM",
            arrival: "01:30 PM",
            price: 850,
            rating: "4.5"
        },

        {
            name: "Rajdhani Connection",
            code: "TM-205",
            route: "Gwalior → Jaipur",
            duration: "5h 50m",
            departure: "09:30 AM",
            arrival: "03:20 PM",
            price: 1100,
            rating: "4.7"
        },

        {
            name: "Budget Express",
            code: "TM-311",
            route: "Gwalior → Jaipur",
            duration: "7h 10m",
            departure: "06:00 AM",
            arrival: "01:10 PM",
            price: 620,
            rating: "4.2"
        }

    ],


    bus: [

        {
            name: "Yatra Sleeper",
            code: "YB-101",
            route: "Gwalior → Jaipur",
            duration: "7h 10m",
            departure: "09:00 PM",
            arrival: "04:10 AM",
            price: 650,
            rating: "4.4"
        },

        {
            name: "RoadTrip AC",
            code: "YB-211",
            route: "Gwalior → Jaipur",
            duration: "6h 45m",
            departure: "10:30 PM",
            arrival: "05:15 AM",
            price: 780,
            rating: "4.6"
        },

        {
            name: "Budget Bus",
            code: "YB-315",
            route: "Gwalior → Jaipur",
            duration: "8h 00m",
            departure: "08:00 PM",
            arrival: "04:00 AM",
            price: 480,
            rating: "4.1"
        }

    ],


    flight: [

        {
            name: "Yatra Air",
            code: "YA-501",
            route: "Gwalior → Jaipur",
            duration: "1h 25m",
            departure: "11:20 AM",
            arrival: "12:45 PM",
            price: 3200,
            rating: "4.6"
        },

        {
            name: "Sky India",
            code: "SI-401",
            route: "Gwalior → Jaipur",
            duration: "1h 30m",
            departure: "02:10 PM",
            arrival: "03:40 PM",
            price: 3650,
            rating: "4.7"
        },

        {
            name: "Budget Wings",
            code: "BW-201",
            route: "Gwalior → Jaipur",
            duration: "1h 45m",
            departure: "05:30 PM",
            arrival: "07:15 PM",
            price: 2850,
            rating: "4.3"
        }

    ]

};


/* =========================================================
   SEARCH TRANSPORT
========================================================= */

function searchTransport() {

    const from =
        document.getElementById("transportFrom").value || "Your City";

    const to =
        document.getElementById("transportTo").value || "Destination";

    const passengers =
        parseInt(
            document.getElementById("transportPassengers").value
        ) || 1;


    let results =
        transportData[selectedTransport];


    const container =
        document.getElementById("transportResults");


    if (!results || results.length === 0) {

        container.innerHTML = `
            <div class="empty-itinerary">
                No transport options found.
            </div>
        `;

        return;

    }


    container.innerHTML = results.map((item, index) => {

        const totalPrice =
            item.price * passengers;


        return `

            <div class="transport-card">

                <div>

                    <div class="transport-name">
                        ${item.name}
                    </div>

                    <div class="transport-sub">
                        ${item.code} • ⭐ ${item.rating}
                    </div>

                </div>


                <div class="transport-meta">

                    <strong>
                        ${item.departure}
                    </strong>

                    <span class="transport-sub">
                        ${from}
                    </span>

                </div>


                <div class="transport-meta">

                    <strong>
                        ${item.duration}
                    </strong>

                    <span class="transport-sub">
                        Direct journey
                    </span>

                </div>


                <div class="transport-meta">

                    <strong>
                        ${item.arrival}
                    </strong>

                    <span class="transport-sub">
                        ${to}
                    </span>

                </div>


                <div>

                    <div class="transport-price">
                        ₹${totalPrice.toLocaleString()}
                    </div>

                    <button
                        class="btn primary-btn"
                        onclick="bookTransport('${item.name}', ${totalPrice})">

                        Book

                    </button>

                </div>

            </div>

        `;

    }).join("");

}


/* =========================================================
   BOOK TRANSPORT
========================================================= */

function bookTransport(name, price) {

    openModal(`

        <h2>
            🎫 ${name}
        </h2>

        <p style="margin:12px 0;color:#6b7280">

            You're selecting this transport option.

        </p>

        <div style="
            padding:16px;
            background:#fff5ef;
            border-radius:10px;
            margin:15px 0;
        ">

            <strong>
                Estimated Fare
            </strong>

            <div style="
                font-size:1.5rem;
                font-weight:800;
                margin-top:4px;
            ">

                ₹${price.toLocaleString()}

            </div>

        </div>


        <button
            class="btn primary-btn"
            style="width:100%"
            onclick="demoBooking('${name}')">

            Continue to Booking

        </button>

        <p style="
            margin-top:12px;
            font-size:.75rem;
            color:#6b7280;
        ">

            Prototype mode: real ticket booking will
            require integration with authorized travel APIs.

        </p>

    `);

}


/* =========================================================
   STAY DATA
========================================================= */

const stayData = [

    {
        name: "Pink City Budget Hostel",
        type: "hostel",
        location: "Jaipur",
        price: 650,
        rating: 4.3,
        image:
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80"
    },

    {
        name: "Royal Heritage Hotel",
        type: "hotel",
        location: "Jaipur",
        price: 1800,
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
    },

    {
        name: "Amber View Homestay",
        type: "homestay",
        location: "Jaipur",
        price: 2400,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80"
    },

    {
        name: "Pink Palace Villa",
        type: "villa",
        location: "Jaipur",
        price: 4800,
        rating: 4.8,
        image:
            "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80"
    }

];


/* =========================================================
   SEARCH STAYS
========================================================= */

function searchStays() {

    const destination =
        document
            .getElementById("stayDestination")
            .value
            .toLowerCase()
            .trim();


    const budget =
        document
            .getElementById("stayBudget")
            .value;


    const type =
        document
            .getElementById("stayType")
            .value;


    let results =
        stayData.filter(stay => {

            const destinationMatch =
                !destination ||
                stay.location
                    .toLowerCase()
                    .includes(destination);


            const budgetMatch =
                budget === "all" ||
                stay.price <= parseInt(budget);


            const typeMatch =
                type === "all" ||
                stay.type === type;


            return (
                destinationMatch &&
                budgetMatch &&
                typeMatch
            );

        });


    const container =
        document.getElementById("stayResults");


    if (results.length === 0) {

        container.innerHTML = `

            <div class="empty-itinerary"
                style="grid-column:1/-1">

                <div class="empty-icon">
                    🏨
                </div>

                <h3>
                    No stays found
                </h3>

                <p>
                    Try changing your budget or stay preference.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        results.map(stay => {

            return `

                <div class="stay-card">

                    <div
                        class="stay-image"
                        style="
                        background-image:url('${stay.image}')
                        ">

                        <span class="stay-type-tag">
                            ${stay.type.toUpperCase()}
                        </span>

                    </div>


                    <div class="stay-content">

                        <h3>
                            ${stay.name}
                        </h3>

                        <div class="stay-location">
                            📍 ${stay.location}
                        </div>

                        <div class="stay-rating">
                            ⭐ ${stay.rating}
                        </div>


                        <div class="stay-bottom">

                            <div class="stay-price">
                                ₹${stay.price.toLocaleString()}
                                <span>/ night</span>
                            </div>


                            <button
                                class="btn primary-btn"
                                onclick="
                                bookStay(
                                    '${stay.name}',
                                    ${stay.price}
                                )">

                                View

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join("");

}


/* =========================================================
   BOOK STAY
========================================================= */

function bookStay(name, price) {

    openModal(`

        <h2>
            🏨 ${name}
        </h2>

        <p style="
            margin:12px 0;
            color:#6b7280;
        ">

            Great choice for your Yatra.

        </p>


        <div style="
            padding:16px;
            background:#fff5ef;
            border-radius:10px;
            margin:15px 0;
        ">

            <strong>
                Starting from
            </strong>

            <div style="
                font-size:1.5rem;
                font-weight:800;
                margin-top:4px;
            ">

                ₹${price.toLocaleString()} / night

            </div>

        </div>


        <button
            class="btn primary-btn"
            style="width:100%"
            onclick="demoBooking('${name}')">

            Continue to Booking

        </button>


        <p style="
            margin-top:12px;
            font-size:.75rem;
            color:#6b7280;
        ">

            Prototype mode: live availability,
            payments and confirmation can be connected
            through authorized booking services.

        </p>

    `);

}


/* =========================================================
   DEMO BOOKING
========================================================= */

function demoBooking(itemName) {

    closeModal();


    setTimeout(() => {

        alert(

            "✅ Yatra Mate Booking Demo\n\n" +

            itemName +

            "\n\n" +

            "This is a prototype booking flow.\n\n" +

            "The final version can continue to " +
            "payment and confirmation through integrated " +
            "travel-booking APIs."

        );

    }, 150);

}


/* =========================================================
   DESTINATION SEARCH
========================================================= */

function searchDestinations() {

    const input =
        document
            .getElementById("destinationSearch")
            .value
            .toLowerCase();


    const cards =
        document.querySelectorAll(
            ".destination-card"
        );


    cards.forEach(card => {

        const name =
            card
                .getAttribute("data-name")
                .toLowerCase();


        card.style.display =
            name.includes(input)
                ? "block"
                : "none";

    });

}


/* =========================================================
   DESTINATION INFORMATION
========================================================= */

const destinationInfo = {

    Jaipur: {

        emoji: "🏰",

        description:
            "Jaipur, the Pink City, is known for royal architecture, forts, markets and Rajasthani culture.",

        places:
            "Amber Fort • Hawa Mahal • City Palace • Jal Mahal • Nahargarh Fort",

        tip:
            "Explore the heritage area early in the day and leave time for local markets."

    },


    Agra: {

        emoji: "🕌",

        description:
            "Agra is a major heritage destination and home to the Taj Mahal.",

        places:
            "Taj Mahal • Agra Fort • Mehtab Bagh • Fatehpur Sikri",

        tip:
            "Plan major monuments early to make better use of the day."

    },


    Kerala: {

        emoji: "🌴",

        description:
            "Kerala combines backwaters, beaches, hills, food and cultural experiences.",

        places:
            "Alleppey • Munnar • Kochi • Varkala",

        tip:
            "Balance your trip between the hills, coast and backwaters."

    },


    Goa: {

        emoji: "🏖️",

        description:
            "Goa offers beaches, heritage, food and relaxed local experiences.",

        places:
            "Baga Beach • Fort Aguada • Panjim • Anjuna",

        tip:
            "Explore both popular areas and quieter local spots."

    },


    Manali: {

        emoji: "🏔️",

        description:
            "Manali is a popular mountain destination for adventure and scenic experiences.",

        places:
            "Solang Valley • Hadimba Temple • Old Manali • Mall Road",

        tip:
            "Keep flexible travel time for mountain conditions."

    },


    Varanasi: {

        emoji: "🪔",

        description:
            "Varanasi is known for its ghats, spirituality and cultural heritage.",

        places:
            "Dashashwamedh Ghat • Assi Ghat • Sarnath • Kashi Vishwanath",

        tip:
            "Reserve time for both the ghats and old-city exploration."

    }

};


function showDestination(destination) {

    const info =
        destinationInfo[destination];


    openModal(`

        <div style="font-size:3rem">
            ${info.emoji}
        </div>

        <h2>
            ${destination}
        </h2>

        <p style="
            margin:12px 0;
            color:#6b7280;
        ">

            ${info.description}

        </p>


        <h3>
            Popular Places
        </h3>

        <p style="
            margin-top:6px;
            color:#4b5563;
        ">

            ${info.places}

        </p>


        <h3 style="margin-top:18px">
            💡 Yatra Mate Tip
        </h3>

        <p style="
            margin-top:5px;
            color:#6b7280;
        ">

            ${info.tip}

        </p>


        <br>


        <a
            href="#planner"
            onclick="closeModal()"
            class="btn primary-btn">

            ✨ Plan My Yatra

        </a>

    `);

}


/* =========================================================
   AI TRIP PLANNER
========================================================= */

const activities = {

    Jaipur: [
        "Amber Fort",
        "Hawa Mahal",
        "City Palace",
        "Jal Mahal",
        "Nahargarh Fort",
        "Johari Bazaar"
    ],

    Goa: [
        "Baga Beach",
        "Fort Aguada",
        "Calangute Beach",
        "Panjim",
        "Basilica of Bom Jesus",
        "Anjuna"
    ],

    Kerala: [
        "Alleppey Backwaters",
        "Munnar",
        "Fort Kochi",
        "Varkala Beach",
        "Tea Gardens",
        "Mattancherry"
    ],

    Manali: [
        "Solang Valley",
        "Hadimba Temple",
        "Old Manali",
        "Mall Road",
        "Vashisht",
        "Rohtang"
    ],

    Agra: [
        "Taj Mahal",
        "Agra Fort",
        "Mehtab Bagh",
        "Fatehpur Sikri",
        "Itmad-ud-Daulah",
        "Agra Market"
    ],

    Varanasi: [
        "Dashashwamedh Ghat",
        "Kashi Vishwanath",
        "Assi Ghat",
        "Sarnath",
        "Manikarnika Ghat",
        "Ganga Aarti"
    ]

};


/* =========================================================
   GENERATE TRIP
========================================================= */

function generateTrip() {

    const destination =
        document.getElementById("destination").value;


    const days =
        parseInt(
            document.getElementById("days").value
        );


    const travelers =
        parseInt(
            document.getElementById("travelers").value
        );


    const budget =
        parseInt(
            document.getElementById("budget").value
        );


    const stayPreference =
        document.getElementById("stayPreference").value;


    const interest =
        document.getElementById("interest").value;


    if (!destination) {

        alert(
            "Please select a destination."
        );

        return;

    }


    if (
        isNaN(days) ||
        days < 1 ||
        days > 15
    ) {

        alert(
            "Please select between 1 and 15 days."
        );

        return;

    }


    if (
        isNaN(travelers) ||
        travelers < 1
    ) {

        alert(
            "Please enter the number of travelers."
        );

        return;

    }


    if (
        isNaN(budget) ||
        budget < 1000
    ) {

        alert(
            "Please enter a valid budget."
        );

        return;

    }


    /*
        DEMO ESTIMATION
    */

    const transportCost =
        Math.round(
            budget * 0.18
        );


    let stayPercentage;


    if (stayPreference === "budget") {

        stayPercentage = 0.22;

    } else if (
        stayPreference === "standard"
    ) {

        stayPercentage = 0.30;

    } else if (
        stayPreference === "premium"
    ) {

        stayPercentage = 0.42;

    } else {

        stayPercentage = 0.34;

    }


    const stayCost =
        Math.round(
            budget * stayPercentage
        );


    const foodCost =
        Math.round(
            budget * 0.15
        );


    const activityCost =
        Math.round(
            budget * 0.18
        );


    const buffer =
        Math.max(
            0,
            budget -
            (
                transportCost +
                stayCost +
                foodCost +
                activityCost
            )
        );


    const totalEstimated =
        transportCost +
        stayCost +
        foodCost +
        activityCost;


    const places =
        activities[destination];


    let html = `

        <div class="trip-header">

            <h3>
                ✨ Your ${destination} Yatra
            </h3>

            <div class="trip-stats">

                <span>
                    📅 ${days} Days
                </span>

                <span>
                    👥 ${travelers} Travelers
                </span>

                <span>
                    💰 ₹${budget.toLocaleString()} Budget
                </span>

                <span>
                    ❤️ ${interest}
                </span>

            </div>

        </div>


        <div class="trip-summary">

            <div class="summary-box">

                🚆

                <strong>
                    ₹${transportCost.toLocaleString()}
                </strong>

                Transport

            </div>


            <div class="summary-box">

                🏨

                <strong>
                    ₹${stayCost.toLocaleString()}
                </strong>

                Stay

            </div>


            <div class="summary-box">

                🍛

                <strong>
                    ₹${foodCost.toLocaleString()}
                </strong>

                Food

            </div>


            <div class="summary-box">

                🎟️

                <strong>
                    ₹${activityCost.toLocaleString()}
                </strong>

                Activities

            </div>

        </div>

    `;


    for (
        let day = 1;
        day <= days;
        day++
    ) {

        const first =
            places[
                (day * 2 - 2)
                % places.length
            ];


        const second =
            places[
                (day * 2 - 1)
                % places.length
            ];


        const third =
            places[
                (day * 2)
                % places.length
            ];


        html += `

            <div class="day-card">

                <h3>
                    📅 Day ${day}
                </h3>


                <div class="activity">

                    <strong>
                        🌅 Morning — ${first}
                    </strong>

                    <span>
                        Start your day with a planned local experience.
                    </span>

                </div>


                <div class="activity">

                    <strong>
                        ☀️ Afternoon — ${second}
                    </strong>

                    <span>
                        Explore nearby attractions and local culture.
                    </span>

                </div>


                <div class="activity">

                    <strong>
                        🌙 Evening — ${third}
                    </strong>

                    <span>
                        Enjoy local food and relax.
                    </span>

                </div>

            </div>

        `;

    }


    html += `

        <div class="cost-panel">

            <h3>
                💰 Yatra Budget Breakdown
            </h3>


            <div class="cost-line">

                <span>
                    Transport
                </span>

                <strong>
                    ₹${transportCost.toLocaleString()}
                </strong>

            </div>


            <div class="cost-line">

                <span>
                    Stay
                </span>

                <strong>
                    ₹${stayCost.toLocaleString()}
                </strong>

            </div>


            <div class="cost-line">

                <span>
                    Food
                </span>

                <strong>
                    ₹${foodCost.toLocaleString()}
                </strong>

            </div>


            <div class="cost-line">

                <span>
                    Activities
                </span>

                <strong>
                    ₹${activityCost.toLocaleString()}
                </strong>

            </div>


            <div class="cost-total">

                <span>
                    Estimated Trip Cost
                </span>

                <span>
                    ₹${totalEstimated.toLocaleString()}
                </span>

            </div>


            <p style="
                margin-top:12px;
                color:#6b7280;
                font-size:.8rem;
            ">

                💡 Remaining planning buffer:
                ₹${buffer.toLocaleString()}

            </p>

        </div>


        <div style="
            margin-top:18px;
            padding:20px;
            background:#111827;
            color:white;
            border-radius:14px;
        ">

            <strong>
                🤖 Yatra Mate Recommendation
            </strong>

            <p style="
                margin-top:6px;
                color:#d1d5db;
                font-size:.85rem;
            ">

                Based on your budget and preferences,
                Yatra Mate has balanced transport,
                accommodation, food and experiences
                into one travel plan.

            </p>

        </div>

    `;


    document.getElementById(
        "itineraryResult"
    ).innerHTML = html;


    document
        .getElementById("itinerary")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================================
   SAFETY
========================================================= */

function findHealthcare() {

    alert(

        "🏥 Healthcare Finder\n\n" +

        "Prototype feature.\n\n" +

        "The final Yatra Mate platform can use " +
        "location and Maps APIs to display nearby hospitals."

    );

}


function shareLocation() {

    if (
        navigator.geolocation
    ) {

        navigator
            .geolocation
            .getCurrentPosition(

                position => {

                    const lat =
                        position.coords.latitude;

                    const lon =
                        position.coords.longitude;


                    alert(

                        "📍 Current Location\n\n" +

                        "Latitude: " +
                        lat +
                        "\n" +

                        "Longitude: " +
                        lon +
                        "\n\n" +

                        "This prototype demonstrates " +
                        "location access. A production " +
                        "version can share it with trusted contacts."

                    );

                },


                () => {

                    alert(
                        "Location permission was denied or unavailable."
                    );

                }

            );

    } else {

        alert(
            "Geolocation is not supported by this browser."
        );

    }

}


function showAlert() {

    alert(

        "🌦️ Yatra Mate Travel Alerts\n\n" +

        "Prototype alert system.\n\n" +

        "The production version can integrate " +
        "weather and official travel-alert APIs."

    );

}


/* =========================================================
   LOGIN
========================================================= */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value;


    alert(

        "✅ Demo Login Successful\n\n" +

        "Welcome to Yatra Mate!\n\n" +

        email

    );

}


function signup() {

    alert(

        "👤 Create Your Yatra Mate Account\n\n" +

        "Signup is currently a prototype screen.\n\n" +

        "The final version can connect to a secure authentication backend."

    );

}


/* =========================================================
   MODAL
========================================================= */

function openModal(content) {

    const modal =
        document.getElementById("modal");

    const body =
        document.getElementById("modalBody");


    body.innerHTML = content;


    modal.classList.add("active");

}


function closeModal() {

    document
        .getElementById("modal")
        .classList.remove("active");

}


window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("modal");


        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   DEFAULT LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        searchTransport();

        searchStays();

    }
);