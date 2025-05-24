import { createContext, useState, useContext } from 'react';
import { getNotesByClientId } from '../services/noteService';
const NoteContext = createContext();

export const useNoteContext = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [clientId, setClientId] = useState(null);         //for linking notes to specific clients

    const fetchNotes = async (id = clientId) => {
        console.log("Fetching notes for clientId:", id);
        try {
            const data = await getNotesByClientId(id);
            setNotes(data);
        } catch (err) {
            console.error('Error fetching notes:', err);
        }
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, editingNote, setEditingNote, clientId, setClientId, fetchNotes }}>
            {children}
        </NoteContext.Provider>
    )
}