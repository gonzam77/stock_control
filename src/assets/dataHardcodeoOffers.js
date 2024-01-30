const createDate = new Date(2023, 11, 31);

const toDate = new Date(2024, 11, 31);
const fromDate = new Date(2022, 11, 31);

const fromDate2 = new Date(2024, 0, 1);
const toDate2 = new Date(2024, 0, 20);

toDate2.setHours(23,59,59);
toDate.setHours(23,59,59);


export const ofertas = [
    {
        id: '1',
        product_id: '55',
        discount: 20,
        code: '0001',
        create_date: createDate,
        from_date: fromDate,
        to_date: toDate
    },
    {
        id: '2',
        product_id: '59',
        discount: 15,
        code: '0003',
        create_date: createDate,
        from_date: fromDate2,
        to_date: toDate2
    }
]