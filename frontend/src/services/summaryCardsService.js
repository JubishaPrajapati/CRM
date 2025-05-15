import api from "../utils/api";

export const getClientCount = async () => {
    const response = await api.get('/clients/clientCount');
    return response.data.count;
};

export const getNoteCount = async () => {
    const response = await api.get('/notes/noteCount');
    return response.data.count;
};

export const getMeetingCount = async () => {
    const response = await api.get('/meetings/meetingCount');
    return response.data.count;
};

