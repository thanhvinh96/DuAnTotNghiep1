import React from 'react';
import { Outlet } from 'react-router-dom';
import FooterStyle2 from '../Footer/FooterStyle2';
import Header1 from '../Header1';

export default function Layout2() {
  return (
    <>
      <Header1 logoSrc="/images/img/anh1.png" variant="cs_white_color" />
      <Outlet />
      <FooterStyle2 />
    </>
  );
}
