const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet")
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');



// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Routers
const hospitals = require("./routes/hospitals");
const auth = require('./routes/auth');
const appointments = require('./routes/appointments');
const massageShops = require('./routes/massageShops');
const reservations = require('./routes/reservations');

// Set app
const app = express();

// Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        components: {},
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express VacQ API'
        },
        servers: [
            {
                url: 'http://localhost:5555/api/v1'
            }
        ]
    },
    apis: ['./routes/*.js'],
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Enable CORS
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowsMs: 10 * 60 * 1000, // 10 mins
    max: 100
});
app.use(limiter);

// Prevent http param pollutions
app.use(hpp());

//Body Parser
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Routes
app.use("/api/v1/hospitals", hospitals);
app.use('/api/v1/appointments', appointments);
app.use('/api/v1/massageShops', massageShops);
app.use('/api/v1/reservations', reservations);
app.use("/api/v1/auth", auth);

// Cookie Parser
app.use(cookieParser());

// APIs
app.get('/', (req, res) => {
    // res.send('<h1>Hello from express</h1>');
    // res.send({ name: "Brad" });
    // res.json({ name: "Brad" });
    // res.sendStatus(400);
    // res.status(400).json({ success: false });
    res.status(200).json({ success: true, data: { id: 1 } });
});

// Port and deploy
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log("Server running in ", process.env.NODE_ENV, " mode on port ", PORT));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});