import pkg from 'pg';
import createBookingTable from '../models/createBookingTable.js';

const {Pool} = pkg

// Set up the connection configuration
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'parking',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection cannot be established
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

