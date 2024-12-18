import React from 'react';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import BannerSectionStyle9 from '../Section/BannerSection/BannerSectionStyle9';
import Section from '../Section';
import GallerySectionStyle2 from '../Section/GallerySection/GallerySectionStyle2';
import { pageTitle } from '../../helpers/PageTitle';
const galleryData = [
  // { imgUrl: '/images/about/portfolio_4_lg.jpeg' },
  { imgUrl: '/images/img/prohealth1.png' },
  { imgUrl: '/images/img/prohealth2.png' },
  { imgUrl: '/images/img/prohealth3.png' },
  { imgUrl: '/images/img/prohealth4.png' },
  { imgUrl: '/images/img/prohealth5.png' },
  // { imgUrl: '/images/about/portfolio_4_lg.jpeg' },
];

export default function Gallery() {
  pageTitle('Gallery');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/about/banner_bg.svg"
        imgUrl="/images/img/prohealthgallery.png"
        title="Welcome to <br>ProHealth Gallery"
        subTitle="The special moment of our hospital"
      />
      <Section
        topMd={170}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <GallerySectionStyle2 data={galleryData} />
      </Section>
      <Section className="cs_footer_margin_0">
        <BannerSectionStyle9
          title="Don’t Let Your Health <br />Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced <br />medical professionals today!"
          imgUrl="images/doctors/banner_img_3.png"
        />
      </Section>
    </>
  );
}
