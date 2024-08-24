const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {body, validationResult} = require('express-validator');
const becrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

router.post("`/createuser`", [
    body("name", "name must be min 5 chars").isLength({min:5}),
    body("password", "password must be min 5 chars").isLength({min:5}),
    body("email", "email must be min 5 chars").isEmail()
], async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;

        let findEmail = await User.findOne({email});

        if (findEmail) {
            return res.status(400).json({error: "email already exits" });
        }

        let salt = await becrypt.genSalt(10);
        let hashPassword = await becrypt.hash(password, salt);

        let user = await User.create({
            name, 
            email,
            password:  hashPassword
        })



        const data = {
            user: {
                id: User._id;
            }
        }

        const token = JWT.sign(data, jwt_secret);
        console.log(token);

        res.status(200).json(user);
    }
    catch(err)
    {
        console.error("error:", err);
        res.status(500).json("server error");
    }
})

router.post("`/login`", [
    // body("password", "password must be min 5 chars").isLength({min:5}),
    // body("email", "email must be min 5 chars").isEmail()
], async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        let findData = await User.findOne({email});

        if (findData) {
            return res.status(400).json({error: "email already exits" });
        }

        let comparePassword = await becrypt.compare(password, findData.password);

        if(!comparePassword)
            {
                return res.status(400).json({error: "password is wrong" });
            }

        const data = {
            user: {
                id: User._id;
            }
        }

        const token = JWT.sign(data, jwt_secret);
        console.log(token);

        res.status(200).json(user);
    }
    catch(err)
    {
        console.error("error:", err);
        res.status(500).json("server error");
    }
})

module.exports = router;