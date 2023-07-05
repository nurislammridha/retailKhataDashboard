export const unitList = () => {
    const list = [
        { label: "K.G", value: "1" },
        { label: "Litre", value: "2" },
        { label: "Piece", value: "3" },
        { label: "Packet", value: "4" }
    ]
    return list
}
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
                label: item.name,
                value: item._id,
            };
            arr.push(obj);
        });
    }
    return arr;
};