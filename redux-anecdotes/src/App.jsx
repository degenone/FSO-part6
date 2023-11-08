import { useSelector, useDispatch } from 'react-redux';
import { createNew, voteFor } from './reducers/anecdoteReducer';
import { useState } from 'react';

const App = () => {
    const anecdotes = useSelector((state) =>
        state.sort((a, b) => {
            if (a.votes < b.votes) {
                return 1;
            } else if (a.votes > b.votes) {
                return -1;
            }
            return 0;
        })
    );
    const dispatch = useDispatch();
    const [anecdote, setAnecdote] = useState('');

    const addAnecdote = (e) => {
        e.preventDefault();
        if (!anecdote) return;
        dispatch(createNew(anecdote));
        setAnecdote('');
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(voteFor(anecdote.id))}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
            <h2>create new</h2>
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
        </div>
    );
};

export default App;
