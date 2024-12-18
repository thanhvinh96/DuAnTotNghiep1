import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { Row, Col, Card, Button, InputGroup, FormControl, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import Table from "../../components/Table";
import { CreateBranchs, GetFullBranch } from "../../controller/BranchController";
import { GetInfoHospital } from "../../controller/HospitalController";

export default function UserManagent() {
    <>
    <h1>thuyendev</h1>
    </>
}