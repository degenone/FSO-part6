import { createSlice } from '@reduxjs/toolkit';
import andecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendNew(state, action) {
            state.push(action.payload);
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

export const { appendNew, voteFor, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
    const anecdotes = await andecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
    const newAnecdote = await andecdoteService.create(content);
    dispatch(appendNew(newAnecdote));
};

export default anecdoteSlice.reducer;
