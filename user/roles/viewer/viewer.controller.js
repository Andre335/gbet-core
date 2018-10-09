var Viewer = require('./viewer.server')

exports.findAll = async (req, res) => {
    try {
        const result = await Viewer.findAll();
        if (result.length == 0) return res.status(404).send({message: "Viewers not found"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const viewerID = req.params.id;
        const result = await Viewer.findOne(viewerID);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send({message: "Viewer not found"});
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        await Viewer.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const viewerID = req.params.id;
        await Viewer.deleteById(viewerID);
        res.status(202).send({message: "Viewer deleted"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.update = async (req, res) => {
    try {
        const viewerID = req.params.id;
        await Viewer.update(viewerID, req.body);

        const updatedViewer = await Viewer.findOne(viewerID);
        res.status(202).json(updatedViewer); 
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}