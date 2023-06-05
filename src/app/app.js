const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

///////////////////////////////////////////////
//           Middilwaire Use                 //
/////////////////////////////////////////////*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// =========== //

///////     End of Middilwaire Use    ////////

module.exports = app;   

