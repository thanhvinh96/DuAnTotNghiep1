import React from "react";
import { Modal, Button } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { VerticalForm, FormInput } from "../../../../components";

interface AddLeadsProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (value: any) => void;
}

const AddLeads = ({ show, onHide, onSubmit }: AddLeadsProps) => {
  /*
    form validation schema
    */
  const schemaResolver = yupResolver(
    yup.object().shape({
      name: yup.string().required("Vui lòng nhập tên"),
      email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Vui lòng nhập địa chỉ email"),
      phone: yup
        .string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^\d{10}$/, "số điện thoại không tồn tại"),
      category: yup.string().required("Vui lòng nhập danh mục"),
    })
  );

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-light" onHide={onHide} closeButton>
          <Modal.Title className="m-0">Add New Leads</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <VerticalForm onSubmit={onSubmit} resolver={schemaResolver}>
            <FormInput
              label="Company Name"
              type="text"
              name="name"
              placeholder="Enter company name"
              containerClass={"mb-3"}
            />
            <FormInput
              label="Email address"
              type="email"
              name="email"
              placeholder="Enter email"
              containerClass={"mb-3"}
            />
            <FormInput
              label="Phone"
              type="text"
              name="phone"
              placeholder="Enter phone number"
              containerClass={"mb-3"}
            />
            <FormInput
              label="Category"
              type="text"
              name="category"
              placeholder="Enter category"
              containerClass={"mb-3"}
            />

            <div className="text-end">
              <Button
                variant="success"
                type="submit"
                className="waves-effect waves-light me-1"
              >
                Save
              </Button>
              <Button
                variant="danger"
                className="waves-effect waves-light"
                onClick={onHide}
              >
                Continue
              </Button>
            </div>
          </VerticalForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddLeads;
