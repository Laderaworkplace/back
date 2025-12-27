import express from 'express';
import 'dotenv/config'
import connectingDB from './configDb.js/connectDB.js';
import userRouter from './routes/userRouters.js';
import adminRouter from './routes/adminRouter.js';
import connectCloudinary from './configDb.js/cloudinaryconfig.js';

const app = express();
app.use(express.json())
connectingDB()
connectCloudinary()
//guys we access the port from .env file
const port = process.env.PORT || 7000

//this is for routes for stafss
app.use('/api/users/', userRouter)
//this route for admin
app.use("/admin",adminRouter)

//guys we checking the routes work or not
app.get('/', (req, res) => {
    res.send("Api is working succesful");
});

//our application running on this 
app.listen(port, () => console.log(`Apllication Running on Localhost ${port}`));


