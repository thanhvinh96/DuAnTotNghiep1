import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import classNames from "classnames";
import CountUp from "react-countup";

interface StatisticsWidgetProps {
  variant: string;
  description: string;
  stats: string;
  icon: string;
  counterOptions?: any;
  values:string;
}

const StatisticsWidget = (props: StatisticsWidgetProps) => {
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
                <p className="text-dark mb-0 text-truncate font-16">
                  {props["description"]}
                </p>
                <h3 className="text-dark mb-0">
                  <span>
                    <CountUp
                      duration={1}
                      end={props["stats"]}
                      {...props["counterOptions"]}
                    />
                  </span>
                </h3>
                <p className="text-dark text-truncate">
                  {props["values"]}
                </p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default StatisticsWidget;
