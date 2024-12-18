import React from "react";
import { Link } from 'react-router-dom';
import chieucao from '../../img/chieucao.png';
import cannang from '../../img/cannang.png';
import nhiptim from '../../img/nhip-tim-nhanh-1_0004010_710.jpeg';
import huyetap from '../../img/huyetap.jpg';
import nhommau from '../../img/nhommau.png';
import tuoi from '../../img/tuoi.jpg';
const Patient = () => {
  return (
    <>
      <div className="container-fluid patient">
        <div className="row">
          <div className="colum left">
            <div className="card mb-3 cards">
              <div className="">
                <h5 className="card-title">Nhịp Tim</h5>
              </div>
              <div className="icon-img">
                <img src={nhiptim} alt="" width={100} height={100} />
              </div>
              <div className="">
                <h5 className="card-title">72/phút</h5>
              </div>
            </div>
            <div className="card mb-3 cards">
              <div className="">
                <h5 className="card-title">Huyết Áp</h5>
              </div>
              <div className="icon-img">
                <img src={huyetap} alt="" width={100} height={100} />
              </div>
              <div className="">
                <h5 className="card-title">120/80</h5>
              </div>
            </div>
            <div className="card mb-3 cards">
              <div className="icon-img">
                <h5 className="card-title">Nhóm Máu</h5>
              </div>
              <div className="">
                <img src={nhommau} alt="" width={100} height={100} />
              </div>
              <div className="icon-img">
                <h5 className="card-title">A</h5>
              </div>
            </div>
          </div>
          <div className="colum center">
            <h2>Lịch Sử Khám Bệnh</h2>
            <Link to='1' >
              <div className="mb-3 ls_card">
                <p hidden > id</p>
                <h3>Tên Bệnh viện</h3>
                <p>Ngày Khám</p>
                <p>Tên Bác Sĩ</p>
                <p>Chuẩn Đoán</p>
              </div>
            </Link>
          </div>
          <div className="colum right">
            <div className="card mb-3 cards ">
              <div className="">
                <h5 className="card-title">Tuổi</h5>
              </div>
              <div className="icon-img">
                <img src={tuoi} alt="" width={100} height={100} />
              </div>
              <div className="">
                <h5 className="card-title">27</h5>
              </div>
            </div>
            <div className="card mb-3 cards ">
              <div className="icon-img">
                <h5 className="card-title">Chiều cao</h5>
              </div>
              <div className="icon-img">
                <img src={chieucao} alt="" width={100} height={100} />
              </div>
              <div className="">
                <h5 className="card-title">170 cm</h5>
              </div>
            </div>
            <div className="card mb-3 cards">
              <div className="">
                <h5 className="card-title">Cân Nặng</h5>
              </div>
              <div className="icon-img">
                <img src={cannang} alt="" width={100} height={100} />
              </div>
              <div className="">
                <h5 className="card-title">68 kg</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient;