const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000

const app = express();
app.use(cors());
app.use(express.json());

require('./app/models/index.js');
app.use(require("./app/routes/index"));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});