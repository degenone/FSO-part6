import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createNew } from '../reducers/anecdoteReducer';
import {
    removeNotification,
    setNotification,
} from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [anecdote, setAnecdote] = useState('');

    const addAnecdote = async (e) => {
        e.preventDefault();
        if (!anecdote) return;
        const newAnecdote = await anecdoteService.create({
            content: anecdote,
            votes: 0,
        });
        dispatch(createNew(newAnecdote));
        dispatch(setNotification(`Added new anecdote '${newAnecdote}'`));
        setAnecdote('');
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
    };
    return (
        <form
            onSubmit={addAnecdote}
            style={{ width: 'max-content', marginBlockStart: '0.5rem' }}>
            <fieldset>
                <legend>Create New</legend>
                <div>
                    <input
                        type='text'
                        name='anecdote'
                        id='anecdote'
                        value={anecdote}
                        onChange={({ target }) => setAnecdote(target.value)}
                    />
                </div>
                <button type='submit'>create</button>
            </fieldset>
        </form>
    );
};

export default AnecdoteForm;
