const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();
require('./models/init');
const authRouter = require("./routes/authRouter")
const songRouter = require("./routes/songRouter")
const plistRouter = require('./routes/plistRouter');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/song", songRouter);
app.use("/playlist", plistRouter);

app.get('/', (req, res) => {
    res.json({
        message: "Hello"
    });
})

app.get('*', (req, res) => {
    res.json({
        message: "Illegal route"
    });
})

PORT = process.env.PORT;
app.listen(PORT, (error) => {
    if (error)
        console.log(error)
    console.log(`Node app is running on port ${PORT}`);
});