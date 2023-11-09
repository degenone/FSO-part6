import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createNew(state, action) {
            state.push(asObject(action.payload));
        },
        voteFor(state, action) {
            return state.map((a) =>
                a.id === action.payload ? { ...a, votes: a.votes + 1 } : a
            );
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { createNew, voteFor, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
