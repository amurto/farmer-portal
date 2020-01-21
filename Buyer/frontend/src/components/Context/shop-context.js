import { createContext } from 'react';

export const ShopContext = createContext({
    search: "",
    searched: (searchText) => {}
});