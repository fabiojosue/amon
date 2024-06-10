const TypeModel = require('../models/type.model');

exports.createType = async (req, res) => {
    try {
        const typeReq = {
            name: req.body.name,
            weight: req.body.weight
        };

        const type = new TypeModel(typeReq);
        await type.save();
        res.send({message: "Type created successfully"});

    }catch(err) {
        if(err.code === 11000) {
            res.status(409).send({ message: 'Type already exists' });
        } else {
            res.status(500).send({ message: 'Server error' });
        }
    }
};

exports.removeType = async (req, res) => {
    try {
        const typeID = req.params.id
        
        const deletedType = await TypeModel.findByIdAndDelete(typeID);
        if(!deletedType){
            return res.status(404).send({ message: "Type doesn't exist" });
        }
        res.send({ message: "Type deleted"});

    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.updateType = async (req, res) => {
    try {
        const typeID = req.params.id;
        const typeData = req.body;

        const type = await TypeModel.findByIdAndUpdate(typeID, typeData, {new: true});
        if(!type){
            return res.status(404).send({ message: "Type not found" });
        }
        res.send({ message: "Type updated" });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.getType = async (req, res) => {
    try {
        const id = req.params.id;

        const foundType = await TypeModel
            .findById(id)
            .exec();
        if(!foundType){
            return res.status(409).send({ message: "Type not found"});
        }
        res.send(foundType);
    }
    catch(err) {
        res.status(500).send({ message: "Error getting Type"});
    }
};

exports.getTypes = async (req, res) => {
    try {
        const types = await TypeModel.find();
        res.send({types});
    } catch(err) {
        res.status(500).send({ message: "Error getting types"});
    }
};