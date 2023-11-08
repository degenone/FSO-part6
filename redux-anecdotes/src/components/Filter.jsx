import { useDispatch, useSelector } from 'react-redux';
import { filterBy } from '../reducers/filterReducer';

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);
    return (
        <div style={{ marginBlockEnd: '0.75rem' }}>
            <label htmlFor='filter'>Filter anecdotes:</label>
            <input
                type='text'
                name='filter'
                id='filter'
                value={filter}
                onChange={({ target }) => dispatch(filterBy(target.value))}
            />
            <button type='button' onClick={() => dispatch(filterBy(''))}>
                x
            </button>
        </div>
    );
};

export default Filter;
