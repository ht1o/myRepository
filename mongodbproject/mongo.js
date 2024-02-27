const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log("Error: ", error));

  const db = client.db('myfirstdb');
const collection = db.collection('users');

collection
  .insertMany([{name:'Hicham',age:22},{name:'Bad',age:27},{name:'Otman',age:21}])
  .then((user) => console.log("User Created Successfully: ", user))
  .catch((error) => console.log("Error: ", error));

  collection
  .find().toArray()
  .then((user) => console.log(user))
  .catch((error) => console.log("Error: ", error));

collection
   .deleteOne({age:21})
   .then((user)=>console.log("Deleted successfully",user))
   .catch((error)=>console.log("Error :",error))  