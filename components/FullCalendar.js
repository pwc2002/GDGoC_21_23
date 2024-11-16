import { useRef } from 'react';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import koLocale from '@fullcalendar/core/locales/ko';

export default function FullCalendar() {
  const calendarRef = useRef(null);
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const calendarApi = calendarRef.current.getApi();

    if (touchStartX.current - touchEndX > 50) {
      // 왼쪽으로 스와이프하면 다음 달로 이동
      calendarApi.next();
    } else if (touchEndX - touchStartX.current > 50) {
      // 오른쪽으로 스와이프하면 이전 달로 이동
      calendarApi.prev();
    }
  };

  const events = [
    { title: '회의', start: '2024-11-14T10:00:00', end: '2024-11-17T00:00:00' },
    { title: '프로젝트 마감', start: '2024-11-15' }
  ];

  return (
    <div
      className='w-full h-full'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Calendar
        ref={calendarRef}
        locale={koLocale}
        height='100%'
        plugins={[
          resourceTimelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin
        ]}
        headerToolbar={{
          left: 'title',
          center: '',
          right: ''
        }}
        titleFormat={{ month: 'long' }}
        initialView='dayGridMonth'
        nowIndicator={true}
        editable={true}
        selectable={true}
        dayMaxEvents={true}
        selectMirror={true}
        resources={[
          { id: 'a', title: 'Auditorium A' },
          { id: 'b', title: 'Auditorium B', eventColor: 'green' },
          { id: 'c', title: 'Auditorium C', eventColor: 'orange' },
        ]}
        initialEvents={[
          { title: 'nice event', start: '2024-11-14', end: '2024-11-17', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-14', end: '2024-11-17', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-14', end: '2024-11-17', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-14', end: '2024-11-17', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-14', end: '2024-11-17', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-21', end: '2024-11-24', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-21', end: '2024-11-24', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-21', end: '2024-11-24', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-21', end: '2024-11-24', resourceId: 'a' },
          { title: 'nice event', start: '2024-11-21', end: '2024-11-24', resourceId: 'a' }
        ]}
      />
    </div>
  );
}
