import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt'
import data from '../data.js';
import User from '../models/userModels.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post('/signin',expressAsyncHandler( async (req, res) => {

    const user = await User.findOne({email: req.body.email})
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)

                })
                return
            }
        }
        res.status(401).send({ message: 'Invalid email or password...'})
    } )  
)


userRouter.post('/registration', expressAsyncHandler( async(req, res)=>{
    const user = await User.findOne({email: req.body.email})
    if(user){
        res.status(401).send({message : 'This email already exist in the system'})
    }else{
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password,8)
        })
        const createdUser = await newUser.save()
        res.send({
            _id : createdUser._id,
            name : createdUser.name,
            email : createdUser.email,
            isAdmin : createdUser.isAdmin,
            token : generateToken(createdUser)
        })
    }
} ))

export default userRouter;