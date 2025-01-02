"use client"

import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [signedUser, setSignedUser] = useState(null);

    return (
        <UserContext.Provider value={{ signedUser, setSignedUser }}>
            {children}
        </UserContext.Provider>
    );
};