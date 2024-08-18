import pkg from 'pg';
import dotenv from 'dotenv';
import createBookingTable from '../models/createBookingTable.js';


// Load environment variables from .env file
dotenv.config();

const {Pool} = pkg

// Set up the connection configuration
export const pool = new Pool({
  user: process.env.POSTGRES_USER ,
  host: process.env.POSTGRES_HOST ,
  database: process.env.POSTGRES_DATABASE ,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.DB_PORT || 5432,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
//   ssl: false
ssl: {
    rejectUnauthorized: false // Allow self-signed certificates (only for development)
  }

});

async function dbInit(){
    try{
        const dbRes = await pool.query("SELECT current_database();");
        const dbNow = await pool.query("SELECT NOW();");
        console.log(`CONNECTION TO DATABASE ${dbRes.rows[0].current_database} IS A SUCCESS `);
        console.log(dbNow.rows[0].now);
        createBookingTable();


    }catch(error){
        console.log(`Database Connection Failed`);
        console.log("Error",error);
    }
   
}

export default dbInit;

