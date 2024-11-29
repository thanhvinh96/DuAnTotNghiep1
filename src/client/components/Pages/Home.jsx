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
    title: "Đồng cảm",
    subTitle:
      "Chúng tôi nhận thấy rằng việc đến cơ sở y tế thường có thể khiến bạn cảm thấy quá tải và xúc động. Đội ngũ của chúng tôi luôn tận tâm tạo ra một không gian ấm áp và thoải mái để trấn an và đảm bảo rằng bệnh nhân luôn cảm thấy được hỗ trợ trên từng bước đường.",
  },
  {
    iconSrc: "/images/home_1/excellence.svg",
    title: "Tận tâm",
    subTitle:
      "Chúng tôi luôn nỗ lực cung cấp dịch vụ chăm sóc sức khỏe vượt trội cho bệnh nhân. Chúng tôi không ngừng nâng cao chuyên môn, mở rộng kiến thức và tối ưu hóa các nguồn lực, đảm bảo rằng bệnh nhân luôn nhận được sự chăm sóc đạt tiêu chuẩn cao nhất.",
  },
  {
    iconSrc: "/images/home_1/integrity.svg",
    title: "Chính trực",
    subTitle:
      "Chúng tôi cam kết thực hành y tế với sự trung thực và các nguyên tắc đạo đức. Minh bạch là trọng tâm trong giao tiếp và ra quyết định của chúng tôi, đảm bảo rằng sức khỏe của bệnh nhân luôn là ưu tiên hàng đầu khi chúng tôi làm việc để mang lại những giải pháp tốt nhất cho nhu cầu của họ.",
  },
  {
    iconSrc: "/images/home_1/respect.svg",
    title: "Tôn trọng",
    subTitle:
      "Chúng tôi tin rằng mọi cá nhân đều xứng đáng được đối xử với sự tôn trọng và nhân phẩm, bất kể xuất thân, niềm tin hay hoàn cảnh. Cam kết của chúng tôi là tôn vinh sự độc đáo của mỗi người và đảm bảo họ cảm thấy được trân trọng và thấu hiểu trong suốt hành trình chăm sóc cùng chúng tôi.",
  },
  {
    iconSrc: "/images/home_1/teamwork.svg",
    title: "Hợp tác",
    subTitle:
      "Chúng tôi tận tâm xây dựng một môi trường hợp tác, nơi các thành viên trong đội ngũ và các chuyên gia y tế làm việc cùng nhau một cách nhịp nhàng. Bằng cách kết hợp sức mạnh và chuyên môn, chúng tôi đảm bảo rằng bệnh nhân nhận được sự chăm sóc toàn diện, phối hợp và hiệu quả.",
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
    title: "Lợi Ích Của Thiền Chánh Niệm Đối Với Căng Thẳng Và Lo Âu",
    thumbUrl: "images/img/benifes.png",
    date: "May 1, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
  {
    title: "Ăn Uống Lành Mạnh Với Ngân Sách Hạn Chế: Mẹo Và Chiến Lược",
    thumbUrl: "images/img/eating.png",
    date: "May 4, 2023",
    btnText: "Learn More",
    href: "/blog/blog-details",
    socialShare: true,
  },
  {
    title: "Tầm Quan Trọng Của Việc Sàng Lọc Ung Thư Định Kỳ Và Phát Hiện Sớm",
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
      "Giải thưởng tôn vinh các tổ chức y tế đã thể hiện sự xuất sắc trong lãnh đạo, lập kế hoạch chiến lược, sự hài lòng của khách hàng và nhân viên, và hiệu quả vận hành.",
    iconUrl: "images/img/malcolm.png",
  },
  {
    title: "HIMSS Davies Award",
    subTitle:
      "Giải thưởng này tôn vinh các tổ chức y tế đã sử dụng công nghệ thông tin y tế để cải thiện kết quả điều trị cho bệnh nhân và giảm chi phí.",
    iconUrl: "images/img/himss.png",
  },
  {
    title: "Healthgrades National’s Best Hospital",
    subTitle:
      "Sự công nhận này được trao cho các bệnh viện đạt điểm cao về chất lượng lâm sàng và an toàn bệnh nhân trong nhiều chuyên khoa và thủ thuật.",
    iconUrl: "images/img/hospitalaward.png",
  },
  {
    title: "Joint Commission Gold Seal of Approval",
    subTitle:
      "Sự công nhận này được trao cho các bệnh viện đã đáp ứng các tiêu chuẩn nghiêm ngặt về an toàn bệnh nhân và chất lượng chăm sóc.",
    iconUrl: "images/img/jaintgold.png",
  },
];
const departmentData = [
  {
    title: "Khoa Cấp Cứu",
    iconUrl: "images/home_1/department_icon_1.svg",
    href: "/departments/department-details",
  },
  {
    title: "Khoa Nhi",
    iconUrl: "images/home_1/department_icon_2.svg",
    href: "/departments/department-details",
  },
  {
    title: "Khoa Sản",
    iconUrl: "images/home_1/department_icon_3.svg",
    href: "/departments/department-details",
  },
  {
    title: "Khoa Tim Mạch",
    iconUrl: "images/home_1/department_icon_4.svg",
    href: "/departments/department-details",
  },
  {
    title: "Khoa Thần Kinh",
    iconUrl: "images/home_1/department_icon_5.svg",
    href: "/departments/department-details",
  },
  {
    title: "Khoa Tâm Thần",
    iconUrl: "images/home_1/department_icon_6.svg",
    href: "/departments/department-details",
  },
];

