import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const orderByDesc = (a, b) => {
    if (a.votes < b.votes) {
        return 1;
    } else if (a.votes > b.votes) {
        return -1;
    }
    return 0;
};

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        const filter = state.filter.trim();
        if (filter) {
            return state.anecdotes
                .filter((a) => a.content.includes(filter))
                .sort(orderByDesc);
        }
        const filtered = [...state.anecdotes];
        return filtered.sort(orderByDesc);
    });
    const dispatch = useDispatch();
    const handleVote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote));
        dispatch(showNotification(`Voted for '${anecdote.content}'`, 5));
    };
    return (
        <div>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button
                            style={{ marginInlineStart: '0.5rem' }}
                            onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
