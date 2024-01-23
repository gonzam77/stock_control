const date = new Date(2023,11,31,2);
const formattedDate = date.toLocaleString();

export const ofertas = [
    {
        id:'1',
        product_id:'1',
        discount:20,
        code:'0001',
        create_date:formattedDate
    },
    {
        id:'2',
        product_id:'3',
        discount:15,
        code:'0002',
        create_date:formattedDate
    }
]