import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Newpassword } from "../../controller/MedicalController";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

// components
import { VerticalForm, FormInput } from "../../components";
import AuthLayout from "./AuthLayout";
import userImg from "../../assets/images/users/user-1.jpg";

interface UserData {
  otp: string;
  password: string;
}

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();
  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-white-50">
          {t("Không phải bạn? quay lại")}{" "}
          <Link to={"/auth/login"} className="text-white ms-1">
            <b>{t("Đăng nhập")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const LockScreen = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Lấy giá trị từ URL
  const queryParams = new URLSearchParams(location.search);
  const medical = queryParams.get("medical") || "Không có giá trị";

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      otp: yup
        .string()
        .length(4, t("Mã xác nhận phải gồm 4 chữ số"))
        .matches(/^[0-9]{4}$/, t("Mã xác nhận chỉ bao gồm 4 chữ số"))
        .required(t("Vui lòng nhập mã xác nhận")),
      password: yup
        .string()
        .min(6, t("Mật khẩu phải có ít nhất 6 ký tự"))
        .required(t("Vui lòng nhập mật khẩu mới")),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = async (formData: UserData) => {
    const MySwal = withReactContent(Swal);

    try {
      const data = {
        cccd: medical,
        verificationCode: formData.otp,
        newpassword: formData.password,
      };

      console.log("Dữ liệu gửi đi:", data);

      // Gọi API đặt lại mật khẩu
      const res = await Newpassword(data);

      if (res && res.success) {
        await MySwal.fire({
          icon: "success",
          title: t("Đặt lại mật khẩu thành công"),
          text: t("Bạn có thể đăng nhập bằng mật khẩu mới."),
        });
        window.location.href = "/LoginP"; // Chuyển hướng
      } else {
        await MySwal.fire({
          icon: "error",
          title: t("Lỗi"),
          text: res?.message || t("Đã có lỗi xảy ra. Vui lòng thử lại sau."),
        });
      }
    } catch (error) {
      console.error("Lỗi khi đặt lại mật khẩu:", error);
      await MySwal.fire({
        icon: "error",
        title: t("Đã có lỗi xảy ra"),
        text: t("Không thể kết nối đến máy chủ. Vui lòng thử lại sau."),
      });
    }
  };

  return (
    <>
      <AuthLayout bottomLinks={<BottomLink />}>
        <div className="text-center w-75 m-auto">
          <img
            src={userImg}
            alt=""
            height="88"
            className="rounded-circle shadow"
          />
          <h4 className="text-dark-50 text-center mt-3">{t("Chào! Quý Khách")}</h4>
          <p className="text-muted mb-4">
            {t("Nhập mã xác nhận 4 chữ số và mật khẩu mới để tiếp tục.")}
          </p>
        </div>

        <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label={t("Mã xác nhận")}
            type="text"
            name="otp"
            placeholder={t("Nhập mã xác nhận 4 chữ số")}
            containerClass={"mb-3"}
            maxLength={4}
          />

          <FormInput
            label={t("Mật khẩu mới")}
            type="password"
            name="password"
            placeholder={t("Nhập mật khẩu mới")}
            containerClass={"mb-3"}
          />

          <div className="d-grid text-center">
            <Button variant="primary" type="submit">
              {t("Đặt lại mật khẩu")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default LockScreen;
