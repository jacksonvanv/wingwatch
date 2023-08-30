// Make an API request using Fetch API
const apiKey = "465f998a-0ac8-4000-a4da-dfe4fd3cbc83";
const apiUrl = `https://airlabs.co/api/v9/flights?api_key=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Access the array of flight objects
    const flights = data.flights;

    // Filter flights with airline_iata = 'WN'
    const wnFlights = flights.filter(flight => flight.airline_iata === 'WN');

    // Print the filtered flights
    wnFlights.forEach(flight => {
      console.log(`Flight Number: ${flight.flight_number}`);
      console.log(`Airline IATA: ${flight.airline_iata}`);
    });
  })
  .catch(error => console.error("Error fetching data:", error));
