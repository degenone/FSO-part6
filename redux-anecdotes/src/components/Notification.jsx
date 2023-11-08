import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setNotification } from '../reducers/notificationReducer';

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    const disptach = useDispatch();
    useEffect(() => {
        disptach(setNotification('Test notification'));
        setTimeout(() => {
            disptach(setNotification(''));
        }, 5000);
    }, [disptach]);
    const style = {
        border: 'solid',
        width: 'max-content',
        padding: 10,
        marginBlockEnd: 5,
        borderWidth: 1,
    };
    if (!notification.trim()) return;
    return <div style={style}>{notification}</div>;
};

export default Notification;
