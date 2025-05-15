const express = require('express');
const router = express.Router();
const { createMeeting, getAllMeetings, getMeetingCount, getMeetingById, getMeetingByClientId, updateMeeting, deleteMeeting } = require('../controllers/meeting');

router.post('/', createMeeting);
router.get('/', getAllMeetings);
router.get('/meetingCount', getMeetingCount);
router.get('/client/:clientId', getMeetingByClientId);
router.get('/:id', getMeetingById);
router.put('/:id', updateMeeting);
router.delete('/:id', deleteMeeting);

module.exports = router;
