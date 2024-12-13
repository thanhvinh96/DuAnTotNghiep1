import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import "@fullcalendar/react";
import { DateClickArg, Draggable } from "@fullcalendar/interaction";
import { EventClickArg, EventInput } from "@fullcalendar/core";

// các thành phần
import TieuDeTrang from "../../../components/PageTitle";
import Lich from "./Calendar";
import ThemSuaSuKien from "./AddEditEvent";
const getQueryParam = (param:any) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

// Hàm để lấy dữ liệu từ API
async function laySuKien(): Promise<EventInput[]> {
  try {
    const medical  = getQueryParam('medical')
    const _response = await fetch("https://ehrmedical.online/api/medical/cccd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cccd: medical })
    });
    // console.log(_response);
    const _data: any = await _response.json();
    console.log(_data.data.medicalRecordCode);
    const response = await fetch("https://ehrmedical.online/api/schedule",{
      method:"post",
      headers:{
        "Content-Type": "application/json"

      },
      body: JSON.stringify({ patient: _data.data.medicalRecordCode })

    });
    const data = await response.json();

    // Chuyển đổi dữ liệu từ API thành EventInput cho FullCalendar
    const suKien: EventInput[] = data.map((event: any) => ({
      id: event.id ? event.id.toString() : "",
      title: `${event.title || ""} - ${event.doctor || ""}` || "Không có tiêu đề",
      start: event.timeschedule,
      className:  "bg-success"    }));

    return suKien;
  } catch (error) {
    console.error("Không thể lấy sự kiện:", error);
    return [];
  }
}

const UngDungLich = () => {
  const [hienThi, setHienThi] = useState<boolean>(false);
  const [coTheChinhSua, setCoTheChinhSua] = useState<boolean>(false);
  const [suKien, setSuKien] = useState<EventInput[]>([]);
  const [duLieuSuKien, setDuLieuSuKien] = useState<EventInput>({});
  const [thongTinNgay, setThongTinNgay] = useState<any>({});

  useEffect(() => {
    laySuKien().then((suKienLayDuoc) => {
      setSuKien(suKienLayDuoc);
    });
  }, []);

  const dongModal = () => {
    setHienThi(false);
    setDuLieuSuKien({});
    setThongTinNgay({});
  };

  const moModal = () => setHienThi(true);

  const khiClickNgay = (arg: DateClickArg) => {
    setThongTinNgay(arg);
    moModal();
    setCoTheChinhSua(false);
  };

  const khiClickSuKien = (arg: EventClickArg) => {
    const suKien = {
      id: String(arg.event.id),
      title: arg.event.title,
      className: arg.event.classNames[0],
    };
    setDuLieuSuKien(suKien);
    setCoTheChinhSua(true);
    moModal();
  };

  const khiKeoTha = (arg: any) => {
    const title = arg.draggedEl.title;
    if (title) {
      const suKienMoi = {
        id: String(suKien.length + 1),
        title,
        start: arg.dateStr,
        className: arg.draggedEl.attributes["data-class"].value,
      };
      setSuKien([...suKien, suKienMoi]);
    }
  };

  const themSuKien = (data: any) => {
    const suKienMoi = {
      id: String(suKien.length + 1),
      title: data.title,
      start: thongTinNgay.date || new Date(),
      className: data.className,
    };
    setSuKien([...suKien, suKienMoi]);
    dongModal();
  };

  const capNhatSuKien = (data: any) => {
    const suKienCapNhat = suKien.map((e) =>
      e.id === duLieuSuKien.id ? { ...e, title: data.title, className: data.className } : e
    );
    setSuKien(suKienCapNhat);
    dongModal();
    setCoTheChinhSua(false);
  };

  const xoaSuKien = () => {
    const suKienCapNhat = suKien.filter((e) => e.id !== duLieuSuKien.id);
    setSuKien(suKienCapNhat);
    dongModal();
  };

  const khiThaSuKien = (arg: any) => {
    const suKienCapNhat = suKien.map((e) =>
      e.id === arg.event.id
        ? { ...e, start: arg.event.start, end: arg.event.end, className: arg.event.classNames[0] }
        : e
    );
    setSuKien(suKienCapNhat);
  };

  return (
    <>
      <TieuDeTrang
        breadCrumbItems={[
          { label: "Ứng dụng", path: "/apps/calendar" },
          { label: "Lịch", path: "/apps/calendar", active: true },
        ]}
        title={"Lịch"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={12}>
                  <Button
                    className="btn btn-lg font-16 btn-primary w-100"
                    id="btn-new-event"
                    onClick={moModal}
                  >
                    <i className="mdi mdi-plus-circle-outline"></i> Tạo sự kiện mới
                  </Button>

                  <Lich
                    onDateClick={khiClickNgay}
                    onEventClick={khiClickSuKien}
                    onDrop={khiKeoTha}
                    onEventDrop={khiThaSuKien}
                    events={suKien}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {hienThi && (
        <ThemSuaSuKien
          isOpen={hienThi}
          onClose={dongModal}
          isEditable={coTheChinhSua}
          eventData={duLieuSuKien}
          onUpdateEvent={capNhatSuKien}
          onRemoveEvent={xoaSuKien}
          onAddEvent={themSuKien}
        />
      )}
    </>
  );
};

export default UngDungLich;
