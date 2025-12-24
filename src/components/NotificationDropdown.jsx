import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationService from '../services/notificationService';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await notificationService.getNotifications();
      if (response.success) {
        setNotifications(response.notifications);
      } else {
        setError('Failed to load notifications');
      }
    } catch (err) {
      setError(err.message || 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.eventId) {
      // Navigate to event detail page
      navigate(`/events/${notification.eventId}`);
      onClose();
    }
  };

  const formatNotificationTime = (notification) => {
    if (notification.timeAgo) {
      return notification.timeAgo;
    }
    if (notification.timeUntil) {
      return notification.timeUntil;
    }
    if (notification.createdAt) {
      return notificationService.formatTimeAgo(notification.createdAt);
    }
    return '';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            Loading notifications...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchNotifications}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Try again
            </button>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No notifications yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Notifications will appear here when you create events or have upcoming events
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  notificationService.isUrgentNotification(notification)
                    ? 'bg-blue-50 border-l-4 border-l-blue-500'
                    : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">
                    {notification.icon || notificationService.getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatNotificationTime(notification)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => navigate('/events')}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View all events
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
