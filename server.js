import express from 'express'
const app = express()
import {} from 'dotenv/config'
const PORT = process.env.PORT || 8888
import mongoose from 'mongoose'
import productRouters from './routers/productRouters.js'
import userRouter from './routers/userRouters.js'
import orderRouter from './routers/orderRouters.js'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
/*********************************************** */

/***************************Mongo Db connection  ******************************************* */
mongoose.connect("mongodb+srv://"+ process.env.MONGOPASSWORD +"/myamazon", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true

}).then(()=> console.log('connect'))
.catch((error) => console.error(error));
/****************************************************************** */



app.use('/api/users', userRouter);
app.use('/api/products', productRouters);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(PORT, ()=> console.log(
    "practiceamazon app is working on port : \n" + "localhost:" + PORT
))