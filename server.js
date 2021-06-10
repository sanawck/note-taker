// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const { Router } = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs");

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

app.get("/notes", function (req, res) {
  res.sendFile(path.join(path.join(__dirname, "/public"), "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(path.join(__dirname, "/public"), "index.html"));
});

app.delete("/api/notes/:id", function (req, res) {
  console.log("entered delete", req.params.id);
  let jsonFilePath = "./db/db.json";
  let notes = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
  let id = req.params.id;
  notes = notes.filter((thisNote) => {
    return thisNote.id != id;
  });

  let freshId = 0;
  for (thisNote of notes) {
    thisNote.id = freshId.toString();
    freshId++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});
//   // Write the db.json file again.
//   fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
//     if (err) {
//       return console.log(err);
//     } else {
//       console.log("Your note was deleted!");
//     }
//   });
//   res.json(database);
// });

app.post("/api/notes", function (req, res) {
  let newNote = req.body;
  let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
  let id = notes.length.toString();
  newNote.id = id;
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json(notes);
});

//require("./routes/apiRoutes")(app);
//require("./routes/htmlRoutes")(app);

// LISTENER
// The below code effectively "starts" our server
Router.get;

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
