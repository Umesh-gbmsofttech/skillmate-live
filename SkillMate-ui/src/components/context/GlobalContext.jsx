import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const setUserData = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const clearUserData = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <GlobalContext.Provider value={{ user, setUserData, clearUserData }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
