// Running Server

// if we require dotenv after connectDB(); call then 
// in some case it's difficult to get mongodb_uri string
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");

connectDB();

app.get("/", (req, res) => {
    res.send("Home Route");
});

const port = 3000;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
})