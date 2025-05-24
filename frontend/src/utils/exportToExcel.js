import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, filename = 'Client_List') => {
    const worksheet = XLSX.utils.json_to_sheet(data);           //to convert json data to excel worksheet format
    const workbook = XLSX.utils.book_new();                         //create new empty workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');       //to add worksheet to workbook

    const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });

    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, `${filename}.xlsx`);
};
