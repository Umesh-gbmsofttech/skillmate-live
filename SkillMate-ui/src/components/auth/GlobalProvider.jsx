import React, { createContext, useState } from 'react';

// Creating the Global Context
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <GlobalContext.Provider value={{ userData, setUserData }}>
            {children}
        </GlobalContext.Provider>
    );
};
