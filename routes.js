console.log('Script is executing.');

document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded event fired.');

    const routeContainer = document.getElementById('routeContainer');
    const apiKey = '465f998a-0ac8-4000-a4da-dfe4fd3cbc83';

    // Retrieve query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const originIata = urlParams.get('origin');
    const destinationIata = urlParams.get('destination');

    async function fetchAndDisplayFlights(originIata, destinationIata) {
        const apiUrl = `https://airlabs.co/api/v9/flights?api_key=${apiKey}&dep_iata=${originIata}&arr_iata=${destinationIata}`;

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
                    flightElement.innerHTML = `
                        <div class="flight-details">
                            <div class="flight-number">${flight.flight_iata}</div>
                            <div class="dep-iata">${flight.dep_iata}</div>
                            <div class="dotted-line"></div>
                            <div class="arr-iata">${flight.arr_iata}</div>
                            <div class="section">
                                Status: ${flight.status}
                            </div>
                        </div>
                    `;

                    // Make additional API request to fetch detailed flight information
                    const detailedFlightApiUrl = `https://airlabs.co/api/v9/flight?flight_iata=${flight.flight_iata}&api_key=${apiKey}`;
                    try {
                        const detailedResponse = await fetch(detailedFlightApiUrl);
                        const detailedData = await detailedResponse.json();

                        // Append additional information to the flight element
                        const gateETADiv = document.createElement('div');
                        gateETADiv.classList.add('gate-eta');
                        gateETADiv.innerHTML = `
                            <div class="deptime">
                                Departure Time: ${detailedData.response.dep_time}
                            </div>
                            <div class="depgate">
                                Departure Gate: ${detailedData.response.dep_gate}
                            </div>
                            <div class="depterm">
                                Departure Terminal: ${detailedData.response.dep_terminal}
                            </div>
                            <div class="dotted-line"></div>
                            <div class="arrtime">
                                Estimated Arrival Time: ${detailedData.response.arr_time}
                            </div>
                            <div class="arrgate">
                            Arrival Gate: ${detailedData.response.arr_gate}
                            </div>
                            <div class="arrterm">
                                Arrival Terminal: ${detailedData.response.arr_terminal}
                            </div>
                        `;
                        flightElement.appendChild(gateETADiv);
                    } catch (error) {
                        console.error('Error fetching detailed flight information:', error);
                    }

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

    try {
        console.log('Calling fetchAndDisplayFlights.');
        await fetchAndDisplayFlights(originIata, destinationIata);
    } catch (error) {
        console.error('Error fetching and displaying flights:', error);
    }
});




