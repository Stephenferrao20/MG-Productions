const express = require('express');
const router = express.Router();

//artist model
const artist = require('../Models/artists');


router.post('/save', async(req, res) => {
    const newArtist = new artist({
        name: req.body.name,
        imageURL: req.body.imageURL,
        instagram: req.body.instagram,
    });

    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({ success: true, artist: savedArtist });
    } catch (error) {
        return res.status(400).send({ success: false, msg: error });

    }
});

router.get('/getOne/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id };
        const data = await artist.findOne(filter);

        if (data) {
            return res.status(200).send({ success: true, artist: data });
        } else {
            return res.status(404).send({ success: false, msg: "Artist not found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Error fetching artist", error });
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const options = { sort: { createdAt: 1 } };
        const data = await artist.find({}, null, options);

        if (data && data.length > 0) {
            return res.status(200).send({ success: true, artist: data });
        } else {
            return res.status(404).send({ success: false, msg: "No artists found" });
        }
    } catch (error) {
        return res.status(500).send({ success: false, msg: "Error fetching artists", error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const filter = {_id: req.params.id};
        const options = {
            upsert: true,
            new: true,
        };

        const {name, imageURL, instagram} = req.body;
        const update = {
            name,
            imageURL,
            instagram
        };

        const result = await artist.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.status(200).send({ success: true, msg: "Updated Successfully", data: result });

        }
        else {
            return res.status(404).send({ success: false, msg: "Not Updated " });
        }

    }catch(error){
        return res.status(500).send({success: false, msg: "Error updating artist", error});
    }


});


router.delete('/delete/:id', async (req, res) => {
    try{
        const filter = {_id: req.params.id};
        const result = await artist.deleteOne(filter);

        if (result) {
            return res.status(200).send({ success: true, msg : "Deleted Successfully" ,data : result});
        } else {
            return res.status(404).send({ success: false, msg: "Not Deleted " });
        }
    }catch(error){
        return res.status(500).send({success: false, msg: "Error deleting artist", error});
    }


});



module.exports = router;