import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import andecdoteService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAnecdotes = async () => {
            const anecdotes = await andecdoteService.getAll();
            dispatch(setAnecdotes(anecdotes));
        };
        fetchAnecdotes();
    }, [dispatch]);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
