import app from "./app.js";
import {connectToDatabase} from "./db/connection.js";

/*
// static routing
app.get("/hello", (req, res, next) => {
    return res.send("Hello");
});
// dynamic routing
app.post("/user/:id", (req, res, next) => {
    console.log(req.params.id); // fetch from url /user/:id
    return res.send("Hello");
});
*/

// connections and listners
const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server open AND connected to Database")); // port 5000
}).catch(err => {
    console.log(err);
})

