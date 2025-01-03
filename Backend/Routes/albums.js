const express = require('express');
const router = express.Router();

const album = require('../Models/album');

router.post('/save', async(req, res) => {
    const newAlbum = new album({
        name: req.body.name,
        imageURL: req.body.imageURL,
    });

    try {
        const savedAlbum = await newAlbum.save();
        return res.status(200).send({ success: true, album: savedAlbum });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });

    }
});

router.get('/getOne/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const data = await album.findOne(filter);

        if (data) {
            return res.status(200).send({ success: true, album: data });
        } else {
            return res.status(404).send({ success: false, msg: "Album not found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Error fetching album", error });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const options = { sort: { createdAt: 1 } };
        const data = await album.find({}, null, options);

        if (data && data.length > 0) {
            return res.status(200).send({ success: true, album: data });
        } else {
            return res.status(404).send({ success: false, msg: "No albums found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Error fetching albums", error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const filter = {_id: req.params.id};
        const options = {
            upsert: true,
            new: true,
        };

        const {name, imageURL} = req.body;
        const update = {
            name,
            imageURL
        };

        const result = await album.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.status(200).send({ success: true, msg: "Updated Successfully", data: result });

        }
        else {
            return res.status(404).send({ success: false, msg: "Not Updated " });
        }

    }catch(error){
        return res.status(500).send({success: false, msg: "Error updating album", error});
    }
});


router.delete('/delete/:id', async (req, res) => {
    try{
        const filter = {_id: req.params.id};
        const result = await album.deleteOne(filter);

        if (result) {
            return res.status(200).send({ success: true, msg : "Deleted Successfully" ,data : result});
        } else {
            return res.status(404).send({ success: false, msg: "Not Deleted " });
        }
    }catch(error){
        return res.status(500).send({success: false, msg: "Error deleting album", error});
    }
});

module.exports = router;