export default function Home() {
  pageTitle("Home");
  return (
    <>
      <Hero
        title="Đồng Hành Vì Sức Khỏe Của Bạn"
        subTitle="Chúng tôi cam kết mang đến dịch vụ y tế tốt nhất giúp bạn sống khỏe mạnh và hạnh phúc"
        bgUrl="/images/home_1/hero_bg.jpeg"
        imgUrl="/images/img/Blue Modern School Logo.png"
        videoBtnText="Xem cách chúng tôi làm việc"
        videoUrl="https://www.youtube.com/embed/VcaAVWtP48A"
        infoList={[
          {
            title: "Liên hệ",
            subTitle: "0898389790",
            iconUrl: "/images/contact/icon_1.svg",
          },
          {
            title: "Khẩn cấp",
            subTitle: "0389219213",
            iconUrl: "/images/icons/ambulance.svg",
          },
          {
            title: "Địa chỉ",
            subTitle: "Công Viên Phần Mềm Quang Trung",
            iconUrl: "/images/icons/pin.svg",
          },
        ]}
        btnText="Đặt lịch hẹn"
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
        <FeaturesSection
          sectionTitle="Giá Trị Cốt Lõi"
          data={featureListData}
        />
      </Section>
      {/* End Feature Section */}
      {/* Start About Section */}
      <Section>
        <AboutSection
          imgUrl="/images/img/teamdoctor.png"
          spiningImgUrl="/images/home_1/about_mini.svg"
          title="Về Chúng Tôi"
          subTitle="PRO HEALTH"
          featureList={[
            {
              featureListTitle:
                "ProHealth là một nhóm các chuyên gia y tế có kinh nghiệm",
              featureListSubTitle:
                "Tận tâm cung cấp dịch vụ y tế chất lượng cao. chúng tôi tin vào phương pháp chăm sóc toàn diện, tập trung vào việc điều trị cả con người, không chỉ bệnh tật hay triệu chứng.",
            },
          ]}
        />
      </Section>
      <Section topMd={185} topLg={150} topXl={60}>
        <DepartmentSection
          sectionTitle="Chuyên Khoa"
          bgUrl="images/home_1/department_bg.svg"
          data={departmentData}
        />
      </Section>
      <Section topMd={185} topLg={140} topXl={50}>
        <AwardSection sectionTitle="Danh Hiệu" data={awardData} />
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
          sectionTitle="Đánh Giá"
          sectionTitleDown="Của Khách Hàng"
        />
      </Section>
      <Section>
        <Banner
          bgUrl="images/home_1/cta_bg.svg"
          imgUrl="images/img/healthtake.png"
          title="Đừng Để Sức Khỏe Của Bạn Bị Bỏ Quên!"
          subTitle="Hãy Đặt Lịch Hẹn Với Một Trong Những Chuyên Gia Y Tế Kinh Nghiệm Của Chúng Tôi Ngay Hôm Nay!"
        />
      </Section>
      <Section topMd={150} topLg={105} topXl={60}>
        <BlogSection
          sectionTitle="Cập nhật mới nhất"
          sectionTitleUp="Tin Tức"
          data={blogData}
        />
      </Section>
      <Section topMd={150} topLg={105} topXl={40} id="appointment">
        <AppointmentSection
          sectionTitle="Lịch Hẹn"
          sectionTitleUp="ĐẶT"
          imgUrl="/images/img/background.png"
        />
      </Section>
      {/* <Section topMd={150} topLg={105} topXl={40}>
        <FaqSection
          data={faqData}
          sectionTitle="Usually Asked"
          sectionTitleUp="What People"
        />
      </Section> */}
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
