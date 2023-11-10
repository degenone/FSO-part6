import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const App = () => {
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (anecdote) => await anecdoteService.update(anecdote),
        onSuccess: (updatedAnecdote) => {
            const anecdotes = client.getQueryData(['anecdotes']);
            client.setQueryData(
                ['anecdotes'],
                anecdotes.map((anecdote) =>
                    anecdote.id === updatedAnecdote.id
                        ? updatedAnecdote
                        : anecdote
                )
            );
        },
    });
    const handleVote = async (anecdote) => {
        await mutation.mutateAsync({
            ...anecdote,
            votes: anecdote.votes + 1,
        });
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
                <p>
                    Error: <code>{error.message}</code>
                </p>
            </div>
        );
    }

    const anecdotes = data.sort((a, b) => {
        if (a.votes < b.votes) {
            return 1;
        } else if (a.votes > b.votes) {
            return -1;
        }
        return 0;
    });

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
