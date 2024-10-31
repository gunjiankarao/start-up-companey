const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./Users");

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/crud");
mongoose.connect("mongodb+srv://CRUD:CRUD@cluster0.d0pvh7m.mongodb.net/CRUD");

//find() method to get all records
app.get("/", (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

//to get record by ID
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({_id: id})
  // UserModel.findByPk({_id: id})
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

//Updating record
app.put("/updateUser/:id", (req, res) => {
  console.log("Updating")
  const id = req.params.id;
  const { name, email, age } = req.body; 
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name,
      email,
      age,
    }
  )
    .then(updatedUser => {
      res.json(updatedUser);
      console.log(updatedUser);
    })
    .catch(err => res.status(500).json(err)); 
});


//Deleting
app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err));
});

//API to create new record
app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});