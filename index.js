import express from 'express';
import cors from 'cors';
import submitBooking from './controllers/booking.controller.js';
import dbInit from './db_connection/connection.js';

const app = express();
const port = process.env.PORT || 3000;
// Enable CORS for all origins
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// db initialization
dbInit();


// test
app.use('/helloworld', (req,res)=>{
    res.status(200).send(`<h1>Hello World</h1>`)

});

// booking request
app.post('/submit-booking',submitBooking)



// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
