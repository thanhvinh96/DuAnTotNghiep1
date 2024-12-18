import { Icon } from '@iconify/react';
import React from 'react';

export default function ContactInfoWidget() {
  return (
    <ul className="cs_contact_widget">
      <li>
        <i className="cs_accent_bg">
          <Icon icon="ep:location" />
        </i>
        Công Viên Phần Mềm Quang Trung
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="fluent:call-24-regular" />
        </i>
        0389219213
      </li>
      <li>
        <i className="cs_accent_bg">
          <Icon icon="bi:envelope" />
        </i>
        prohealth11022000@gmail.com
      </li>
    </ul>
  );
}
