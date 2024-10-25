import React, { useEffect, useState } from "react";
import { Button, Alert, Modal } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { VerticalForm, FormInput, FormSelectBootstrap } from "../../components/";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
// actions
import { resetAuth } from "../../redux/actions";
import { FetchHospital, LoginHospital } from "../../controller/HospitalController";

// store
import { RootState, AppDispatch } from "../../redux/store";

// hooks
import { useQuery } from "../../hooks";

// layout
import AuthLayout from "./AuthLayout";

interface UserData {
  cccd: string;
  password: string;
}

const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-alt">
      <p className="text-muted">
        {t("Don't have an account?")}{" "}
        <Link to={"/hospital/Organization-registration"} className="text-muted ms-1">
          <b>{t("Sign Up")}</b>
        </Link>
      </p>
    </footer>
  );
};



const Login2 = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });
  const handleClose = () => setShowModal(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery();
  const next = query.get("next");

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const showtokenOrg = async () => {
    try {
      const res: any = await FetchHospital(); // Thêm await ở đây
      console.log("Giá trị:", res); // In giá trị thực tế
      const optionsData = res.map((org: any) => ({
        value: org.tokeorg,
        label: org.nameorg,
      }));
      setOptions(optionsData);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error); // Xử lý lỗi nếu có
    }
  };

  useEffect(() => {
    showtokenOrg();
    // fetch('http://42.96.2.80:3002/getall-org', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const optionsData = data.map((org: any) => ({
    //       value: org.tokeorg,
    //       label: org.nameorg,
    //     }));
    //     setOptions(optionsData);
    //   })
    //   .catch((error) => console.error('Error fetching data:', error));
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
  const MySwal = withReactContent(Swal);

  const onSubmit = async (formData: UserData) => {
    try {
        const loadingSwal: any = MySwal.fire({
            title: 'Please wait...',
            text: 'Login Hospital, please wait!',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        setModalContent({ title: 'time loading...', body: 'Login hospital,' });
        const updatedFormData = { ...formData, tokeorg: selectedOption };
        
        const res: any = await LoginHospital(updatedFormData); // Thêm await ở đây
        console.log(res.token);

        if (res && res.status === true) { // Đảm bảo kiểm tra đúng cách
            console.log(res.token);
            localStorage.setItem('tokenadmin', res.token);
            setModalContent({ title: 'Success...', body: 'Login hospital,' });
            loadingSwal.close();

            Swal.fire({
                title: 'Login Hospital Success!',
                text: 'Your Login Hospital was successful.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            window.location.href = '/hospital/home';  // hoặc sử dụng phương pháp điều hướng của framework (React Router)

        } else {
            setModalContent({ title: 'Enroll...', body: 'Login hospital,' });
            Swal.fire({
                title: 'Login Error!',
                text: 'Login Error Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }

    } catch (err) {
        console.error("Network error:", err);
        Swal.fire({
            title: 'Login Error!',
            text: 'Login Error Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
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
          defaultValues={{ cccd: "123456789", password: "password", tokeorg: selectedOption }} // Sử dụng selectedOption
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
            name="password"
            placeholder={t("Enter your password")}
            containerClass={"mb-3"}
          >
            <Link to="/auth/forget-password2" className="text-muted float-end">
              <small>{t("Forgot your password?")}</small>
            </Link>
          </FormInput>



          <div className="d-grid mb-0 text-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Log In")}
            </Button>
          </div>


        </VerticalForm>
        <div className="text-center">
          <h5 className="mt-3 text-muted"></h5>
        </div>
      </AuthLayout>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login2;
