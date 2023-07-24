const router = require('express').Router();
const Plist = require('../models/plist')
const jwt_decode = require('jwt-decode');

router.post("/get", async (req, res) => {
    let user = jwt_decode(req.body.token).user;

    let plist = await Plist.find({
        user: user
    })
    plist = plist.map((ele) => {
        return ele.name;
    })
    console.log(plist)
    res.json(plist)
})

router.post("/getsongs", async (req, res) => {
    let user = jwt_decode(req.body.token).user;
    let plist = req.body.plist;

    let songl = await Plist.findOne({
        name: plist,
        user: user
    })
    console.log(songl)
    res.json(songl)
})

router.post("/create", async (req, res) => {
    let user = jwt_decode(req.body.token).user;
    let pname = req.body.pname?.toString();

    const newPlist = await Plist.create({
        user: user,
        name: pname
    })

    res.json({ 'Message': 'Playlist Created' })
})

router.post("/addsong", async (req, res) => {
    let pname = req.body.plist?.toString();
    let sname = req.body.sname?.toString();

    console.log(pname, sname)

    const existPlist = await Plist.findOne({
        name: pname
    })

    console.log(existPlist)

    if (existPlist) {
        existPlist.slist.push(sname);
        existPlist.save()
        res.send("Ok")
    } else {
        res.send('Rip')
    }
})

module.exports = router;