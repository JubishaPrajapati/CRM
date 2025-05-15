import api from '../utils/api';

//get all notes for specific client
export const getNotesByClientId = async (clientId) => {
    const response = await api.get(`/notes/client/${clientId}`);
    return response.data;
};

//get all notes 
export const getAllNote = async () => {
    const response = await api.get('/notes');
    return response.data;
}

//get note by id
export const getNoteById = async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
}

//create new note
export const createNote = async (noteData) => {
    const response = await api.post('/notes', noteData);
    return response.data;
}

//update an existing note
export const updateNote = async (noteId, updatedData) => {
    const response = await api.put(`/notes/${noteId}`, updatedData);
    return response.data;
}

//delete a note
export const deleteNote = async (noteId) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
}