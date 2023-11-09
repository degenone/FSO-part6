import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [anecdote, setAnecdote] = useState('');

    const addAnecdote = async (e) => {
        e.preventDefault();
        if (!anecdote) return;
        dispatch(createAnecdote(anecdote));
        dispatch(showNotification(`Added new anecdote '${anecdote}'`, 5));
        setAnecdote('');
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
