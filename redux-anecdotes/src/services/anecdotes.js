import axios from 'axios';

const URL = 'http://localhost:3001/anecdotes';

const getAll = async () => {
    const result = await axios.get(URL);
    return result.data;
};

const create = async (content) => {
    const result = await axios.post(URL, { content, votes: 0 });
    return result.data;
};

const update = async (anecdoteObj) => {
    const result = await axios.put(`${URL}/${anecdoteObj.id}`, anecdoteObj);
    return result.data;
};

export default { getAll, create, update };
