const { Client } = require('pg');
const axios = require('axios');

// Function to fetch data from the API
async function fetchData() {
    // Your API URL and API key
    const url = 'YOUR_API_URL';
    const apiKey = 'YOUR_API_KEY';

    try {
        const response = await axios.get(url, {
            headers: {
                'apikey': apiKey,
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, compress, deflate, br'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to save data to PostgreSQL
async function saveDataToPostgres(data) {
    // PostgreSQL connection config
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'PASSWORD',
        port: 5432,
    });

    try {
        await client.connect();

        // Iterate over each vehicle data and insert into the PostgreSQL table
        for (const vehicle of data.data) {
            const query = `
                INSERT INTO Huijbtrex (
                    vehicle_id, vehicle_name, description, fixed_vehicle_phone,
                    msg_target_id, device_serial_number, vehicle_group_id,
                    vehicle_group_name, licence_plate, vehicle_type,
                    fuel_type, customer_id, last_position_event_time, sim_id
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
                )`;
            const values = [
                vehicle.vehicleId, vehicle.vehicleName, vehicle.description,
                vehicle.fixedVehiclePhone, vehicle.msgTargetId,
                vehicle.deviceSerialNumber, vehicle.vehicleGroupId,
                vehicle.vehicleGroupName, vehicle.licencePlate,
                vehicle.vehicleType, vehicle.fuelType,
                vehicle.customerId, vehicle.lastPositionEventTime,
                vehicle.simId
            ];
            await client.query(query, values);
        }

        console.log('Data saved to PostgreSQL successfully.');
    } catch (error) {
        console.error('Error saving data to PostgreSQL:', error);
    } finally {
        await client.end();
    }
}

// Main function to fetch data and save to PostgreSQL
async function main() {
    try {
        const data = await fetchData();
        await saveDataToPostgres(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
