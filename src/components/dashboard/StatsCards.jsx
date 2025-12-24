export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Total Events</p>
          <p className="text-xl font-bold">{stats.totalEvents}</p>
          <p className="text-xs text-green-600">{stats.totalEventsChange} from last month</p>
        </div>
        <div className="bg-blue-500 p-2 rounded">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top binding rings */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4" />
  
            {/* Calendar outer box */}
            <rect x="3" y="6" width="18" height="15" rx="2" ry="2" stroke="currentColor" />

            {/* Divider line (header section) */}
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" />

            {/* Date dots */}
            <circle cx="7" cy="14" r="1" fill="currentColor" />
            <circle cx="12" cy="14" r="1" fill="currentColor" />
            <circle cx="17" cy="14" r="1" fill="currentColor" />
            <circle cx="7" cy="18" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
            <circle cx="17" cy="18" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Upcoming Events</p>
          <p className="text-xl font-bold">{stats.upcomingEvents}</p>
          <p className="text-xs text-green-600">{stats.upcomingEventsChange} from last month</p>
        </div>
        <div className="bg-green-500 p-2 rounded">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top binding rings */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4" />
  
            {/* Calendar outer box */}
            <rect x="3" y="6" width="18" height="15" rx="2" ry="2" stroke="currentColor" />

            {/* Divider line (header section) */}
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" />

            {/* Date dots */}
            <circle cx="7" cy="14" r="1" fill="currentColor" />
            <circle cx="12" cy="14" r="1" fill="currentColor" />
            <circle cx="17" cy="14" r="1" fill="currentColor" />
            <circle cx="7" cy="18" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
            <circle cx="17" cy="18" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Past Events</p>
          <p className="text-xl font-bold">{stats.pastEvents}</p>
          <p className="text-xs text-green-600">{stats.pastEventsChange} from last month</p>
        </div>
        <div className="bg-purple-500 p-2 rounded">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top binding rings */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4" />
  
            {/* Calendar outer box */}
            <rect x="3" y="6" width="18" height="15" rx="2" ry="2" stroke="currentColor" />

            {/* Divider line (header section) */}
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" />

            {/* Date dots */}
            <circle cx="7" cy="14" r="1" fill="currentColor" />
            <circle cx="12" cy="14" r="1" fill="currentColor" />
            <circle cx="17" cy="14" r="1" fill="currentColor" />
            <circle cx="7" cy="18" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
            <circle cx="17" cy="18" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">This Month</p>
          <p className="text-xl font-bold">{stats.thisMonth}</p>
          <p className="text-xs text-green-600">{stats.thisMonthChange} from last month</p>
        </div>
        <div className="bg-orange-500 p-2 rounded">
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top binding rings */}
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4" />
  
            {/* Calendar outer box */}
            <rect x="3" y="6" width="18" height="15" rx="2" ry="2" stroke="currentColor" />

            {/* Divider line (header section) */}
            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" />

            {/* Date dots */}
            <circle cx="7" cy="14" r="1" fill="currentColor" />
            <circle cx="12" cy="14" r="1" fill="currentColor" />
            <circle cx="17" cy="14" r="1" fill="currentColor" />
            <circle cx="7" cy="18" r="1" fill="currentColor" />
            <circle cx="12" cy="18" r="1" fill="currentColor" />
            <circle cx="17" cy="18" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
