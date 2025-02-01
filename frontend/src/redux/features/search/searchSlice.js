import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    searchResults: [],
    isSearching: false
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setIsSearching: (state, action) => {
            state.isSearching = action.payload;
        },
        clearSearch: (state) => {
            state.searchTerm = '';
            state.searchResults = [];
            state.isSearching = false;
        }
    }
});

export const { setSearchTerm, setSearchResults, setIsSearching, clearSearch } = searchSlice.actions;
export default searchSlice.reducer; 