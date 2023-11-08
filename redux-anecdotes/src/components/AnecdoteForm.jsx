import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { createNew } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const [anecdote, setAnecdote] = useState('');

    const addAnecdote = (e) => {
        e.preventDefault();
        if (!anecdote) return;
        dispatch(createNew(anecdote));
        setAnecdote('');
    };
    return (
        <form onSubmit={addAnecdote}>
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
        </form>
    );
};

export default AnecdoteForm;
