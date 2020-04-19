import { createContext } from './node_modules/react';

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});