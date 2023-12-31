const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const MTSRouter = require('./routes/MTSRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(
    cors({
        credentials: true,
        origin: true,
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/data', MTSRouter);
app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
