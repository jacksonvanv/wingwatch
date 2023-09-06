// JavaScript code for button interactions
const routeButton = document.getElementById('route');
const flightNumberButton = document.getElementById('flightnumber');
const airlineOptions = document.getElementById('airlineOptions');
const airlineDropdown = document.getElementById('airlineSearch')

// Add click event listener to the "Flight Number" button
flightNumberButton.addEventListener('click', () => {
    // Redirect to the "flightnumber.html" page
    window.location.href = 'flightnumber.html';
});

// Add click event listener to the "Route" button
routeButton.addEventListener('click', () => {
    // Redirect to the "index.html" page
    window.location.href = 'index.html';
});


const checkStatusButton = document.querySelector('.check-status-button');

checkStatusButton.addEventListener('click', () => {
    // Redirect to the "flights.html" page
    window.location.href = 'flights.html';
});


// Add an array of airlines to search from
const airlines = [
    "Aegean Airlines (A3)",
    "Aer Lingus (EI)",
    "Aeroflot (SU)",
    "Aerolineas Argentinas (AR)",
    "Aeromexico (AM)",
    "Air Arabia (G9)",
    "Air Astana (KC)",
    "Air Austral (UU)",
    "Air Baltic (BT)",
    "Air Belgium (KF)",
    "Air Canada (AC)",
    "Air Caraibes (TX)",
    "Air China (CA)",
    "Air Corsica (XK)",
    "Air Dolomiti (EN)",
    "Air Europa (UX)",
    "Air France (AF)",
    "Air India (AI)",
    "Air India Express (IX)",
    "Air Macau (NX)",
    "Air Malta (KM)",
    "Air Mauritius (MK)",
    "Air Namibia (SW)",
    "Air New Zealand (NZ)",
    "Air North (4N)",
    "Air Seoul (RS)",
    "Air Serbia (JU)",
    "Air Tahiti Nui (TN)",
    "Air Transat (TS)",
    "Air Vanuatu (NF)",
    "AirAsia (AK)",
    "AirAsia X (D7)",
    "Aircalin (SB)",
    "Alaska Airlines (AS)",
    "Alitalia (AZ)",
    "Allegiant (G4)",
    "American Airlines (AA)",
    "ANA (NH)",
    "Asiana (OZ)",
    "Austrian (OS)",
    "Avianca (AV)",
    "Azerbaijan Hava Yollary (J2)",
    "Azores Airlines (S4)",
    "Azul (AD)",
    "Bamboo Airways (QH)",
    "Bangkok Airways (PG)",
    "British Airways (BA)",
    "Brussels Airlines (SN)",
    "Caribbean Airlines (BW)",
    "Cathay Dragon (KA)",
    "Cathay Pacific (CX)",
    "Cayman Airways (KX)",
    "CEBU Pacific Air (5J)",
    "China Airlines (CI)",
    "China Eastern (MU)",
    "China Southern (CZ)",
    "Condor (DE)",
    "Copa Airlines (CM)",
    "Croatia Airlines (OU)",
    "Czech Airlines (OK)",
    "Delta (DL)",
    "easyJet (U2)",
    "Edelweiss Air (WK)",
    "Egyptair (MS)",
    "EL AL (LY)",
    "Emirates (EK)",
    "Ethiopian Airlines (ET)",
    "Etihad (EY)",
    "Eurowings (EW)",
    "EVA Air (BR)",
    "Fiji Airways (FJ)",
    "Finnair (AY)",
    "flydubai (FZ)",
    "FlyOne (5F)",
    "French bee (BF)",
    "Frontier (F9)",
    "Garuda Indonesia (GA)",
    "Gol (G3)",
    "Gulf Air (GF)",
    "Hainan Airlines (HU)",
    "Hawaiian Airlines (HA)",
    "Helvetic Airways (2L)",
    "HK Express (UO)",
    "Hong Kong Airlines (HX)",
    "Iberia (IB)",
    "Icelandair (FI)",
    "IndiGo Airlines (6E)",
    "InterJet (4O)",
    "Japan Airlines (JL)",
    "Jeju Air (7C)",
    "Jet2 (LS)",
    "JetBlue (B6)",
    "Jetstar (JQ)",
    "Jin Air (LJ)",
    "Kenya Airways (KQ)",
    "KLM (KL)",
    "Korean Air (KE)",
    "Kulula (MN)",
    "La Compagnie (B0)",
    "LATAM (LA)",
    "Lion Airlines (JT)",
    "LOT Polish Airlines (LO)",
    "Lufthansa (LH)",
    "Luxair (LG)",
    "Malaysia Airlines (MH)",
    "Mango (JE)",
    "Middle East Airlines (ME)",
    "Nok Air (DD)",
    "Nordwind Airlines (N4)",
    "Norwegian Air International (D8)",
    "Norwegian Air Shuttle (DY)",
    "Norwegian Air Sweden (LE)",
    "Norwegian Air UK (DI)",
    "Oman Air (WY)",
    "Pakistan International Airlines (PK)",
    "Peach (MM)",
    "Pegasus Airlines (PC)",
    "Philippine Airlines (PR)",
    "Porter (PD)",
    "Qantas (QF)",
    "Qatar Airways (QR)",
    "Regional Express (ZL)",
    "Rossiya - Russian Airlines (FV)",
    "Royal Air Maroc (AT)",
    "Royal Brunei (BI)",
    "Royal Jordanian (RJ)",
    "RwandAir (WB)",
    "Ryanair (FR)",
    "S7 Airlines (S7)",
    "SAS (SK)",
    "Saudia (SV)",
    "Scoot Airlines (TR)",
    "Shanghai Airlines (FM)",
    "Silkair (MI)",
    "Silver (3M)",
    "Singapore Airlines (SQ)",
    "Skylanes (6J)",
    "Skywest (OO)",
    "South African Airways (SA)",
    "Southwest (WN)",
    "SpiceJet (SG)",
    "Spirit (NK)",
    "Spring Airlines (9C)",
    "Spring Japan (IJ)",
    "SriLankan Airlines (UL)",
    "Sun Country (SY)",
    "Sunclass Airlines (DK)",
    "Sunwing (WG)",
    "SWISS (LX)",
    "Swoop (WO)",
    "TAAG (DT)",
    "TACA (TA)",
    "TAP Portugal (TP)",
    "THAI (TG)",
    "tigerair Australia (TT)",
    "Transavia Airlines (HV)",
    "TUI UK (BY)",
    "TUIfly (X3)",
    "Tunis Air (TU)",
    "Turkish Airlines (TK)",
    "Ukraine International (PS)",
    "United (UA)",
    "Ural Airlines (U6)",
    "UTair Aviation (UT)",
    "Uzbekistan Airways (HY)",
    "Vietnam Airlines (VN)",
    "Virgin Atlantic (VS)",
    "Virgin Australia (VA)",
    "Vistara (UK)",
    "Viva Aerobus (VB)",
    "Volaris (Y4)",
    "Volotea (V7)",
    "Vueling Airlines (VY)",
    "WestJet (WS)",
    "Wizzair (W6)",
    "Xiamen Airlines (MF)",
  ];
  
