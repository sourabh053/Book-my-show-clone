const express = require('express');
const cors = require("cors");
const app = express();

require('dotenv').config();  //Load Environment Variables
const dbConfig = require("./config/dbConfig");

const userRoute = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const theatreRoutes = require("./routes/theatreRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/movie', movieRoutes);
app.use('/api/theatre', theatreRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`); 
}); 