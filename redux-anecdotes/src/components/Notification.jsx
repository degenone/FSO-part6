import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);
    const style = {
        border: 'solid',
        padding: 10,
        marginBlockEnd: 5,
        borderWidth: 1,
    };
    if (!notification.trim()) return;
    return <div style={style}>{notification}</div>;
};

export default Notification;
