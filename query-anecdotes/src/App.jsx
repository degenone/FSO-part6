import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes';
import { useQuery } from '@tanstack/react-query';

const App = () => {
    const handleVote = (anecdote) => {
        console.log('vote');
    };

    const { data, isError, error, isPending } = useQuery({
        queryKey: ['anecdotes'],
        queryFn: async () => await anecdoteService.getAll(),
        retry: 1,
    });

    if (isPending) {
        return <div>Loading data...</div>;
    }

    if (isError) {
        return (
            <div>
                <p>
                    Anecdote service not available due to problems in the
                    server.
                </p>
                <p>Error: <code>{error.message}</code></p>
            </div>
        );
    }

    const anecdotes = data;

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
