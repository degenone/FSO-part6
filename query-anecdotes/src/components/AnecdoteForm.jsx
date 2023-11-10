import { useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
    const client = useQueryClient();
    const mutation = useMutation({
        mutationFn: async (content) => await anecdoteService.create(content),
        onSuccess: (newAnecdote) => {
            const anecdotes = client.getQueryData(['anecdotes']);
            client.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        mutation.mutate(content);
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name='anecdote' />
                <button type='submit'>create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
