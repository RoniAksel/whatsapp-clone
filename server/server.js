const express = require("express");
const mongoose = require("mongoose"); // a package for communicating with MongoDB
const cookieParser = require("cookie-parser");
const cors = require("cors");

const Users = require("./users-db");
const Messages = require("./messages-db");
const Chats = require("./chats-db");

// Initializing Server
const app = express(); // express is a function that returns an instance
app.use(express.json()); // this makes it easier to process JSON requests
app.listen(8080, () => console.log("Our server is listening on port 8080... ")); // Now we're live!
app.use(
  //enable cross-origin requests
  cors({
    origin: "http://localhost:3001",
    credentials: true
  })
);
app.use(cookieParser()); //  Middleware that enable working with cookies

// Connecting to MongoDB

const mongoURL = 
    "mongodb+srv://roniaskel:aksel1992@cluster0.hedle.mongodb.net/netApp"
mongoose.set("useUnifiedTopology", true);

mongoose
.connect(mongoURL, {useNewUrlParser: true})
.then(()=>console.log("Connected to Mongo"))
.catch((err) => console.error(err))
// *********
// Routing
// *********
app.get("/", (req, res) => {
  res.write("<h1>Welcome to the NetApp server!</h1>");
  res.end();
});

// Users
app.get("/api/users", Users.getAll);

app.get("/api/users/:id", Users.getById);

app.get("/api/me", Users.getLoggedUserByCookie);

app.post("/api/users", Users.createNew);

app.put("/api/users/:id", Users.update);

app.delete("/api/users/:id", Users.delete);

// Messages
app.get("/api/messages", Messages.getAll);

app.get("/api/messages/:id", Messages.getById);

//app.post("/api/messages", Messages.createNew);

app.put("/api/messages/:id", Messages.update);

app.delete("/api/messages/:id", Messages.delete);

// Chats

app.get("/api/chats", Chats.getAll);

// get chat by id
app.get("/api/chats/:id", Chats.getById);

// get all messages from a specific chat
app.get("/api/chats/:id/messages", Messages.getByChat);

// get all chats for a specific user
//app.get("/api/friends/:id", Chats.getFriends);

// create a new chat
app.post("/api/chats", Chats.createNew);

// create a new message in a specific chat
app.post("/api/chats/:id/messages", Messages.createNew);
