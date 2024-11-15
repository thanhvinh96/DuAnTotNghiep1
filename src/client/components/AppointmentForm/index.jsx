import { Icon } from "@iconify/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <form action="#" className="row">
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Họ và Tên</label>
        <input type="text" className="cs_form_field" placeholder="David John" />
        <div className="cs_height_42 cs_height_xl_15" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Số điện thoại</label>
        <input type="text" className="cs_form_field" placeholder="(+84)" />
        <div className="cs_height_42 cs_height_xl_15" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">
          Số bảo hiểm y tế
        </label>
        <input type="text" className="cs_form_field" placeholder="" />
        <div className="cs_height_42 cs_height_xl_15" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Đặt ngày</label>

        <div className="cs_with_icon_input">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            isClearable
            placeholderText="dd/mm/yyyy"
          />
          <i>
            <Icon icon="fa6-solid:calendar-days" />
          </i>
        </div>
        <div className="cs_height_42 cs_height_xl_15" />
      </div>
      <div className="col-lg-6">
        <label className="cs_input_label cs_heading_color">Đặt giờ</label>
        <div className="cs_with_icon_input ">
          <input
            type="time"
            className="cs_form_field cs_timepicker"
            placeholder=""
          />
          <i>
            <Icon icon="fa6-regular:clock" />
          </i>
        </div>
        <div className="cs_height_42 cs_height_xl_15" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">
          Lý do thăm khám
        </label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="routineCheckup"
              defaultValue="routineCheckup"
            />
            <label className="cs_radio_label" htmlFor="routineCheckup">
              Khám Sức Khỏe Định Kỳ
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="newPatientVisit"
              defaultValue="newPatientVisit"
              defaultChecked=""
            />
            <label className="cs_radio_label" htmlFor="newPatientVisit">
              Khám Bệnh Nhân Mới
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="reasonForVisit"
              id="specificConcern"
              defaultValue="specificConcern"
            />
            <label className="cs_radio_label" htmlFor="specificConcern">
              Vấn Đề Cụ Thể
            </label>
          </div>
        </div>
        <div className="cs_height_42 cs_height_xl_15" />
      </div>
      <div className="col-lg-12">
        <label className="cs_input_label cs_heading_color">Khoa khám</label>
        <div className="cs_radio_group">
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="pediatric"
              defaultValue="pediatric"
            />
            <label className="cs_radio_label" htmlFor="pediatric">
              Nhi Khoa
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="obstetricsGynecology"
              defaultValue="obstetricsGynecology"
              defaultChecked=""
            />
            <label className="cs_radio_label" htmlFor="obstetricsGynecology">
              Sản Phụ Khoa
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="cardiology"
              defaultValue="cardiology"
            />
            <label className="cs_radio_label" htmlFor="cardiology">
              Tim Mạch
            </label>
          </div>
          <div className="cs_radio_wrap">
            <input
              className="cs_radio_input"
              type="radio"
              name="department"
              id="neurology"
              defaultValue="neurology"
            />
            <label className="cs_radio_label" htmlFor="neurology">
              Thần Kinh
            </label>
          </div>
        </div>
        <div className="cs_height_42 cs_height_xl_15" />
      </div>
      <div className="col-lg-12">
        <button className="cs_btn cs_style_1">
          <span>Đặt</span>
          <i>
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
            <img src="/images/icons/arrow_white.svg" alt="Icon" />
          </i>
        </button>
      </div>
    </form>
  );
}
