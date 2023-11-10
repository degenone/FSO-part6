import axios from 'axios';

const URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const res = await axios.get(URL);
    return res.data;
};

export default { getAll };
