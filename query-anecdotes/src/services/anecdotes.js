import axios from 'axios';

const URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const res = await axios.get(URL);
    return res.data;
};

const create = async (content) => {
    const res = await axios.post(URL, {
        content,
        votes: 0,
    });
    return res.data;
};

export default { getAll, create };