const airlineInput = document.querySelector('#airlineSearch');
const airlineSuggestions = document.querySelector('.airline-suggestions ul');

const maxVisibleSuggestions = 10; // Number of visible suggestions

function search(str, dataList) {
    let results = [];
    const val = str.toLowerCase();

    for (i = 0; i < dataList.length; i++) {
        if (dataList[i].toLowerCase().indexOf(val) > -1) {
            results.push(dataList[i]);
        }
    }
    return results;
}

function searchHandler(e, dataList, suggestionsContainer, input) {
    const inputVal = input.value; // Use input's value, not e.currentTarget.value
    let results = [];
    if (inputVal.length > 0) {
        results = search(inputVal, dataList);
    }
    showSuggestions(results, inputVal, suggestionsContainer);
}

function showSuggestions(results, inputVal, suggestionsContainer) {
    suggestionsContainer.innerHTML = '';

    const startIndex = 0; // Start index of suggestions
    const endIndex = Math.min(startIndex + maxVisibleSuggestions, results.length);

    if (endIndex > startIndex) {
        for (let i = startIndex; i < endIndex; i++) {
            let item = results[i];
            const match = item.match(new RegExp(inputVal, 'i'));
            item = item.replace(match[0], `<strong>${match[0]}</strong>`);
            suggestionsContainer.innerHTML += `<li>${item}</li>`;
        }
        suggestionsContainer.classList.add('has-suggestions');
    } else {
        suggestionsContainer.classList.remove('has-suggestions');
    }
}

function useSuggestion(e, input, suggestionsContainer) {
    input.value = e.target.innerText;
    input.focus();
    suggestionsContainer.innerHTML = '';
    suggestionsContainer.classList.remove('has-suggestions');
}

airlineInput.addEventListener('input', () => {
    searchHandler(null, airlines, airlineSuggestions, airlineInput);
});

airlineSuggestions.addEventListener('click', e => {
    useSuggestion(e, airlineInput, airlineSuggestions);
});



const searchTypeDropdown = document.querySelector('#searchTypeDropdown');
const searchTypeOptions = document.querySelectorAll('.search-option');

// Function to toggle the search type dropdown
function toggleSearchTypeDropdown() {
    searchTypeDropdown.classList.toggle('active');
}

// Function to set the selected search type
function setSelectedSearchType(searchType) {
    searchTypeOptions.forEach(option => {
        if (option.dataset.value === searchType) {
            option.classList.add('selected');
            searchTypeSelect.value = searchType;
        } else {
            option.classList.remove('selected');
        }
    });
}

// Function to handle search type option selection
searchTypeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedSearchType = option.dataset.value;
        setSelectedSearchType(selectedSearchType);
        toggleSearchTypeDropdown();
    });
});

// Clicking outside the dropdown closes it
window.addEventListener('click', (e) => {
    if (!searchTypeDropdown.contains(e.target)) {
        searchTypeDropdown.classList.remove('active');
    }
});







function useSuggestion(e, input, suggestionsContainer) {
    const selectedOptionText = e.target.innerText;
    const airlineIataObj = extractIATACodeAndFlightNumber(selectedOptionText);

    if (airlineIataObj) {
        input.value = selectedOptionText;
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.classList.remove('has-suggestions');
    }
}

checkStatusButton.addEventListener('click', () => {
    const airlineInputText = airlineInput.value;
    const flightNumber = document.getElementById('enterflightNumber').value;
    const airlineIataObj = extractIATACodeAndFlightNumber(airlineInputText);

    if (airlineIataObj && flightNumber) {
        const airlineIata = airlineIataObj.iataCode;
        const flightIataNumber = `${airlineIata}${flightNumber}`;
        window.location.href = `flights.html?flight_iata=${flightIataNumber}`;
    } else {
        console.error("Invalid input.");
    }
});

function extractIATACodeAndFlightNumber(inputText) {
    const iataMatches = inputText.match(/\(([A-Z0-9]+)\)$/);

    if (iataMatches) {
        return {
            iataCode: iataMatches[1]
        };
    }

    return null;
}
