const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

// const cors_options = {
//     origin: process.env.CORSURL || "http://localhost:4200"
// };
const PORT = process.env.PORT || 3000

const app = express();
app.use(cors());
app.use(express.json());

require('./app/models/index.js');
app.use(require("./app/routes/index"));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});