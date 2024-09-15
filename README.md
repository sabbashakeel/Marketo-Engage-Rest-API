# Marketo-Engage-Rest-API

This Node.js application fetches vehicle data from an external API and stores it in a PostgreSQL database. It is designed to retrieve information about vehicles and their related details and insert them into the Huijbtrex table in PostgreSQL.

# Features
Fetch Data from API: Uses Axios to retrieve vehicle data from a specified API.
Save Data to PostgreSQL: Connects to a PostgreSQL database and inserts vehicle details into the Huijbtrex table.
Error Handling: Includes error handling for both the data-fetching process and database operations.
# Prerequisites
Node.js installed on your machine.
PostgreSQL installed and running locally or on a server.
API Key to access the vehicle data API.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/sabbashakeel/Marketo-Engage-Rest-API
cd main
Install the dependencies:

bash
Copy code
npm install pg axios
Set up your PostgreSQL connection and API details:

Replace YOUR_API_URL with the API endpoint URL.
Replace YOUR_API_KEY with your API key.
Update the PostgreSQL connection details in the script:
javascript
Copy code
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'PASSWORD',
    port: 5432,
});
Replace PASSWORD with your PostgreSQL password.
Database Table
The data will be inserted into a table called Huijbtrex with the following structure:

Column	Data Type
vehicle_id	TEXT
vehicle_name	TEXT
description	TEXT
fixed_vehicle_phone	TEXT
msg_target_id	TEXT
device_serial_number	TEXT
vehicle_group_id	TEXT
vehicle_group_name	TEXT
licence_plate	TEXT
vehicle_type	TEXT
fuel_type	TEXT
customer_id	TEXT
last_position_event_time	TEXT
sim_id	TEXT
Ensure that the table exists in your PostgreSQL database before running the application.

# Usage
Run the application:

bash
Copy code
node index.js
The script will:

Fetch data from the provided API URL.
Insert the fetched vehicle data into the PostgreSQL database.
# Error Handling
If any error occurs while fetching data from the API or saving it to PostgreSQL, the error will be logged in the console with appropriate messages.
