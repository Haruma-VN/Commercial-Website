import React from "react";
import * as XLSX from "xlsx";

const ExcelExport: React.FC<{ jsonData: Array<unknown>; fileName: string; sheetName: string }> = ({ jsonData, fileName, sheetName }) => {
    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(jsonData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };
    return (
        <button className="btn btn-success" onClick={handleExport}>
            Xuất Excel
        </button>
    );
};

export default ExcelExport;
