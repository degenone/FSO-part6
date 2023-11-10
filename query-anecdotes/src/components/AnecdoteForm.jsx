import { useMutation, useQueryClient } from '@tanstack/react-query';
import anecdoteService from '../services/anecdotes';
import { useNotificationDispatch } from './NotificationContext';

const AnecdoteForm = () => {
    const client = useQueryClient();
    const notificationDispatch = useNotificationDispatch();
    const mutation = useMutation({
        mutationFn: async (content) => await anecdoteService.create(content),
        onSuccess: (newAnecdote) => {
            const anecdotes = client.getQueryData(['anecdotes']);
            client.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);
        },
    });

    const onCreate = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        await mutation.mutateAsync(content);
        notificationDispatch({
            type: 'SET',
            payload: `Added anecdote '${content}'.`,
        });
        setTimeout(() => notificationDispatch({ type: 'RESET' }), 5000);
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
