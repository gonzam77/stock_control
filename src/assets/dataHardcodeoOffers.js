const createDate = new Date(2023, 11, 31);

const toDate = new Date(2024, 11, 31);
const fromDate = new Date(2022, 11, 31);

const fromDate2 = new Date(2024, 0, 1);
const toDate2 = new Date(2024, 0, 20);

toDate2.setHours(23,59,59);
toDate.setHours(23,59,59);


export const ofertas = [
    {
        ID_OFERTA: '1',
        ID_PRDUCTO: 20,
        DESCUENTO: 20,
        CODIGO: '0001',
        FECHA_CREACION: createDate,
        FECHA_DESDE: fromDate,
        FECHA_HASTA: toDate
    },
    {
        ID_OFERTA: '2',
        ID_PRDUCTO: 22,
        DESCUENTO: 15,
        CODIGO: '0003',
        FECHA_CREACION: createDate,
        FECHA_DESDE: fromDate2,
        FECHA_HASTA: toDate2
    }
]