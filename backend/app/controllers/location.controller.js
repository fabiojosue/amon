const LocationModel = require('../models/location.model');

exports.createLocation = async (req, res) => {
    try {
        const locationReq = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        };

        const location = new LocationModel(locationReq);
        await location.save();
        res.send({message: "Location created successfully", id: location._id});

    }catch(err) {
        if(err.code === 11000) {
            res.status(409).send({ message: 'Location already exists' });
        } else {
            console.log(err);
            res.status(500).send({ message: 'Server error' });
        }
    }
};

exports.removeLocation = async (req, res) => {
    try {
        const locationID = req.params.id
        
        const deletedLocation = await LocationModel.findByIdAndDelete(locationID);
        if(!deletedLocation){
            return res.status(404).send({ message: "Location doesn't exist" });
        }
        res.send({ message: "Location deleted"});

    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.updateLocation = async (req, res) => {
    try {
        const locationID = req.params.id;
        const locationData = req.body;

        const location = await LocationModel.findByIdAndUpdate(locationID, locationData, {new: true});
        if(!location){
            return res.status(404).send({ message: "Location not found" });
        }
        res.send({ message: "Location updated" });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.getLocation = async (req, res) => {
    try {
        const id = req.params.id;

        const foundLocation = await LocationModel
            .findById(id)
            .exec();
        if(!foundLocation){
            return res.status(409).send({ message: "Location not found"});
        }
        res.send(foundLocation);
    }
    catch(err) {
        res.status(500).send({ message: "Error getting location"});
    }
};

exports.getLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.send({locations});
    } catch(err) {
        res.status(500).send({ message: "Error getting locations"});
    }
};