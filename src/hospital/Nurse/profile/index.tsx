import React from "react";
import { Row, Col, Card, Tab, Nav, Table } from "react-bootstrap";
import classNames from "classnames";

// components
import PageTitle from "../../../components/PageTitle";
import Messages from "../../../components/Messages";

import UserBox from "./UserBox";
import About from "./About";
import TimeLine from "./TimeLine";
import Settings from "./Settings";

interface ProjectDetails {
  id: number;
  client: string;
  name: string;
  startDate: string;
  dueDate: string;
  status: string;
}

const Profile = () => {
  const projectDetails: ProjectDetails[] = [
    {
      id: 1,
      client: "Halette Boivin",
      name: "App design and development",
      startDate: "01/01/2015",
      dueDate: "10/05/2018",
      status: "Work in Progress",
    },
    {
      id: 2,
      client: "Durandana Jolicoeur",
      name: "Coffee detail page - Main Page",
      startDate: "21/07/2016",
      dueDate: "12/05/2018",
      status: "Pending",
    },
    {
      id: 3,
      client: "Lucas Sabourin",
      name: "Poster illustation design",
      startDate: "18/03/2018",
      dueDate: "28/09/2018",
      status: "Done",
    },
    {
      id: 4,
      client: "Donatien Brunelle",
      name: "Drinking bottle graphics",
      startDate: "02/10/2017",
      dueDate: "07/05/2018",
      status: "Work in Progress",
    },
    {
      id: 5,
      client: "Karel Auberjo",
      name: "Landing page design - Home",
      startDate: "17/01/2017",
      dueDate: "25/05/2021",
      status: "Coming soon",
    },
  ];

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Contacts", path: "/apps/contacts/profile" },
          { label: "Profile", path: "/apps/contacts/profile", active: true },
        ]}
        title={"Profile"}
      />
      <Row>
        <Col xl={4} lg={4}>
          {/* User information */}
          <UserBox />

          {/* User's recent messages */}
          {/* <Messages /> */}
        </Col>
        <Col xl={8} lg={8}>
          <Tab.Container defaultActiveKey="timeline">
            <Card>
              <Card.Body>
              
                <>
                      <h5 className="mb-4 text-uppercase">
                        <i className="mdi mdi-briefcase me-1"></i> Experience
                      </h5>

                      {/* Timeline */}
                      <ul className="list-unstyled timeline-sm">
                        <li className="timeline-sm-item">
                          <span className="timeline-sm-date">2015 - 18</span>
                          <h5 className="mt-0 mb-1">Lead designer / Developer</h5>
                          <p>websitename.com</p>
                          <p className="text-muted mt-2">
                            Everyone realizes why a new common language would be desirable: one
                            could refuse to pay expensive translators. To achieve this, it would
                            be necessary to have uniform grammar, pronunciation and more common
                            words.
                          </p>
                        </li>
                        <li className="timeline-sm-item">
                          <span className="timeline-sm-date">2012 - 15</span>
                          <h5 className="mt-0 mb-1">Senior Graphic Designer</h5>
                          <p>Software Inc.</p>
                          <p className="text-muted mt-2">
                            If several languages coalesce, the grammar of the resulting language
                            is more simple and regular than that of the individual languages.
                            The new common language will be more simple and regular than the
                            existing European languages.
                          </p>
                        </li>
                        <li className="timeline-sm-item">
                          <span className="timeline-sm-date">2010 - 12</span>
                          <h5 className="mt-0 mb-1">Graphic Designer</h5>
                          <p>Coderthemes LLP</p>
                          <p className="text-muted mt-2 mb-0">
                            The European languages are members of the same family. Their
                            separate existence is a myth. For science music sport etc, Europe
                            uses the same vocabulary. The languages only differ in their grammar
                            their pronunciation.
                          </p>
                        </li>
                      </ul>

                      <h5 className="mb-3 mt-4 text-uppercase">
                        <i className="mdi mdi-cards-variant me-1"></i> Projects
                      </h5>
                      <div className="table-responsive">
                        <Table responsive className="table table-borderless mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Project Name</th>
                              <th>Start Date</th>
                              <th>Due Date</th>
                              <th>Status</th>
                              <th>Clients</th>
                            </tr>
                          </thead>
                          <tbody>
                            {projectDetails.map((project, index) => (
                              <tr key={index}>
                                <td>{project.id}</td>
                                <td>{project.name}</td>
                                <td>{project.startDate}</td>
                                <td>{project.dueDate}</td>
                                <td>
                                  <span
                                    className={classNames("badge", {
                                      "bg-info": project.status === "Work in Progress",
                                      "bg-danger": project.status === "Pending",
                                      "bg-success": project.status === "Done",
                                      "bg-warning": project.status === "Coming soon",
                                    })}
                                  >
                                    {project.status}
                                  </span>
                                </td>
                                <td>{project.client}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
