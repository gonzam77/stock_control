const date = new Date(2023, 11, 31);
const toDate = new Date(2024, 11, 31);
const toDate2 = new Date(2023, 11, 30);



export const ofertas = [
    {
        id: '1',
        product_id: '1',
        discount: 20,
        code: '0001',
        create_date: date,
        to_date: toDate
    },
    {
        id: '2',
        product_id: '3',
        discount: 15,
        code: '0002',
        create_date:date,
        to_date:toDate2
    }
]