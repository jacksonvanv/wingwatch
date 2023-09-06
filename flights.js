console.log('Script is executing.');

document.addEventListener('DOMContentLoaded', async function () {
    console.log('DOMContentLoaded event fired.');

    const routeContainer = document.getElementById('routeContainer');
    const apiKey = '301fdc50-4f1f-4453-8dc2-99a7919345b0';

    // Retrieve query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const flightIata = urlParams.get('flight_iata');


    function convertToHoursOrMinutes(value) {
        if (value >= 60) {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return `${hours}h ${minutes}min`;
        }
        return `${value} min`;
    }

    async function fetchAndDisplayFlights(flightIata) {
        const apiUrl = `https://airlabs.co/api/v9/schedules?api_key=${apiKey}&flight_iata=${flightIata}`;
    
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            // Log the entire API response for debugging
            console.log("API Response Data:", JSON.stringify(data, null, 2));
    
            routeContainer.innerHTML = '';
    
            if (Array.isArray(data.response) && data.response.length > 0) {
                for (const flight of data.response) {
                    const flightElement = document.createElement('div');
                    flightElement.classList.add('flight-info'); // Add the flight-info class
    
                    // Convert delay and duration to hours or minutes
                    const convertedDelay = convertToHoursOrMinutes(flight.delayed);
                    const convertedDuration = convertToHoursOrMinutes(flight.duration);
    
                    // Get airline name from flight IATA code
                    const airlineName = getAirlineName(flight.flight_iata);
    
                    // Create flight info container
                    const flightInfoContainer = document.createElement('div');
                    flightInfoContainer.classList.add('flight-info-container');
                    flightInfoContainer.innerHTML = `
                        <div class="airline">${flight.flight_iata}</div>
                        <div class="airlinename">${airlineName}</div>
                        <div class="status ${flight.status.toLowerCase()}">${flight.status}</div>
                        <div class="delay">${flight.delayed ? `Delayed: ${convertedDelay}` : ''}</div>
                        <div class="duration">Duration: ${convertedDuration}</div>
                    `;
    
                    // Create departure info container
                    const departureInfo = document.createElement('div');
                    departureInfo.classList.add('departure-info');
                    departureInfo.innerHTML = `
                        <div class="dep-iata">${flight.dep_iata}</div>
                        <div class="deptime">Scheduled Departure Time: ${flight.dep_time}</div>
                        ${flight.status === 'scheduled' && flight.delayed ? `<div class="depest">Estimated Departure Time: ${flight.dep_estimated}</div>` : ''}
                        ${flight.dep_actual ? `<div class="deptacc">Actual Departure Time: ${flight.dep_actual}</div>` : ''}
                        <div class="depgate">Departure Gate: ${flight.dep_gate}</div>
                        <div class="depterm">Departure Terminal: ${flight.dep_terminal}</div>
                    `;
    
                    // Create vertical line separator
                    const separator = document.createElement('div');
                    separator.classList.add('separator');
    
                    // Create arrival info container
                    const arrivalInfo = document.createElement('div');
                    arrivalInfo.classList.add('arrival-info');
                    arrivalInfo.innerHTML = `
                        <div class="arr-iata">${flight.arr_iata}</div>
                        <div class="arrtime">Scheduled Arrival Time: ${flight.arr_time}</div>
                        ${flight.status === 'scheduled' && flight.delayed ? `<div class="arrest">Estimated Arrival Time: ${flight.arr_estimated}</div>` : ''}
                        ${flight.status === 'landed' ? `<div class="arr-actual">Actual Arrival Time: ${flight.arr_actual}</div>` : ''}
                        ${flight.status === 'active' ? `<div class="arr-estimated">Estimated Arrival Time: ${flight.arr_estimated || ''}</div>` : ''}
                        <div class="arrgate">Arrival Gate: ${flight.arr_gate}</div>
                        <div class="arrterm">Arrival Terminal: ${flight.arr_terminal}</div>
                    `;
    
                    // Append flight info container, separator, departure info, and arrival info to the flight element
                    flightElement.appendChild(flightInfoContainer);
                    flightElement.appendChild(separator);
                    flightElement.appendChild(departureInfo);
                    flightElement.appendChild(arrivalInfo);
    
                    routeContainer.appendChild(flightElement);
                }
            } else {
                routeContainer.innerHTML = '<div class="no-flights">No flights available</div>';
                console.log('No flights available in API response.');
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }
    
    const airlineMappings = {
        "A3": "Aegean Airlines",
        "EI": "Aer Lingus",
        "SU": "Aeroflot",
        "AR": "Aerolineas Argentinas",
        "AM": "Aeromexico",
        "G9": "Air Arabia",
        "KC": "Air Astana",
        "UU": "Air Austral",
        "BT": "Air Baltic",
        "KF": "Air Belgium",
        "AC": "Air Canada",
        "TX": "Air Caraibes",
        "CA": "Air China",
        "XK": "Air Corsica",
        "EN": "Air Dolomiti",
        "UX": "Air Europa",
        "AF": "Air France",
        "AI": "Air India",
        "IX": "Air India Express",
        "NX": "Air Macau",
        "KM": "Air Malta",
        "MK": "Air Mauritius",
        "SW": "Air Namibia",
        "NZ": "Air New Zealand",
        "4N": "Air North",
        "RS": "Air Seoul",
        "JU": "Air Serbia",
        "TN": "Air Tahiti Nui",
        "TS": "Air Transat",
        "NF": "Air Vanuatu",
        "AK": "AirAsia",
        "D7": "AirAsia X",
        "SB": "Aircalin",
        "AS": "Alaska Airlines",
        "AZ": "Alitalia",
        "G4": "Allegiant",
        "AA": "American Airlines",
        "NH": "ANA",
        "OZ": "Asiana",
        "OS": "Austrian",
        "AV": "Avianca",
        "J2": "Azerbaijan Hava Yollary",
        "S4": "Azores Airlines",
        "AD": "Azul",
        "QH": "Bamboo Airways",
        "PG": "Bangkok Airways",
        "BA": "British Airways",
        "SN": "Brussels Airlines",
        "BW": "Caribbean Airlines",
        "KA": "Cathay Dragon",
        "CX": "Cathay Pacific",
        "KX": "Cayman Airways",
        "5J": "CEBU Pacific Air",
        "CI": "China Airlines",
        "MU": "China Eastern",
        "CZ": "China Southern",
        "DE": "Condor",
        "CM": "Copa Airlines",
        "OU": "Croatia Airlines",
        "OK": "Czech Airlines",
        "DL": "Delta",
        "U2": "easyJet",
        "WK": "Edelweiss Air",
        "MS": "Egyptair",
        "LY": "EL AL",
        "EK": "Emirates",
        "ET": "Ethiopian Airlines",
        "EY": "Etihad",
        "EW": "Eurowings",
        "BR": "EVA Air",
        "FJ": "Fiji Airways",
        "AY": "Finnair",
        "FZ": "flydubai",
        "5F": "FlyOne",
        "BF": "French bee",
        "F9": "Frontier",
        "GA": "Garuda Indonesia",
        "G3": "Gol",
        "GF": "Gulf Air",
        "HU": "Hainan Airlines",
        "HA": "Hawaiian Airlines",
        "2L": "Helvetic Airways",
        "UO": "HK Express",
        "HX": "Hong Kong Airlines",
        "IB": "Iberia",
        "FI": "Icelandair",
        "6E": "IndiGo Airlines",
        "4O": "InterJet",
        "JL": "Japan Airlines",
        "7C": "Jeju Air",
        "LS": "Jet2",
        "B6": "JetBlue",
        "JQ": "Jetstar",
        "LJ": "Jin Air",
        "KQ": "Kenya Airways",
        "KL": "KLM",
        "KE": "Korean Air",
        "MN": "Kulula",
        "B0": "La Compagnie",
        "LA": "LATAM",
        "JT": "Lion Airlines",
        "LO": "LOT Polish Airlines",
        "LH": "Lufthansa",
        "LG": "Luxair",
        "MH": "Malaysia Airlines",
        "JE": "Mango",
        "ME": "Middle East Airlines",
        "DD": "Nok Air",
        "N4": "Nordwind Airlines",
        "D8": "Norwegian Air International",
        "DY": "Norwegian Air Shuttle",
        "LE": "Norwegian Air Sweden",
        "DI": "Norwegian Air UK",
        "WY": "Oman Air",
        "PK": "Pakistan International Airlines",
        "MM": "Peach",
        "PC": "Pegasus Airlines",
        "PR": "Philippine Airlines",
        "PD": "Porter",
        "QF": "Qantas",
        "QR": "Qatar Airways",
        "ZL": "Regional Express",
        "FV": "Rossiya - Russian Airlines",
        "AT": "Royal Air Maroc",
        "BI": "Royal Brunei",
        "RJ": "Royal Jordanian",
        "WB": "RwandAir",
        "FR": "Ryanair",
        "S7": "S7 Airlines",
        "SK": "SAS",
        "SV": "Saudia",
        "TR": "Scoot Airlines",
        "FM": "Shanghai Airlines",
        "MI": "Silkair",
        "3M": "Silver",
        "SQ": "Singapore Airlines",
        "6J": "Skylanes",
        "OO": "Skywest",
        "SA": "South African Airways",
        "WN": "Southwest Airlines",
        "SG": "SpiceJet",
        "NK": "Spirit Airlines",
        "9C": "Spring Airlines",
        "IJ": "Spring Japan",
        "UL": "SriLankan Airlines",
        "SY": "Sun Country Airlines",
        "DK": "Sunclass Airlines",
        "WG": "Sunwing Airlines",
        "LX": "SWISS",
        "WO": "Swoop",
        "DT": "TAAG",
        "TA": "TACA",
        "TP": "TAP Portugal",
        "TG": "THAI",
        "TT": "tigerair Australia",
        "HV": "Transavia Airlines",
        "BY": "TUI UK",
        "X3": "TUIfly",
        "TU": "Tunis Air",
        "TK": "Turkish Airlines",
        "PS": "Ukraine International",
        "UA": "United Airlines",
        "U6": "Ural Airlines",
        "UT": "UTair Aviation",
        "HY": "Uzbekistan Airways",
        "VN": "Vietnam Airlines",
        "VS": "Virgin Atlantic",
        "VA": "Virgin Australia",
        "UK": "Vistara",
        "VB": "Viva Aerobus",
        "Y4": "Volaris",
        "V7": "Volotea",
        "VY": "Vueling Airlines",
        "WS": "WestJet",
        "W6": "Wizz Air",
        "MF": "Xiamen Airlines"
    };
    
    
    function getAirlineName(iataCode) {
        console.log("Requested IATA Code:", iataCode);
    
        // Extract the first two characters (airline code) from the IATA code
        const airlineCode = iataCode.substring(0, 2);
        console.log("Extracted Airline Code:", airlineCode);
    
        // Check if there's a mapping for the airline code
        if (airlineMappings[airlineCode]) {
            const airlineName = airlineMappings[airlineCode];
            console.log("Extracted Airline Name:", airlineName);
            return airlineName;
        }
    
        return "Unknown Airline";
    }

    try {
        console.log('Calling fetchAndDisplayFlights.');
        await fetchAndDisplayFlights(flightIata);
    } catch (error) {
        console.error('Error fetching and displaying flights:', error);
    }
    
});
