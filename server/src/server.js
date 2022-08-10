const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchesData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const MONGO_URI = process.env.MONGO_URL;

const server = http.createServer(app);

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!')
});

mongoose.connection.on('error', (err) => {
    console.error(err)
});

async function startServer() {
    await mongoose.connect(MONGO_URI);
    await loadPlanetsData();
    await loadLaunchesData();
    
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}...`)
    });
}

startServer();