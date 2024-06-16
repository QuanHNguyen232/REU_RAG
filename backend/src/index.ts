import express from "express"

const app = express()

// middlewares
app.use(express.json()); // to work with json





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
app.listen(5000, () => console.log("Server open")); // port 5000