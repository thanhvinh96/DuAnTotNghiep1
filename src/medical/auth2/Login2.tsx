import React, { useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import jwtDecode from "jwt-decode";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { handleLoginMedical } from '../../controller/MedicalController'; // Import controller

// actions
import { resetAuth } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// hooks
import { useQuery } from "../../hooks";

// components
import { VerticalForm, FormInput } from "../../components";

// layout
import AuthLayout from "./AuthLayout";

interface UserData {
  cccd: string;
  passwordmedical: string;
}

interface DecodedToken {
  email: string;
  name: string;
  cccd: string;
  tokenmedical: string;
}

const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        {t("Don't have an account?")}{" "}
        <Link to={"/medical/auth/register2"} className="text-muted ms-1">
          <b>{t("Sign Up")}</b>
        </Link>
      </p>
    </footer>
  );
};

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
        {socialLinks.map((item, index) => (
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
        ))}
      </ul>
    </>
  );
};

const Login2 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const MySwal = withReactContent(Swal);

  const navigate = useNavigate(); // Initialize useNavigate

  const query = useQuery();
  const next = query.get("next");

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, userLoggedIn, user, error } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      user: state.Auth.user,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );

  // Validation schema
  const schemaResolver = yupResolver(
    yup.object().shape({
      cccd: yup.string().required(t("Please enter your CCCD")),
      passwordmedical: yup.string().required(t("Please enter your password")),
    })
  );

  // OnSubmit handler
  const onSubmit = async (formData: UserData) => {
    try {
      const loadingSwal:any = MySwal.fire({
        title: 'Please wait...',
        text: 'Login medical, please wait!',
        icon: 'info',
        allowOutsideClick: false, // Prevent closing the modal while loading
        showConfirmButton: false, // Hide the confirmation button
        didOpen: () => {
          Swal.showLoading(); // Show the loading animation
        }
      });
      const response = await handleLoginMedical(formData);
      console.log(response);

      if (response.status===true) {
        // const data = await response.json();
        console.log(response.transactionResult);
        const decoded = jwtDecode<DecodedToken>(response.transactionResult);
        console.log(decoded);
        if (decoded.tokenmedical != null) {
          try {
            // Save token in localStorage
            localStorage.setItem("jwtToken", response.transactionResult)
            console.log("User info:", decoded);
            loadingSwal.close();
            Swal.fire({
              title: 'Login Success!',
              text: 'Your Login  successful.',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              window.location.href = '/medical';
    
            });
          } catch (decodeError) {

        Swal.fire({
          title: 'Registration Error!',
          text: 'Error'+decodeError,
          icon: 'error',  // Fixed typo
          confirmButtonText: 'OK',
        });
          }
        }
      } else {
        const error = await response.json();
        console.error("Error:", error);
        Swal.fire({
          title: 'Registration Error!',
          text: 'Error'+error,
          icon: 'error',  // Fixed typo
          confirmButtonText: 'OK',
        });      }
    } catch (err) {
      console.error("Network error:", err);
      Swal.fire({
        title: 'Registration Error!',
        text: 'Error'+error,
        icon: 'error',  // Fixed typo
        confirmButtonText: 'OK',
      });      }
  };

  return (
    <>
      {/* Redirect after successful login */}
      {userLoggedIn || user ? (
        <Navigate to={next ? next : "/"}></Navigate>
      ) : null}

      <AuthLayout bottomLinks={<BottomLink />}>
        <h4 className="mt-0">{t("Sign In")}</h4>
        <p className="text-muted mb-4">
          {t("Enter your CCCD and password to access your account.")}
        </p>

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        {/* Login Form */}
        <VerticalForm
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ cccd: "123456789", passwordmedical: "password" }}
        >
          {/* CCCD Input */}
          <FormInput
            label={t("CCCD")}
            type="text"
            name="cccd"
            placeholder={t("Enter your CCCD")}
            containerClass={"mb-3"}
          />

          {/* Password Input */}
          <FormInput
            label={t("Password")}
            type="password"
            name="passwordmedical"
            placeholder={t("Enter your password")}
            containerClass={"mb-3"}
          >
            <Link to="/medical/auth/forget-password2" className="text-muted float-end">
              <small>{t("Forgot your password?")}</small>
            </Link>
          </FormInput>

          {/* Remember me checkbox */}
          <FormInput
            label={t("Remember me")}
            type="checkbox"
            name="rememberMe"
            containerClass={"mb-3"}
          />

          {/* Submit Button */}
          <div className="d-grid mb-0 text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Log In")}
            </Button>
          </div>

          {/* Social login */}
          <div className="text-center mt-4">
            <p className="text-muted font-16">{t("Sign in with")}</p>
            <SocialLinks />
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login2;
