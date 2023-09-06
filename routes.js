console.log('Script is executing.');

document.addEventListener('DOMContentLoaded', async function () {
    console.log('DOMContentLoaded event fired.');

    const routeContainer = document.getElementById('routeContainer');
    const apiKey = '301fdc50-4f1f-4453-8dc2-99a7919345b0';

    // Retrieve query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const originIata = urlParams.get('origin');
    const destinationIata = urlParams.get('destination');

    function convertToHoursOrMinutes(value) {
        if (value >= 60) {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return `${hours}h ${minutes}min`;
        }
        return `${value} min`;
    }

    async function fetchAndDisplayFlights(originIata, destinationIata) {
        const apiUrl = `https://airlabs.co/api/v9/schedules?api_key=${apiKey}&dep_iata=${originIata}&arr_iata=${destinationIata}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Log the entire API response for debugging
            console.log("API Response Data:", JSON.stringify(data, null, 2));

            routeContainer.innerHTML = '';

            if (Array.isArray(data.response) && data.response.length > 0) {
                for (const flight of data.response) {
                    // Check if cs_airline_iata is empty or null to exclude code-share flights
                    if (!flight.cs_airline_iata) {
                        const flightElement = document.createElement('div');
                        flightElement.classList.add('flight-info'); // Add the flight-info class

                        // Convert delay and duration to hours or minutes
                        const convertedDelay = convertToHoursOrMinutes(flight.delayed);
                        const convertedDuration = convertToHoursOrMinutes(flight.duration);

                        // Create flight info container
                        const flightInfoContainer = document.createElement('div');
                        flightInfoContainer.classList.add('flight-info-container');
                        flightInfoContainer.innerHTML = `
                            <div class="airline">${flight.flight_iata}</div>
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
                }
            } else {
                routeContainer.innerHTML = '<div class="no-flights">No flights available</div>';
                console.log('No flights available in API response.');
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    try {
        console.log('Calling fetchAndDisplayFlights.');
        await fetchAndDisplayFlights(originIata, destinationIata);
    } catch (error) {
        console.error('Error fetching and displaying flights:', error);
    }
});
