const mongoose=require('mongoose');

mongoose
  .connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log("Error: ", error));

const userSchema= new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String, required:true, unique:true},
    age:{type:Number}
})

const User= mongoose.model('User', userSchema)

// const newUser = new User({
//     name: "Mike Ross",
//     email: "mike.ross@arkx.group",
//     age: 30,
//   });
  
//   newUser
//     .save()
//     .then((user) => console.log("User created succesfully: ", user))
//     .catch((error) => console.log("Error creating user: ", error));

//    User.find({})
//    .then((users)=>console.log(users))
//    .catch((error)=>console.log('error fetching users:',error)) 

//    User.findOne({name :'Mike Ross', email:'mike.ross@arkx.group'})
//    .then((user) => {
//     if (user) console.log(user);
//     else console.log("User not found");
//   })
//   .catch((error) => console.log("Error fetching users: ", error));

//   User.findOneAndUpdate(
//     { name: "Mike Ross" },
//     { $set: { email: "mikes@gmail.com" } }
//   )
//     .then((user) => {
//       if (user) console.log("User updated successfully: ", user);
//       else console.log("User not found");
//     })
//     .catch((error) => console.log("Error fetching users: ", error));

let myDate= new Date("2024-02-26");
    User.deleteMany({createdAt : {$gt: myDate}})
    .then((res)=>{
      if(res.deletedCount>0){
        console.log(`${res.deletedCount} users are deleted !`)
      }else console.log("No users found")
    })
    .catch((error)=>console.log("Error deleting users:",error))