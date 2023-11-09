import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

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
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendNew(newAnecdote));
};

export const voteForAnecdote = (anecdote) => async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update({
        ...anecdote,
        votes: anecdote.votes + 1,
    });
    dispatch(voteFor(updatedAnecdote.id));
};

export default anecdoteSlice.reducer;
