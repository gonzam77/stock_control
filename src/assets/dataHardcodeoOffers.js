const date = new Date(2023, 11, 31);
const toDate = new Date(2024, 11, 31);
const fromDate = new Date(2022, 11, 31);
const fromDate2 = new Date(2025, 11, 31);
const toDate2 = new Date(2025, 0, 20);



export const ofertas = [
    {
        id: '1',
        product_id: '1',
        discount: 20,
        code: '0001',
        create_date: date,
        to_date: toDate,
        from_date: fromDate
    },
    {
        id: '2',
        product_id: '3',
        discount: 15,
        code: '0003',
        create_date:date,
        to_date:toDate2,
        from_date:fromDate2
    }
]