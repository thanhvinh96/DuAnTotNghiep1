import React from 'react';
import { Link } from 'react-router-dom';

export default function IconBoxStyle11({ title, LinkTo}) {
  return (
    <div className="cs_iconbox cs_style_11 cs_radius_25">
      <div className="cs_iconbox_right">
        <Link to ={LinkTo}><button className="cs_iconbox_title cs_fs_24 mb-0">{title}</button></Link>
      </div>
    </div>
  );
}
