import React, { useState } from "react";
import { Form, Button, Table, Col, Row, Card, InputGroup } from "react-bootstrap";

interface Product {
    sku: string;
    name: string;
    category?: {
        name: string;
    };
    price?: {
        measureUnitName: string;
    };
}

interface Prescription {
    testName: string;
    referenceValue: string;
    result: string;
    unit: string;
}

const PrescriptionForm: React.FC = () => {
    const [tableData, setTableData] = useState<Prescription[]>([]);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const addRow = () => {
        setTableData([
            ...tableData,
            { testName: "", referenceValue: "", result: "", unit: "" },
        ]);
    };

    const handlePrescriptionChange = (index: number, field: keyof Prescription, value: string) => {
        const newTableData = [...tableData];
        newTableData[index][field] = value;
        setTableData(newTableData);
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://api.nhathuoclongchau.com.vn/lccus/search-product-service/api/products/ecom/product/suggest?keyword=${searchKeyword}&KeywordSuggestSize=1&CatEcomSuggestSize=1&ProductSuggestSize=5`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setSearchResults(data.products || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const addProductToTable = (product: Product) => {
        setTableData([
            ...tableData,
            {
                testName: product.name,
                referenceValue: product.category?.name || "",
                result: "",
                unit: product.price?.measureUnitName || "",
            },
        ]);
        setSearchResults([]); // Clear search results after adding
    };

    const handleDeleteRow = (index: number) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setTableData(updatedData);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Saved Data:", tableData);
    };

    return (
        <Col md={12}>
            <Card className="shadow-sm p-4">
                <Card.Title className="text-center mb-4 text-primary">
                    Thêm Đơn Thuốc
                </Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Row className="align-items-center mb-4">
                    <Col md={9}>
    <div className="d-flex align-items-center">
        <Form.Control
            type="text"
            placeholder="Tìm tên thuốc"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="me-2"
        />
        <Button variant="primary" onClick={handleSearch}>
            Tìm thuốc
        </Button>
    </div>
</Col>

                    </Row>
                    {searchResults.length > 0 && (
                        <div className="border p-3 rounded mb-3 bg-light">
                            <strong>Kết quả tìm kiếm:</strong>
                            <ul className="list-unstyled mt-2">
                                {searchResults.map((product) => (
                                    <li
                                        key={product.sku}
                                        onClick={() => addProductToTable(product)}
                                        className="p-2 border-bottom"
                                        style={{ cursor: "pointer" }}
                                    >
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Table bordered hover className="mt-4 text-center">
                        <thead className="bg-primary text-white">
                        <tr >
    <th style={{ color: 'white' }}>STT</th>
    <th style={{ color: 'white' }}>Tên thuốc</th>
    <th style={{ color: 'white' }}>ĐVT</th>
    <th style={{ color: 'white' }}>Số lượng</th>
    <th style={{ color: 'white' }}>Cách dùng</th>
    <th style={{ color: 'white' }}>Thao tác</th>
</tr>

                        </thead>
                        <tbody>
                            {tableData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.testName}
                                            onChange={(e) =>
                                                handlePrescriptionChange(
                                                    index,
                                                    "testName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.referenceValue}
                                            onChange={(e) =>
                                                handlePrescriptionChange(
                                                    index,
                                                    "referenceValue",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.result}
                                            onChange={(e) =>
                                                handlePrescriptionChange(
                                                    index,
                                                    "result",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={item.unit}
                                            onChange={(e) =>
                                                handlePrescriptionChange(
                                                    index,
                                                    "unit",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteRow(index)}
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-between mt-4">
                        <Button
                            variant="outline-primary"
                            onClick={addRow}
                            style={{
                                fontSize: "14px",
                                padding: "6px 20px",
                                width: "150px",
                            }}
                        >
                            Thêm dòng
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{
                                fontSize: "14px",
                                padding: "6px 20px",
                                width: "150px",
                            }}
                        >
                            Lưu kết quả
                        </Button>
                    </div>
                </Form>
            </Card>
        </Col>
    );
};

export default PrescriptionForm;
