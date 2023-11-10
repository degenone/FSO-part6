import { useReducer, createContext, useContext } from 'react';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'RESET':
            return null;
        default:
            return state;
    }
};

const NotificationContext = createContext();

const NotificationContextProvier = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(notificationReducer, null);
    return (
        <NotificationContext.Provider value={[state, dispatch]}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationState = () => {
    const context = useContext(NotificationContext);
    return context[0];
};

export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext);
    return context[1];
};

export default NotificationContextProvier;
