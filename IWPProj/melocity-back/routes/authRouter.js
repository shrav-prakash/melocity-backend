const express = require("express");
const router = express.Router();
const Users = require("../models/user")
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');

router.get("/", async (req, res) => {
    const users = await Users.find({})
    res.json({
        users: users
    });
})

router.post("/register", async (req, res) => {
    try {
        const uname = req.body.user?.toString();
        const email = req.body.email?.toString();
        const pass = req.body.pass?.toString();

        const olduser = await Users.findOne({
            user: uname
        })
        if (olduser) {
            return res.json({
                error: "User already exists",
                user: olduser
            })
        }

        const newuser = await Users.create({
            user: uname,
            email: email,
            pass: pass
        })
        res.json({
            user: newuser.user,
            token: jwt.sign(
                {
                    user: newuser.user
                },
                process.env.JWT
            )
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
})

router.post("/login", async (req, res) => {
    const uname = req.body.user?.toString();
    const pass = req.body.pass?.toString();

    const olduser = await Users.findOne({
        user: uname,
        pass: pass
    })

    if (olduser) {
        res.json({
            user: olduser.user,
            token: jwt.sign(
                {
                    user: olduser.user
                },
                process.env.JWT
            )
        })
    } else (
        res.json({
            error: "User doesn't exist"
        })
    )
})

router.post("/verify", (req, res) => {
    const token = req.body.token?.toString()
    if (token) {
        try {
            res.json(jwt.verify(req.body.token, process.env.JWT));
        } catch {
            res.json({
                error: "Invalid token"
            })
        }

    } else {
        res.json({
            error: "No token found"
        })
    }

})

router.post("/details", async (req, res) => {
    const uname = jwt_decode(req.body.token).user;

    const user = await Users.findOne({
        user: uname
    })

    res.json(user)

})

router.post("/update", async (req, res) => {
    const uname = jwt_decode(req.body.token).user;
    const date = req.body.date;

    const user = await Users.findOne({
        user: uname
    })

    user.dob = date;
    await user.save();

    res.json(user)

})

router.post("/upphone", async (req, res) => {
    const uname = jwt_decode(req.body.token).user;
    const phno = req.body.phno;

    const user = await Users.findOne({
        user: uname
    })

    user.phone = phno;
    await user.save();

    res.json(user)

})

module.exports = router;