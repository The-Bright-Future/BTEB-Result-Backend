const mongoose = require("mongoose");
require("dotenv").config();

const dbUri = `mongodb+srv://bteb-user:vUDP5yMhNdBrdx7I@btebresult.zvmlhsx.mongodb.net/bteb-result?retryWrites=true&w=majority`

mongoose.set("strictQuery", false);
module.exports = () => {
  return mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
