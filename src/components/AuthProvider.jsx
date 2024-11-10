// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {//component for authenticating login.
    const [isAuthenticated, setIsAuthenticated] = useState(() => {//state for storing authenticated(logged in status).
        // Check for a stored authentication state(which will be set in login page(using sessionStorage)).
        return sessionStorage.getItem('isAuthenticated') === 'true';
    });

    const login = () => {
        setIsAuthenticated(true);
        sessionStorage.setItem('isAuthenticated', 'true'); // Store authentication state
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAuthenticated'); // Remove authentication state on logout so user can't use url of a page unless they login again.
        //lucky i found this bug out by accident n this how we solved it(we remove the authenticatin state from session storage).
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);//exporting the contexts(dont worry about what they are..they just what we use to pass to pass the methods defined here to other components)