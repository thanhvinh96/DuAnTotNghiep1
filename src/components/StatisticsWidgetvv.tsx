import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import classNames from "classnames";

interface StatisticsWidgetProps {
  variant: string;
  description: string;
  stats: string;
  icon: string;
  counterOptions?: any;
}

const StatisticsWidgetvv = (props: StatisticsWidgetProps) => {
  return (
    <>
      <Card className="widget-rounded-circle">
        <Card.Body>
          <Row>
            <Col className="col-6">
              <div
                className={classNames(
                  "avatar-lg",
                  "rounded-circle",
                  "bg-soft-" + props["variant"],
                  "border-" + props["variant"],
                  "border"
                )}
              >
                <i
                  className={classNames(
                    props["icon"],
                    "avatar-title",
                    "font-22",
                    "text-" + props["variant"]
                  )}
                ></i>
              </div>
            </Col>
            <Col className="col-6">
              <div className="text-center">
                <p className="text-dark mb-2.9 text-truncate font-18">
                  {props["description"]}
                </p>
                <h3 className="text-dark text-truncate">
                    A+
                </h3>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default StatisticsWidgetvv;
