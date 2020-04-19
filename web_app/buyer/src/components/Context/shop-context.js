import { createContext } from './node_modules/react';

export const ShopContext = createContext({
    search: "",
    searched: (searchText) => {}
});