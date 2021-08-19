import {createContext, useEffect, useState} from 'react';
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false,
});

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [authReady, setAuthready] = useState(false);

    useEffect(() => {
        netlifyIdentity.on('login', (user) => {
            setUser(user);
            netlifyIdentity.close(); //close modal
            console.log("login event");
        });

        netlifyIdentity.on('logout', () => {
            setUser(null);
            console.log("logout event");
        });

        netlifyIdentity.on('init', (user) => {
            setUser(user);
            setAuthready(true);
            console.log('init event');
        });

        netlifyIdentity.init();

        return () => {
            netlifyIdentity.off('login');
            netlifyIdentity.off('logout');
        }
    }, []);

    const login = () => {
        netlifyIdentity.open();
    };

    const logout = () => {
        netlifyIdentity.logout();
    }

    const context = {user, login, logout, authReady}

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;