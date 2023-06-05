///////////////////////////////////////////////
//                Local Import               //
/////////////////////////////////////////////*/
const ConnectDB = require("../Database/DBConnect");
const app = require("../src/app/app");
const PORT = process.env.PORT || 8080;
///////     End of Local Import      ////////

///////////////////////////////////////////////
//           DB Connection And Local         //
/////////////////////////////////////////////*/

app.get("/api/", (req, res) => {
  res.send("Hey Wellcome to API Server");
});

ConnectDB()
  .then(() => { 
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Cannot connect to database", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

///////  End of DB Connection And Local  ////////
