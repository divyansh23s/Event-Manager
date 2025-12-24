import api from '../api/axios';

/**
 * Notification Service
 * Handles all notification-related API calls
 */
class NotificationService {
  /**
   * Fetch notifications for the current user
   * @returns {Promise} Array of notifications
   */
  async getNotifications() {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error(
        error.response?.data?.message ||
        'Failed to fetch notifications'
      );
    }
  }

  /**
   * Get notification count for badge display
   * @returns {Promise} Object with count property
   */
  async getNotificationCount() {
    try {
      const response = await api.get('/notifications/count');
      return response.data;
    } catch (error) {
      console.error('Error fetching notification count:', error);
      // Return 0 count on error to avoid breaking the UI
      return { success: true, count: 0 };
    }
  }

  /**
   * Format time ago for display
   * @param {Date|string} date - Date to format
   * @returns {string} Formatted time string
   */
  formatTimeAgo(date) {
    const now = new Date();
    const pastDate = new Date(date);
    const diffInMs = now - pastDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

    return pastDate.toLocaleDateString();
  }

  /**
   * Format time until for upcoming events
   * @param {Date|string} date - Future date to format
   * @returns {string} Formatted time string
   */
  formatTimeUntil(date) {
    const now = new Date();
    const futureDate = new Date(date);
    const diffInMs = futureDate - now;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      if (diffInMinutes <= 0) return 'now';
      return `in ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    }
    if (diffInHours < 24) {
      return `in ${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
    }
    if (diffInDays < 7) {
      return `in ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
    }

    return futureDate.toLocaleDateString();
  }

  /**
   * Get appropriate icon for notification type
   * @param {string} type - Notification type
   * @returns {string} Icon emoji
   */
  getNotificationIcon(type) {
    const iconMap = {
      'event_created': '📅',
      'event_upcoming': '⏰',
      'event_soon': '🔔',
      'event_reminder': '⏰',
      'event_completed': '✅',
      'event_cancelled': '❌',
      'default': '📌'
    };

    return iconMap[type] || iconMap.default;
  }

  /**
   * Check if notification is urgent (should show badge)
   * @param {Object} notification - Notification object
   * @returns {boolean} True if urgent
   */
  isUrgentNotification(notification) {
    return notification.type === 'event_soon' ||
           notification.type === 'event_upcoming';
  }
}

// Export singleton instance
const notificationService = new NotificationService();
export default notificationService;
