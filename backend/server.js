const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const connectDb = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;
const clientRoutes = require('./routes/client');
const meetingRoutes = require('./routes/meeting');
const noteRoutes = require('./routes/note');
const taskRoutes = require('./routes/task');

dotenv.config();
connectDb();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})