// Notifications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './notification.css'; // Import CSS file
import InventoryNav from '../InventoryNav/InventoryNav'

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:8000/notification/display');
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        
        <div className="notifications-container">
          <InventoryNav/>
             <Link to={"/getstock"} className='back-button'><i className="fa-solid fa-hand-point-left"></i></Link>
            <h1 className="notifications-header">Stock Alert!!!</h1>
            <ul className="notification-list">
                {notifications.map(notification => (
                    <li key={notification._id} className="notification-item"><i  className="fa-solid fa-envelope"></i> {notification.message} </li> 
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
