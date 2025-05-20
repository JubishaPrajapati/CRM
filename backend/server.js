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
const userRoutes = require('./routes/user')

dotenv.config();
connectDb();

const allowedOrigins = [
    'https://crm-pink-mu.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})