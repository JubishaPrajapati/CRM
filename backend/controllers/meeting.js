const Meeting = require('../models/meeting');

//create new meeting
exports.createMeeting = async (req, res) => {
    try {
        const meeting = new Meeting(req.body);
        await meeting.save();
        res.status(201).json(meeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Get all meetings
exports.getAllMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find().populate('client', 'name');;
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//get meeting with client name
exports.getMeetingCount = async (req, res) => {
    try {
        const count = await Meeting.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single meeting by ID
exports.getMeetingById = async (req, res) => {
    try {
        const meetings = await Meeting.findById(req.params.id).populate({
            path: 'client',
            select: 'name',
            populate: {
                path: 'notes',
                select: 'content createdAt'
            }
        });;

        if (!meetings) {
            return res.status(404).json({ message: 'Meeting not found' });
        }
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get meeting details for a client with client id
exports.getMeetingByClientId = async (req, res) => {
    try {
        const meetings = await Meeting.find({ client: req.params.clientId });
        if (!meetings || meetings.length === 0) return res.status(404).json({ error: 'No meetings found for this client' });
        res.json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Update a meeting
exports.updateMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
        res.json(meeting);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndDelete(req.params.id);
        if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
        res.json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};