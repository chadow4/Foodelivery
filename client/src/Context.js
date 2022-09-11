import React, { useState, createContext, useEffect } from 'react';

const PanierContext = createContext();
const PanierProvider = (props) => {
    const data_panier = JSON.parse(window.localStorage.getItem('panier'));
    const [panier, setPanier] = useState(data_panier ? data_panier : []);

    useEffect(() => {
        const string = JSON.stringify(panier);
        localStorage.setItem('panier',string)
    }, [panier]); 
    
    return <PanierContext.Provider value={[panier, setPanier]}>{props.children}</PanierContext.Provider>
};
export { PanierContext, PanierProvider };

const UserContext = createContext();
const UserProvider = (props) => {
    const data_user = JSON.parse(window.localStorage.getItem('user'));
    const [user, setUser] = useState(data_user ? data_user : null);

    useEffect(() => {
        const string = JSON.stringify(user);
        localStorage.setItem('user',string)
    }, [user]); 

    return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>
};
export { UserContext, UserProvider };