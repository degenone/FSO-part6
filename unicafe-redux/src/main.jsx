import ReactDOM from 'react-dom/client';

import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
    const clickHandler = (action) => () => store.dispatch({ type: action });
    const style = {
        width: '20rem',
        padding: 5,
        marginInline: 'auto',
        marginBlockStart: '3rem',
        border: '1px solid black',
        display: 'grid',
        gap: '0.5rem',
        gridTemplateAreas: `
            'btn-g btn-o btn-b btn-z'
            'g . . .'
            'o . . .'
            'b . . .'
        `,
    };

    return (
        <div style={style}>
            <button
                style={{ gridArea: 'btn-g' }}
                onClick={clickHandler('GOOD')}>
                good
            </button>
            <button style={{ gridArea: 'btn-o' }} onClick={clickHandler('OK')}>
                ok
            </button>
            <button style={{ gridArea: 'btn-b' }} onClick={clickHandler('BAD')}>
                bad
            </button>
            <button
                style={{ gridArea: 'btn-z' }}
                onClick={clickHandler('ZERO')}>
                reset stats
            </button>
            <div style={{ gridArea: 'g' }}>
                good &mdash; {store.getState().good}
            </div>
            <div style={{ gridArea: 'o' }}>
                ok &mdash; {store.getState().ok}
            </div>
            <div style={{ gridArea: 'b' }}>
                bad &mdash; {store.getState().bad}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
    root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
