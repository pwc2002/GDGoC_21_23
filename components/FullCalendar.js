import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
export default function FullCalendar() {
  const events = [
    { title: '회의', start: '2024-11-14T10:00:00', end: '2024-11-17T00:00:00' },
    { title: '프로젝트 마감', start: '2024-11-15' }
  ];

  return (
    <Calendar
    height='100%'
    plugins={[
        resourceTimelinePlugin,
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin
      ]}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth'
      }}
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
  );
}
