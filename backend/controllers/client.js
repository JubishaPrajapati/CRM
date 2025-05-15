const Client = require('../models/client');

//create new client
exports.createClient = async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get all clients
exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get total client count
exports.getClientCount = async (req, res) => {
    try {
        const count = await Client.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get  single client by id
exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).populate('notes');
        if (!client) return res.status(404).json({ error: 'Client not found' });
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

//update a client
exports.updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) return res.status(404).json({ error: 'Client not found' });
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//delete a client
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({ error: 'Client not found' });
        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}