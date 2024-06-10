const ReportModel = require('../models/report.model');

exports.createReport = async (req, res) => {
    try {
        const reportReq = {
            location: req.body.location,
            type: req.body.type,
            registerDate: req.body.registerDate
        };

        const report = new ReportModel(reportReq);
        await report.save();
        res.send({message: "Report created successfully"});

    }catch(err) {
        if(err.code === 11000) {
            res.status(409).send({ message: 'report already exists' });
        } else {
            console.log(err);
            res.status(500).send({ message: 'Server error' });
        }
    }
};

exports.removeReport = async (req, res) => {
    try {
        const reportID = req.params.id
        
        const deletedReport = await ReportModel.findByIdAndDelete(reportID);
        if(!deletedReport){
            return res.status(404).send({ message: "Report doesn't exist" });
        }
        res.send({ message: "Report deleted"});

    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const reportID = req.params.id;
        const reportData = req.body;

        const report = await ReportModel.findByIdAndUpdate(reportID, reportData, {new: true});
        if(!report){
            return res.status(404).send({ message: "Report not found" });
        }
        res.send({ message: "Report updated" });
    } catch (err) {
        res.status(500).send({ message: 'Server error' });
    }
};

exports.getReport = async (req, res) => {
    try {
        const id = req.params.id;

        const foundReport = await ReportModel
            .findById(id)
            .exec();
        if(!foundReport){
            return res.status(409).send({ message: "Report not found"});
        }
        res.send(foundReport);
    }
    catch(err) {
        res.status(500).send({ message: "Error getting Report"});
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await ReportModel.find();
        res.send({reports});
    } catch(err) {
        res.status(500).send({ message: "Error getting reports"});
    }
};