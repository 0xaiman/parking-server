import { pool } from "../db_connection/connection.js";

async function submitBooking(req,res) {

    try{
        const {parkingPlan, parkingNumber,fullName, email, phoneNumber, carBrand, plateNumber} = req.body

        console.log('Data Received : ', parkingPlan, parkingNumber, fullName, email, phoneNumber,carBrand,plateNumber);


        const query = `
            INSERT INTO booking (parking_plan, parking_number, full_name, email, phone_number, car_brand, plate_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        await pool.query(query,[parkingPlan, parkingNumber, fullName, email, phoneNumber,carBrand,plateNumber]);
        console.log(`Entry for ${parkingPlan} plan for parking spot ${parkingNumber} created !`);

        res.status(200).json({
            message:'success',
            parkingPlan, 
            parkingNumber,
            fullName,
            email,
            phoneNumber,
            carBrand,
            plateNumber
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            message:`500: server error`
        })
    }
  
    
}

export default submitBooking;