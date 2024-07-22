const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/api/auth');
const taskRoutes = require('./routes/api/tasks');
const app = express();

// Middleware
app.use(express.json());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:3000'
}));

console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT_BACKEND);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

// Connect to MySQL
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1);
});

const port = process.env.PORT_BACKEND || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
