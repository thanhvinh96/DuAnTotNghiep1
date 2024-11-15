import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  handleCreateMedical,
  handleLoginMedical,
} from "../../controller/MedicalController"; // Import controller

// actions
import { resetAuth } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components";

import AuthLayout from "./AuthLayout";
// trong ts interface dùng để kiểm tra các đối tưởng có tuân theo kiểu đối tượng không
interface UserData {
  name: string;
  email: string;
  passwordmedical: string;
  cccd: string;
}

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        {t("Đã có tài khoản?")}{" "}
        <Link to={"/medical/auth/login2"} className="text-muted ms-1">
          <b>{t("Đăng Nhập")}</b>
        </Link>
      </p>
    </footer>
  );
};

/* social links */
const SocialLinks = () => {
  const socialLinks = [
    {
      variant: "primary",
      icon: "facebook",
    },
    {
      variant: "danger",
      icon: "google",
    },
    {
      variant: "info",
      icon: "twitter",
    },
    {
      variant: "secondary",
      icon: "github",
    },
  ];
  return (
    <>
      <ul className="social-list list-inline mt-3 mb-0">
        {(socialLinks || []).map((item, index) => {
          return (
            <li key={index} className="list-inline-item">
              <Link
                to="#"
                className={classNames(
                  "social-list-item",
                  "border-" + item.variant,
                  "text-" + item.variant
                )}
              >
                <i className={classNames("mdi", "mdi-" + item.icon)}></i>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Register2 = () => {
  const MySwal = withReactContent(Swal);

  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, userSignUp, error } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
    error: state.Auth.error,
    userSignUp: state.Auth.userSignUp,
  }));

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required(t("Please enter name")),
      email: yup.string().required(t("Please enter Email address")),
      passwordmedical: yup.string().required(t("Please enter Password")),
      cccd: yup.string().required(t("Please enter CCCd")),
    })
  );

  /*
   * handle form submission
   */
  const onSubmit = async (formData: UserData) => {
    console.log(formData);

    try {
      const loadingSwal: any = MySwal.fire({
        title: "Please wait...",
        text: "Register medical, please wait!",
        icon: "info",
        allowOutsideClick: false, // Prevent closing the modal while loading
        showConfirmButton: false, // Hide the confirmation button
        didOpen: () => {
          Swal.showLoading(); // Show the loading animation
        },
      });
      // const response = await fetch("http://42.96.2.80:3002/register-record", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      const response = await handleCreateMedical(formData);
      console.log(response);
      if (response.success === true) {
        // const data = await response.json();
        // console.log("Success:", data);
        loadingSwal.close();
        Swal.fire({
          title: "Register Success!",
          text: "Your registration was successful.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/LoginP";
        });
      } else {
        Swal.fire({
          title: "Registration Error!",
          text: "There was an error during registration. Please try again.",
          icon: "error", // Fixed typo
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      Swal.fire({
        title: "Registration Error!",
        text: "There was an error during registration. Please try again.",
        icon: "error", // Fixed typo
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      {userSignUp ? <Navigate to={"/medical/auth/confirm2"}></Navigate> : null}

      <AuthLayout bottomLinks={<BottomLink />}>
        <h4 className="mt-0">{t("Đăng Kí")}</h4>
        <p className="text-muted mb-4">
          {t(
            "Chưa có tài khoản? Tạo tài khoản của bạn, chỉ mất chưa đầy một phút."
          )}
        </p>

        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{}}
        >
          <FormInput
            label={t("Họ và Tên")}
            type="text"
            name="name"
            placeholder={t("Enter your name")}
            containerClass={"mb-3"}
          />

          <FormInput
            label={t("Cccd")}
            type="text"
            name="cccd"
            placeholder={t("Enter your cccd")}
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Email")}
            type="email"
            name="email"
            placeholder={t("Enter your email")}
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Mật khẩu")}
            type="password"
            name="passwordmedical"
            placeholder={t("Enter your password")}
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Tôi chấp nhận Điều khoản và Điều kiện")}
            type="checkbox"
            name="checkboxsignup"
            containerClass={"mb-3 text-muted"}
          />

          <div className="mb-0 d-grid text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Đăng Kí")}
            </Button>
          </div>

          {/* social links */}
          <div className="text-center mt-4">
            <p className="text-muted font-16">{t("Đăng kí với")}</p>
            <SocialLinks />
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Register2;
