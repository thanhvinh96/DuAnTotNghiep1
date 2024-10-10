// fetch("http://42.96.2.80:3002/update-record", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(result => {
//   localStorage.removeItem("jwtToken");
// // Lưu JWT token vào localStorage
// const decoded = jwtDecode<DecodedToken>(result.transactionResult.token);

// // Save token in localStorage
// console.log(result.transactionResult.token);
// localStorage.setItem("jwtToken", result.transactionResult.token);
// console.log("User info:", decoded);

//   console.log('Success:', result);
// })
// .catch(error => {
//   console.error('Error:', error);
// });


const balances = [
  {
    id: 1,
    ngaykham: "Tomaslau",
    nameBS: "Nguyễn văn A",
    nameBV: "Bệnh viện đa khoa",
    diaChi: "Công viên phần quang trung",
    chandoan:"bệnh ngu"
  }
];

const revenueHistory = [
  {
    id: 1,
    marketplaces: "Themes Market",
    date: "Oct 15, 2018",
    payouts: "$5848.68",
    status: "Upcoming",
  },
  {
    id: 2,
    marketplaces: "Freelance",
    date: "Oct 12, 2018",
    payouts: "$1247.25",
    status: "Paid",
  },
  {
    id: 3,
    marketplaces: "Share Holding",
    date: "Oct 10, 2018",
    payouts: "$815.89",
    status: "Paid",
  },
  {
    id: 4,
    marketplaces: "Envato's Affiliates",
    date: "Oct 03, 2018",
    payouts: "$248.75",
    status: "Overdue",
  },
  {
    id: 5,
    marketplaces: "Marketing Revenue",
    date: "Sep 21, 2018",
    payouts: "$978.21",
    status: "Upcoming",
  },
  {
    id: 6,
    marketplaces: "Advertise Revenue",
    date: "Sep 15, 2018",
    payouts: "$358.10",
    status: "Paid",
  },
];

export { balances, revenueHistory };
