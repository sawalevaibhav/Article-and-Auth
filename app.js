
const  express = require('express')
const req = require('express/lib/request')
const app = express()

const cors = require('cors')

const cookieParser = require('cookie-parser')



app.use(express.json())
app.use(cookieParser())
app.use(cors())

  const bodyparser = require("body-parser")
  const file_upload = require("express-fileupload")


  app.use(bodyparser.urlencoded({extended:true}))
  app.use(file_upload())

//Route import 
const  article = require("./routes/articleRoute")

const user = require("./routes/userRoute")

app.use(article)
app.use(user)




module.exports = app