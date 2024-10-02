import React, { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { VerticalForm, FormInput, FormSelectBootstrap } from "../../components/";

// actions
import { resetAuth } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// hooks
import { useQuery } from "../../hooks";

// layout
import AuthLayout from "./AuthLayout";

interface UserData {
  cccd: string;
  passwordmedical: string;
}

const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        {t("Don't have an account?")}{" "}
        <Link to={"/auth/register2"} className="text-muted ms-1">
          <b>{t("Sign Up")}</b>
        </Link>
      </p>
    </footer>
  );
};

const SocialLinks = () => {
  const socialLinks = [
    { variant: "primary", icon: "facebook" },
    { variant: "danger", icon: "google" },
    { variant: "info", icon: "twitter" },
    { variant: "secondary", icon: "github" },
  ];

  return (
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
  );
};

const Login2 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery();
  const next = query.get("next");

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');

  useEffect(() => {
    fetch('http://42.96.2.80:3002/getall-org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const optionsData = data.map((org: any) => ({
          value: org.tokeorg,
          label: org.nameorg,
        }));
        setOptions(optionsData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const { loading, userLoggedIn, user, error } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
    user: state.Auth.user,
    error: state.Auth.error,
    userLoggedIn: state.Auth.userLoggedIn,
  }));

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = async (formData: UserData) => {
    try {
      const updatedFormData = { ...formData, tokeorg: selectedOption };
      console.log("Updated Form Data:", updatedFormData);
      // Thực hiện xử lý với updatedFormData ở đây
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  return (
    <>
      {userLoggedIn || user ? (
        <Navigate to={next ? next : "/"} />
      ) : null}

      <AuthLayout bottomLinks={<BottomLink />}>
        <h4 className="mt-0">{t("Sign In")}</h4>
        <p className="text-muted mb-4">
          {t("Enter your CCCD and password to access your account.")}
        </p>

        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm
          onSubmit={onSubmit}
          defaultValues={{ cccd: "123456789", passwordmedical: "password", tokeorg: selectedOption }} // Sử dụng selectedOption
        >
          <FormSelectBootstrap
            label={t("Select an option")}
            name="tokeorg"
            placeholder={t("Choose an option")}
            options={options}
            value={selectedOption} // Thêm thuộc tính value
            onChange={handleSelectChange} // Thêm thuộc tính onChange
          />

          <FormInput
            label={t("CCCD")}
            type="text"
            name="cccd"
            placeholder={t("Enter your CCCD")}
            containerClass={"mb-3"}
          />

          <FormInput
            label={t("Password")}
            type="password"
            name="passwordmedical"
            placeholder={t("Enter your password")}
            containerClass={"mb-3"}
          >
            <Link to="/auth/forget-password2" className="text-muted float-end">
              <small>{t("Forgot your password?")}</small>
            </Link>
          </FormInput>

          <FormInput
            label={t("Remember me")}
            type="checkbox"
            name="rememberMe"
            containerClass={"mb-3"}
          />

          <div className="d-grid mb-0 text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Log In")}
            </Button>
          </div>

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
