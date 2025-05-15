import api from '../utils/api';

//create new meeting
export const createMeeting = async (meetingData) => {
    const response = await api.post('/meetings', meetingData);
    return response.data;
}

//get all meetings
export const getAllMeetings = async () => {
    const response = await api.get('/meetings');
    return response.data;
}

//get meeting by id
export const getMeetingById = async (id) => {
    const response = await api.get(`/meetings/${id}`);
    return response.data;
}

//get meething by client id
export const getMeetingByClientId = async (clientId) => {
    const response = await api.get(`/meetings/client/${clientId}`);
    return response.data;
};


//update meeting
export const updateMeeting = async (id, meetingData) => {
    const response = await api.put(`/meetings/${id}`, meetingData);
    return response.data;
}

//delete meeting
export const deleteMeeting = async (id) => {
    const response = await api.delete(`/meetings/${id}`);
    return response.data;
}
