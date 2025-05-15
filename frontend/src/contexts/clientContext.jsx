import React, { createContext, useState } from 'react';

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    return (
        <ClientContext.Provider value={{ selectedClientId, setSelectedClientId, selectedClient, setSelectedClient }}>
            {children}
        </ClientContext.Provider>
    )
}