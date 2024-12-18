import { EventInput } from "@fullcalendar/core";
import React, { useEffect, useState } from "react";

// Hàm để lấy dữ liệu từ API
async function fetchEvents(): Promise<EventInput[]> {
  try {
    const response = await fetch("https://ehrmedical.online/api/schedule");
    const data = await response.json();

    // Chuyển đổi dữ liệu từ API thành EventInput cho FullCalendar
    const events: EventInput[] = data.map((event: any) => ({
      id: event.id.toString(),
      title: event.title || event.docter,
      start: new Date(event.start), // chuyển đổi start thành đối tượng Date nếu cần
      end: event.end ? new Date(event.end) : undefined, // nếu có end thì chuyển đổi thành Date
      className: event.className || "bg-default", // gán className mặc định nếu không có
    }));

    return events;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

// Lấy sự kiện mặc định từ API và xuất ra
let defaultEvents: EventInput[] = [];
fetchEvents().then((events) => {
  defaultEvents = events;
  console.log("Events fetched:", defaultEvents);
});

export { defaultEvents };
