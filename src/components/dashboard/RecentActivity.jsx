import { useState } from "react";

export default function RecentActivity({ activities }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleActivities = activities.slice(0, visibleCount);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity.</p>
      ) : (
        <ul className="space-y-3 text-xs text-gray-700">
          {visibleActivities.map((activity, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-gray-400">{activity.icon}</span>
              <div>
                <p>{activity.description}</p>
                <p className="text-gray-500 text-xs">{activity.timeAgo}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {visibleCount < activities.length && (
        <button
          onClick={loadMore}
          className="mt-4 text-blue-600 hover:underline text-xs"
        >
          Load more activities
        </button>
      )}
    </div>
  );
}
