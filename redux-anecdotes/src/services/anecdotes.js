import axios from 'axios';

const URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const result = await axios.get(URL);
    return result.data;
};

const create = async (anecdoteObj) => {
    const result = await axios.post(URL, anecdoteObj);
    return result.data;
};

export default { getAll, create };
