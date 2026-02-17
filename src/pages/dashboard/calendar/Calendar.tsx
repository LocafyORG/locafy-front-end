import { useState } from 'react';
import { DashboardPageHeader } from '@layouts/DashboardLayout';
import { FaCalendarAlt, FaPlus, FaChevronLeft, FaChevronRight, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
  attendees?: string[];
  type: 'production' | 'location' | 'contact' | 'meeting';
  color: string;
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  // Mock events data
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Production Meeting',
      date: new Date(2024, 11, 15),
      time: '10:00 AM',
      location: 'Studio A',
      attendees: ['John Doe', 'Jane Smith'],
      type: 'production',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Location Scout',
      date: new Date(2024, 11, 18),
      time: '2:00 PM',
      location: 'Downtown District',
      type: 'location',
      color: 'bg-green-500'
    },
    {
      id: '3',
      title: 'Client Call',
      date: new Date(2024, 11, 20),
      time: '3:30 PM',
      attendees: ['Client ABC'],
      type: 'contact',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      title: 'Equipment Setup',
      date: new Date(2024, 11, 22),
      time: '9:00 AM',
      location: 'Studio B',
      type: 'production',
      color: 'bg-orange-500'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <DashboardPageHeader
        title="Calendar"
        buttons={[
          {
            children: (
              <span className="flex items-center gap-2">
                <FaPlus /> NEW EVENT
              </span>
            ),
            onClick: () => {},
            className: "flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          },
        ]}
      />

      <div className="max-w-7xl mx-auto mt-8">
        {/* Calendar Controls */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <FaChevronLeft className="text-gray-600 dark:text-gray-400" />
              </button>
              
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {formatMonthYear(currentDate)}
              </h2>
              
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
              >
                <FaChevronRight className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'month'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'week'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-lg transition ${
                  viewMode === 'day'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Day
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week day headers */}
            {weekDays.map(day => (
              <div
                key={day}
                className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : [];
              const isToday = day && day.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-gray-200 dark:border-gray-600 rounded-lg ${
                    isToday
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${
                        isToday
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {day.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <FaCalendarAlt className="text-blue-500 dark:text-blue-400 text-xl" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Upcoming Events</h3>
          </div>

          <div className="space-y-4">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map(event => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                >
                  <div className={`w-4 h-4 rounded-full ${event.color}`}></div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <div className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {event.time}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-xs" />
                          {event.location}
                        </div>
                      )}
                      {event.attendees && (
                        <div className="flex items-center gap-1">
                          <FaUsers className="text-xs" />
                          {event.attendees.length} attendees
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {event.date.toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

