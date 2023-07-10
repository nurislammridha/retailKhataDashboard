export const unitList = () => {
  const list = [
    { label: "K.G", value: "1" },
    { label: "Litre", value: "2" },
    { label: "Piece", value: "3" },
    { label: "Packet", value: "4" },
  ];
  return list;
};
export const purposeList = () => {
  const list = [
    { label: "Fresh Invest", value: "1" },
    { label: "Selling Bosta/Cartoon", value: "2" },
    { label: "Other Income", value: "3" },
    { label: "Shop Rent", value: "4" },
    { label: "Electricity Bill", value: "5" },
    { label: "Sada", value: "6" },
    { label: "Pahara", value: "7" },
    { label: "Servicing", value: "8" },
    { label: "Other Cost", value: "9" }
  ];
  return list;
};
export const getMonth = () => {
  return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
};
export const getProductOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: item.name,
        value: item._id,
        unitName: item.unitName,
        unitID: item.unitID,
        presentPricePerUnit: item.presentPricePerUnit,
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getCustomerOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: `${item.name} (${item.address})`,
        value: item._id,
        buyerPhone: item.phoneNumber,
        buyerAddress: item.address,
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getDealerOption = (data) => {
  const arr = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      const obj = {
        label: `${item.name}`,
        value: item._id,
      };
      arr.push(obj);
    });
  }
  return arr;
};
export const getTotalDue = (data) => {
  let s = 0;

  if (data && data.length > 0) {
    data.forEach((item) => {
      // console.log('item', item)
      s = item?.due + s
      // console.log('s', s)
    });
  }
  return s;
};
export const getTotalPay = (data) => {
  let s = 0;
  if (data && data.length > 0) {
    data.forEach((item) => {
      console.log('item', item)
      s = item?.val + s
      // console.log('s', s)
    });
  }
  return s;
};
export const getTotalBuy = (data) => {
  let price = 0;
  let quantity = 0;
  let unit = ""
  let product = ""
  if (data && data.length > 0) {
    data.forEach((item) => {
      // console.log('item', item)
      price = item?.totalPrice + price
      quantity = item?.quantity + quantity
      unit = item?.unitName
      product = item?.productName
      // console.log('s', s)
    });
  }
  return { price, quantity, unit, product };
};
export const getTotalSell = (data) => {
  let price = 0;
  let quantity = 0;
  if (data && data.length > 0) {
    data.forEach((item) => {
      // console.log('item', item)
      price = item?.totalPrice + price
      quantity = item?.quantity + quantity
      // console.log('s', s)
    });
  }
  return { price, quantity };
};
export const twoDigit = (n) => {
  return n > 9 ? n : "0" + n;
};

export const getSellingInfo = (data, today) => {
  let todaySell = 0;
  let todayNagad = 0;
  let todayBaki = 0;
  let todayProfit = 0;
  let monthlySell = 0;
  let monthlyNagad = 0;
  let monthlyBaki = 0;
  let monthlyProfit = 0;
  let totalSell = 0;
  let totalNagad = 0;
  let totalBaki = 0;
  let totalProfit = 0;
  if (data && data.length > 0) {
    data.forEach((item) => {
      totalSell = item?.totalPrice + totalSell
      totalNagad = item?.cash + totalNagad
      totalBaki = item?.due + totalBaki
      totalProfit = item?.profit + totalProfit //not actual profit
      if (item.date.split("-")[1] === today.split("-")[1]) {
        monthlySell = item?.totalPrice + monthlySell
        monthlyNagad = item?.cash + monthlyNagad
        monthlyBaki = item?.due + monthlyBaki
        monthlyProfit = item?.profit + monthlyProfit //not actual profit
        if (item.date === today) {
          todaySell = item?.totalPrice + todaySell
          todayNagad = item?.cash + todayNagad
          todayBaki = item?.due + todayBaki
          todayProfit = item?.profit + monthlyProfit //not actual profit 
        }
      }
    });
  }
  return { todaySell, todayNagad, todayBaki, todayProfit, monthlySell, monthlyNagad, monthlyBaki, monthlyProfit, totalSell, totalNagad, totalBaki, totalProfit };
};
export const getCrDrInfo = (data) => {
  let freshInvest = 0;
  let internalIncome = 0;
  let businessCost = 0;
  if (data && data.length > 0) {
    data.forEach((item) => {
      const { isCredit, amount, purposeID } = item
      if (isCredit && purposeID === "1") {
        freshInvest = item?.amount + freshInvest
      } else if (isCredit && purposeID === "2") {
        internalIncome = item?.amount + internalIncome
      } else if (isCredit && purposeID === "3") {
        internalIncome = item?.amount + internalIncome
      } else if (!isCredit) {
        businessCost = item?.amount + businessCost
      }
    });
  }
  return { freshInvest, internalIncome, businessCost };
};
export const getBuyingInfo = (data) => {
  let totalBuy = 0;
  let totalNagad = 0;
  let totalBaki = 0;
  let totalCost = 0;
  if (data && data.length > 0) {
    data.forEach((item) => {
      totalBuy = item?.totalPrice + totalBuy
      totalNagad = item?.cash + totalNagad
      totalBaki = item?.due + totalBaki
      totalCost = item?.otherCost + totalCost

    });
  }
  return { totalBuy, totalNagad, totalBaki, totalCost };
};