const express = require('express');

const locationController = require('./controllers/location.controller');
const reportController = require('./controllers/report.controller');
const typeController = require('./controllers/type.controller');

const mainRouter = express.Router();

//Location
mainRouter.post("/location", locationController.createLocation);
mainRouter.put("/location/:id", locationController.updateLocation);
mainRouter.get("/location/:id", locationController.getLocation);
mainRouter.get("/location", locationController.getLocations);
mainRouter.delete("/location/:id", locationController.removeLocation);

//Type
mainRouter.post("/type", typeController.createType);
mainRouter.put("/type/:id", typeController.updateType);
mainRouter.get("/type/:id", typeController.getType);
mainRouter.get("/type", typeController.getTypes);
mainRouter.delete("/type/:id", typeController.removeType);

//Report
mainRouter.post("/report", reportController.createReport);
mainRouter.put("/report/:id", reportController.updateReport);
mainRouter.get("/report/:id", reportController.getReport);
mainRouter.get("/report", reportController.getReports);
mainRouter.delete("/report/:id", reportController.removeReport);

module.exports = mainRouter;