const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
require('./configs/database.config.js');
const InsurancePolicy = require('./models/DataItem'); // Make sure the path is correct

const app = express();
const port = process.env.SERVER_PORT || 5001;

app.use(bodyParser.json());
app.use(cors());

// API route to get all data items
app.get('/api/policy', async (req, res) => {
  try {
     const items = await InsurancePolicy.find();
     res.json(items);
  } catch (error) {
     res.status(500).json({ message: "Error fetching insurance policies", error: error });
  }
 });
 
// route for finding a particular data by Id
app.get('/api/policy/:id', async (req, res) => {
  try {
     const item = await InsurancePolicy.findById(req.params.id);
     if (item) {
       res.json(item);
     } else {
       res.status(404).json({ message: "Insurance policy not found" });
     }
  } catch (error) {
     console.error("Error fetching insurance policy:", error);
     res.status(500).json({ message: "Error fetching insurance policy", error: error });
  }
 });
 


app.post('/api/createPolicy', async (req, res) => {
  console.log(req.body);
  const newItem = new InsurancePolicy({
     makeModel: {
       brand: req.body.makeModel.brand,
       model: req.body.makeModel.model,
     },
     imeiNumber: req.body.imeiNumber,
     yearBought: req.body.yearBought,
     ownerName: req.body.ownerName,
     ownerAddress: req.body.ownerAddress,
     coverageAmount: req.body.coverageAmount,
  });
 
  try {
     console.log(newItem);
     const savedItem = await newItem.save();
     res.status(201).json(savedItem);
  } catch (error) {
    console.log(error);
     res.status(500).json({ message: "Error saving the insurance policy", error: error });
  }
 });
 

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});