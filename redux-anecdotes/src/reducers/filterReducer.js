const filterReducer = (state = '', action) => {
    console.log('action', action);
    if (action.type === 'FILTER') {
        return action.payload;
    }
    return state;
};

export const filterBy = (value) => ({ type: 'FILTER', payload: value });

export default filterReducer;
