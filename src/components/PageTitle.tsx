import React from "react";
import { Row, Col, Breadcrumb } from "react-bootstrap";

interface BreadcrumbItems {
  label: string;
  path: string;
  active?: boolean;
}

interface PageTitleProps {
  breadCrumbItems: Array<BreadcrumbItems>;
  title: string;
}

/**
 * PageTitle
 */
const PageTitle = (props: PageTitleProps) => {
  return (
    <Row >
      <Col>
        <div className="page-title-box">
          <h4 className="page-title">{props["title"]}</h4>
        </div>
      </Col>
    </Row>
  );
};

export default PageTitle;
