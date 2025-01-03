const express = require('express');
const router = express.Router();
const song = require('../Models/song');


router.post('/save', async(req, res) => {
    const newSong = new song({
        title: req.body.title,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album:req.body.album,
        artist:req.body.artist,
    });

    try {
        const savedSong = await newSong.save();
        return res.status(200).send({ success: true, song: savedSong });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });

    }
});

router.get('/getOne/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const data = await song.findOne(filter);

        if (data) {
            return res.status(200).send({ success: true, song: data });
        } else {
            return res.status(404).send({ success: false, msg: "Song not found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Error fetching song", error });
    }
});


router.get('/getAll', async (req, res) => {
    try {
        const options = { sort: { createdAt: 1 } };
        const data = await song.find({}, null, options);

        if (data && data.length > 0) {
            return res.status(200).send({ success: true, song: data });
        } else {
            return res.status(404).send({ success: false, msg: "No song found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Error fetching song", error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const filter = {_id: req.params.id};
        const options = {
            upsert: true,
            new: true,
        };

        const {title, imageURL, songURL ,album , artist} = req.body;
        const update = {
            title,
            imageURL,
            songURL,
            album,
            artist
        };

        const result = await song.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.status(200).send({ success: true, msg: "Updated Successfully", data: result });

        }
        else {
            return res.status(404).send({ success: false, msg: "Not Updated " });
        }

    }catch(error){
        return res.status(500).send({success: false, msg: "Error updating song", error});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try{
        const filter = {_id: req.params.id};
        const result = await song.deleteOne(filter);

        if (result) {
            return res.status(200).send({ success: true, msg : "Deleted Successfully" ,data : result});
        } else {
            return res.status(404).send({ success: false, msg: "Not Deleted " });
        }
    }catch(error){
        return res.status(500).send({success: false, msg: "Error deleting song", error});
    }
});

module.exports = router;