import React from "react";
import Hero from "../Hero";
import AboutSection from "../Section/AboutSection";
import BrandsSection from "../Section/BrandsSection";
import Banner from "../Section/BannerSection";
import Section from "../Section";
import FeaturesSection from "../Section/FeaturesSection";
import TestimonialSection from "../Section/TestimonialSection";
import BlogSection from "../Section/BlogSection";
import AppointmentSection from "../Section/AppointmentSection";
import FaqSection from "../Section/FaqSection";
import AwardSection from "../Section/AwardSection";
import DepartmentSection from "../Section/DepartmentSection";
import { pageTitle } from "../../helpers/PageTitle";
const featureListData = [
  {
    iconSrc: "/images/home_1/compassion.svg",
    title: "Empathy",
    subTitle:
      "We recognize that visiting a healthcare facility can often feel overwhelming and emotional. Our team is dedicated to fostering a warm, comforting atmosphere that reassures our patients and ensures they feel supported every step of the way.",
  },
  {
    iconSrc: "/images/home_1/excellence.svg",
    title: "Dedication",
    subTitle:
      "We are devoted to delivering outstanding healthcare services to our patients. We continuously seek to enhance our expertise, expand our knowledge, and optimize our resources, ensuring that our patients receive the highest standard of care at all times.",
  },
  {
    iconSrc: "/images/home_1/integrity.svg",
    title: "Integrity",
    subTitle:
      "We are committed to practicing medicine with honesty and ethical principles. Transparency is at the heart of our communication and decision-making, ensuring that our patients' well-being is always our top priority as we work to provide the best possible solutions for their needs.",
  },
  {
    iconSrc: "/images/home_1/respect.svg",
    title: "Respect",
    subTitle:
      "We believe that every individual deserves to be treated with respect and dignity, regardless of their background, beliefs, or circumstances. Our commitment is to honor each person's uniqueness and ensure they feel valued and understood throughout their care journey with us.",
  },
  {
    iconSrc: "/images/home_1/teamwork.svg",
    title: "Teamwork",
    subTitle:
      "We are dedicated to fostering a collaborative environment where our team members and other healthcare professionals work together seamlessly. By combining our strengths and expertise, we ensure that our patients receive comprehensive, coordinated, and effective care.",
  },
];
const brandData = [
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
  { imgUrl: "images/img/master.png", imgAlt: "Brand" },
];
const faqData = [
  {
    title: "What services does ProHealth offer?",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.",
  },
  {
    title: "How do I schedule an appointment with ProHealth?",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.",
  },
  {
    title: "Do you accept insurance?",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.",
  },
  {
    title: "What should I bring to my appointment?",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.",
  },
  {
    title: "How do I request a prescription refill?",
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesent voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui.",
  },
];
const blogData = [
  {
    title: "The Benefits of Mindfulness Meditation for Stress and Anxiety",
    thumbUrl: "images/img/benifes.png",
    date: "May 1, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
  {
    title: "Healthy Eating on a Budget: Tips and Strategies",
    thumbUrl: "images/img/eating.png",
    date: "May 4, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
  {
    title: "The Importance of Regular Cancer Screenings and Early Detection",
    thumbUrl: "images/img/impotance.png",
    date: "May 1, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
];
const awardData = [
  {
    title: "Malcolm Baldrige National Quality Award",
    subTitle:
      "This award recognizes healthcare organizations that have demonstrated excellence in leadership, strategic planning, customer and employee satisfaction, and operational efficiency.",
    iconUrl: "images/img/malcolm.png",
  },
  {
    title: "HIMSS Davies Award",
    subTitle:
      "This award recognizes healthcare organizations that have used health information technology to improve patient outcomes and reduce costs.",
    iconUrl: "images/img/himss.png",
  },
  {
    title: "Healthgrades National’s Best Hospital",
    subTitle:
      "This recognition is given to hospitals that have achieved high ratings for clinical quality and patient safety across multiple specialties and procedures.",
    iconUrl: "images/img/hospitalaward.png",
  },
  {
    title: "Joint Commission Gold Seal of Approval",
    subTitle:
      "This recognition is given to hospitals that have met rigorous standards for patient safety and quality of care.",
    iconUrl: "images/img/jaintgold.png",
  },
];
const departmentData = [
  {
    title: "Emergency Department",
    iconUrl: "images/home_1/department_icon_1.svg",
    href: "/departments/department-details",
  },
  {
    title: "Pediatric Departement",
    iconUrl: "images/home_1/department_icon_2.svg",
    href: "/departments/department-details",
  },
  {
    title: "Gynecology Department",
    iconUrl: "images/home_1/department_icon_3.svg",
    href: "/departments/department-details",
  },
  {
    title: "Cardiology Department",
    iconUrl: "images/home_1/department_icon_4.svg",
    href: "/departments/department-details",
  },
  {
    title: "Neurology Department",
    iconUrl: "images/home_1/department_icon_5.svg",
    href: "/departments/department-details",
  },
  {
    title: "Psychiatry Department",
    iconUrl: "images/home_1/department_icon_6.svg",
    href: "/departments/department-details",
  },
];

export default function Home() {
  pageTitle("Home");
  return (
    <>
      <Hero
        title="Your Partner in Health And Live"
        subTitle="We are committed to providing you with the best medical and healthcare services to help you live healthier and happier."
        bgUrl="/images/home_1/hero_bg.jpeg"
        imgUrl="/images/img/banner.png"
        videoBtnText="See how we work"
        videoUrl="https://www.youtube.com/embed/VcaAVWtP48A"
        infoList={[
          {
            title: "Hotline",
            subTitle: "0898389790",
            iconUrl: "/images/contact/icon_1.svg",
          },
          {
            title: "Ambulance",
            subTitle: "0389219213",
            iconUrl: "/images/icons/ambulance.svg",
          },
          {
            title: "Location",
            subTitle: "Công Viên Phần Mềm Quang Trung",
            iconUrl: "/images/icons/pin.svg",
          },
        ]}
        btnText="Book Now"
        btnUrl="/appointments"
      />
      {/* Start Feature Section */}
      <Section
        topMd={165}
        topLg={120}
        topXl={60}
        bottomMd={165}
        bottomLg={120}
        bottomXl={60}
      >
        <FeaturesSection sectionTitle="Our Values" data={featureListData} />
      </Section>
      {/* End Feature Section */}
      {/* Start About Section */}
      <Section>
        <AboutSection
          imgUrl="/images/img/teamdoctor.png"
          spiningImgUrl="/images/home_1/about_mini.svg"
          title="About Us"
          subTitle="PRO HEALTH"
          featureList={[
            {
              featureListTitle:
                "ProHealth is a team of experienced medical professionals",
              featureListSubTitle:
                "Dedicated to providing top-quality healthcare services. We believe in a holistic approach to healthcare that focuses on treating the whole person, not just the illness or symptoms.",
            },
          ]}
        />
      </Section>
      <Section topMd={185} topLg={150} topXl={60}>
        <DepartmentSection
          sectionTitle="Departments"
          bgUrl="images/home_1/department_bg.svg"
          data={departmentData}
        />
      </Section>
      <Section topMd={185} topLg={140} topXl={50}>
        <AwardSection sectionTitle="Departments" data={awardData} />
      </Section>
      <Section
        topMd={185}
        topLg={140}
        topXl={40}
        bottomMd={200}
        bottomLg={150}
        bottomXl={40}
      >
        <TestimonialSection
          sectionTitle="Some Reviews"
          sectionTitleDown="Of our clients"
        />
      </Section>
      <Section>
        <Banner
          bgUrl="images/home_1/cta_bg.svg"
          imgUrl="images/img/healthtake.png"
          title="Don’t Let Your Health Take a Backseat!"
          subTitle="Schedule an appointment with one of our experienced medical professionals today!"
        />
      </Section>
      <Section topMd={150} topLg={105} topXl={60}>
        <BlogSection
          sectionTitle="Latest Update"
          sectionTitleUp="BLOG POSTS"
          data={blogData}
        />
      </Section>
      <Section topMd={150} topLg={105} topXl={40} id="appointment">
        <AppointmentSection
          sectionTitle="Appointment"
          sectionTitleUp="BOOK AN"
          imgUrl="/images/img/background.png"
        />
      </Section>
      <Section topMd={150} topLg={105} topXl={40}>
        <FaqSection
          data={faqData}
          sectionTitle="Usually Asked"
          sectionTitleUp="What People"
        />
      </Section>
      <Section
        topMd={150}
        topLg={100}
        topXl={50}
        bottomMd={150}
        bottomLg={100}
        bottomXl={50}
      >
        <BrandsSection data={brandData} />
      </Section>
    </>
  );
}
