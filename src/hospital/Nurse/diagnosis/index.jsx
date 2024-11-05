// Diagnosis.jsx
import React, { useState } from 'react';
import { Container, Card, Button, Form, Row, Col, FormLabel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ServiceForm from './ServiceForm';
import UploadForm from './UploadForm';
import Conclude from './Conclude';

const Diagnosis = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const typeform = query.get('typeform'); // Lấy giá trị của typeform từ URL

    const [profileData, setProfileData] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);

    const handleServiceSubmit = (data) => {
        console.log("Service Form Data:", data);
        setSubmittedData(data);
    };

    const handleImageSubmit = (image) => {
        console.log("Image Upload:", image ? image.name : "No file selected");
        setSubmittedData({ image });
    };

    return (
        <Container fluid className="p-3">

            {/* Kiểm tra typeform để hiển thị các form khác nhau */}
            {typeform === 'chuyen_muc' && <ServiceForm onSubmit={handleServiceSubmit} />}
            {typeform === 'up_file' && <UploadForm onSubmit={handleImageSubmit} />}
            {typeform === 'up_ketluan' && <Conclude onSubmit={handleImageSubmit} />}

            {/* Hiển thị dữ liệu đã submit nếu có */}
           
        </Container>
    );
};

export default Diagnosis;
