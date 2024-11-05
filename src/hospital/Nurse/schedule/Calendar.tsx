import React from "react";
import FullCalendar, { EventContentArg, EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi"; // Import ngôn ngữ tiếng Việt

interface CalendarProps {
  events: EventInput[];
  onDateClick: (dateInfo: any) => void;
  onEventClick: (clickInfo: any) => void;
  onDrop: (eventInfo: any) => void;
  onEventDrop: (eventInfo: any) => void;
}

const Calendar = ({
  events,
  onDateClick,
  onEventClick,
  onDrop,
  onEventDrop,
}: CalendarProps) => {
  const renderEventContent = (eventContent: EventContentArg) => {
    const { event } = eventContent;

    return (
      <div>
        <strong>{event.title}</strong>
      </div>
    );
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={onDateClick}
      eventClick={onEventClick}
      editable={true}
      droppable={true}
      drop={onDrop}
      eventDrop={onEventDrop}
      eventContent={renderEventContent} // Render custom event content
      locale={viLocale} // Đặt ngôn ngữ tiếng Việt
    />
  );
};

export default Calendar;
