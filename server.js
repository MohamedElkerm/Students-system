

const express = require("express")
const colors = require("colors")
const morgan = require('morgan')
const dotenv = require('dotenv')
const mySqlPool = require("./config/db")


//config dotenv
dotenv.config()


// rest object
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes

app.use('/api/v1/student',require('./routes/studentRoutes'))


app.get('/test' , (req,res)=>{
    res.status(200).send(({
        'message' : 'get data successfully'
    }))
})



//port
const port = process.env.PORT ||8000


// conditionaly listen
mySqlPool.query('SELECT 1').then(()=>{
    //MYSQL
    console.log('mysql is connected'.bgCyan.white);
    //listen
    app.listen(port , ()=>{
                console.log(`Server is Running on port ${port}`.bgMagenta.white);
            })
}).catch(((err)=>{
    console.log(err);
}))



