const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.mongo_URL).then(
    () => {
        console.log("connected to data base");
    }
)

.catch((err) => {
    console.log(`Could not connected to DB ` + err);
})