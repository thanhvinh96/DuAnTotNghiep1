import React from "react";
import { Bar, defaults as ChartjsDefaults } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {ShowBankByMoth} from "../../controller/BankController";
const BiểuĐồCột = () => {
  // Thay đổi mặc định của chartjs
  ChartjsDefaults.color = "#8391a2";
  ChartjsDefaults.scale.grid.color = "#8391a2";

  // Dữ liệu biểu đồ
  const dữLiệuBiểuĐồ = (canvas: any) => {
    const ctx = canvas.getContext("2d");
    var gradientStroke = ctx.createLinearGradient(0, 500, 0, 150);
    gradientStroke.addColorStop(0, "#fa5c7c");
    gradientStroke.addColorStop(1, "#727cf5");

    return {
      labels: Array.from({ length: 30 }, (_, i) => `Ngày ${i + 1}`), // Nhãn cho từng ngày trong tháng
      datasets: [
        {
          label: "Tỷ Giá VND",
          backgroundColor: gradientStroke,
          borderColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          hoverBorderColor: gradientStroke,
          data: [
            23500, 23650, 23450, 23700, 23550, 23600, 23680, 23520, 23490, 23610,
            23510, 23600, 23650, 23470, 23730, 23620, 23500, 23650, 23580, 23710,
            23460, 23640, 23570, 23480, 23700, 23540, 23600, 23630, 23720, 23600,
          ], // Dữ liệu ví dụ cho biến động tỷ giá VND mỗi ngày
          barPercentage: 0.7,
          categoryPercentage: 0.5,
        },
      ],
    };
  };

  // Tùy chọn biểu đồ
  const tùyChọnBiểuĐồ = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#727cf5",
        titleFontColor: "#fff",
        bodyFontColor: "#fff",
        bodyFontSize: 14,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
          color: "rgba(0,0,0,0.05)",
        },
        stacked: false,
        ticks: {
          stepSize: 50, // Điều chỉnh để biểu diễn tốt hơn biến động VND
        },
      },
      x: {
        stacked: false,
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
        ticks: {
          maxTicksLimit: 10, // Giới hạn số lượng ticks để tránh lộn xộn
          autoSkip: true, // Tự động bỏ qua nhãn để dễ đọc hơn
        },
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="header-title mb-3">Biến Động Tỷ Giá VND (Hàng Ngày)</h4>

        <div style={{ height: "320px" }} className="chartjs-chart">
          <Bar data={dữLiệuBiểuĐồ} options={tùyChọnBiểuĐồ} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default BiểuĐồCột;
