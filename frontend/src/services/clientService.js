import api from '../utils/api';

//get all clients
export const getAllClients = async () => {
    const response = await api.get('/clients');
    return response.data;
}

//get single client by id
export const getClientById = async (id) => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
}

//create new client
export const createClient = async (clientData) => {
    const response = await api.post('/clients', clientData);
    return response.data;
}

//update a client
export const updateClient = async (id, clientData) => {
    const response = await api.put(`/clients/${id}`, clientData);
    return response.data;
}

//delete a client
export const deleteClient = async (id) => {
    const response = await api.delete(`/clients/${id}`);
    return response.data;
}