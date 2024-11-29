import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Forgotpassword } from "../../controller/MedicalController";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

// actions
import { resetAuth, forgotPassword } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components";

import AuthLayout from "./AuthLayout";

interface UserData {
  username: string;
}

/* liên kết dưới */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        {t("Quay lại")}{" "}
        <Link to={"/auth/login2"} className="text-muted ms-1">
          <b>{t("Đăng nhập")}</b>
        </Link>
      </p>
    </footer>
  );
};

const ForgetPassword2 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, passwordReset, resetPasswordSuccess, error } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      resetPasswordSuccess: state.Auth.resetPasswordSuccess,
      error: state.Auth.error,
      passwordReset: state.Auth.passwordReset,
    })
  );

  /*
   * sơ đồ xác thực form
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      username: yup.string().required(t("Vui lòng nhập Căn cước công dân")),
    })
  );

  /*
   * xử lý khi gửi form
   */
  const onSubmit = async (formData: UserData) => {
    // Lấy giá trị căn cước công dân từ formData
    console.log("Căn cước công dân: ", formData.username);

    const data = {
      cccd: formData.username,
    };

    try {
      const res = await Forgotpassword(data); // Gọi API

      if (res.success) {
        // Tạo modal thông báo thành công
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: "success",
          title: t("Yêu cầu đặt lại mật khẩu thành công"),
          text: t("Chúng tôi đã gửi hướng dẫn đến Số điện thoại của bạn"),
        });
        window.location.href = "/medical/auth/reset-password?medical=" + formData.username;
      } else {
        // Nếu có lỗi từ API, thông báo lỗi
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          icon: "error",
          title: t("Đã có lỗi xảy ra"),
          text: res.message || t("Vui lòng thử lại sau."),
        });
      }
    } catch (error) {
      console.error(error);
      // Nếu có lỗi trong quá trình gọi API
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "error",
        title: t("Đã có lỗi xảy ra"),
        text: t("Vui lòng thử lại sau."),
      });
    }
  };

  return (
    <>
      <AuthLayout bottomLinks={<BottomLink />}>
        <h4 className="mt-0">{t("Khôi phục mật khẩu")}</h4>
        <p className="text-muted mb-4">
          {t(
            "Nhập căn cước công dân của bạn và chúng tôi sẽ gửi cho bạn một email với hướng dẫn để đặt lại mật khẩu"
          )}
        </p>

        {resetPasswordSuccess && (
          <Alert variant="success">{resetPasswordSuccess.message}</Alert>
        )}

        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        {!passwordReset && (
          <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
            <FormInput
              label={t("Nhập căn cước công dân")}
              type="text"
              name="username"
              placeholder={t("Nhập căn cước công dân")}
              containerClass={"mb-3"}
            />

            <div className="mb-0 text-center d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
                {t("Đặt lại mật khẩu")}
              </Button>
            </div>
          </VerticalForm>
        )}
      </AuthLayout>
    </>
  );
};

export default ForgetPassword2;
