import { pool } from "../db_connection/connection.js";

async function createBookingTable(req,res){
    try{

        const query =  `
        CREATE TABLE IF NOT EXISTS booking 
        (
            id SERIAL PRIMARY KEY,
            parking_plan VARCHAR(50),
            parking_number VARCHAR(50), 
            full_name VARCHAR(255),
            email VARCHAR(50),
            phone_number VARCHAR(50),
            car_brand VARCHAR(50),
            plate_number VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `
    await pool.query(query);
    console.log("createBookingTable OK");

    }catch(error){
        console.error("error createBookingTable :",error);
    }
}

export default createBookingTable;