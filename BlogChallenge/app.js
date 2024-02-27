const express=require('express')
const app=express();
const port=3000
const router= require('./routes/postRoutes')
const {log}=require('./middlewear/jwt')

app.use(express.json())
app.use(log)
app.use('/router',router)


app.listen(port,()=>{
    console.log(`Server is listening on ${port}`);
})