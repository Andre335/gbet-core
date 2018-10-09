var Streammer = require('./streammer.server')

exports.findAll = async (req, res) => {
    try {
        const result = await Streammer.findAll();
        if (result.length == 0) return res.status(404).send({message: "Streammers not found"})
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const streammerID = req.params.id;
        const result = await Streammer.findOne(streammerID);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send({message: "Streammer not found"});
        }
    } catch (err) {
        res.status(500).send({message: err.message});
    }
};

exports.create = async (req, res) => {
    try {
        await Streammer.create(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const streammerID = req.params.id;
        await Streammer.deleteById(streammerID);
        res.status(202).send({message: "Streammer deleted"});
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

exports.update = async (req, res) => {
    try {
        const streammerID = req.params.id;
        await Streammer.update(streammerID, req.body);

        const updatedStreammer = await Streammer.findOne(streammerID);
        res.status(202).json(updatedStreammer); 
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}