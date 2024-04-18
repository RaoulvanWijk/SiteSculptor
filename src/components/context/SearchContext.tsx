'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    executeSearch: string;
    triggerSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [executeSearch, setExecuteSearch] = useState('');

    const triggerSearch = () => {
        setExecuteSearch(searchTerm);
    };

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm, executeSearch, triggerSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
};
