const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
    res.json({
        message: "Hello from songs"
    });
})

router.get("/download", (req, res) => {
    let sname = req.query.sname?.toString();

    const file = path.join(`../songs/${sname}.mp3`);
    if (file) {
        res.download(file);
    }
    else {
        res.json({
            msg: 'File not found'
        })
    }
})

router.get("/stream", async (req, res) => {
    let sname = req.query.sname;
    try {
        const audio = path.join(`../songs/${sname}.mp3`);
        const stat = fs.statSync(audio);

        res.writeHead(200, {
            'Content-Type': 'audio/mp3',
            'Content-Length': stat.size
        });

        const readStream = fs.createReadStream(audio);
        readStream.pipe(res);
    } catch (e) {
        console.log(`Error: ${e}`)
    }
})

module.exports = router;