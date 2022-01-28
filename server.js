
const app  = require('./app')


const dotenv = require("dotenv");
const cloundinary = require("cloudinary")

const connectDatabase = require("./config/database")

//config 

dotenv.config({path:"config/config.env"})

// connneting to database

connectDatabase()


cloundinary.config({
    // cloud_name: "dvliecw1u",
    // api_key: "583119612875722",
    // api_secret: '583119612875722'

   
        cloud_name: process.env.CLOUNDINARY_NAME,
        api_key:  process.env.CLOUNDINARY_KEY,
        api_secret: process.env.CLOUNDINARY_SCERECT
    
});



app.listen(process.env.PORT,()=>{
    console.log(`server is working on port https://localhost:${process.env.PORT}`)
})