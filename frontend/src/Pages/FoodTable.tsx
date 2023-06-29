import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Papa from "papaparse";
interface TableData {
  [key: string]: string;
}

function createFileObjectFromPath(path: string, mimeType: string): File {
  const fileParts = path.split("\\");
  const fileName = fileParts[fileParts.length - 1];

  return new File([path], fileName, { type: mimeType });
}

const FoodTable: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]); //TODO:dont use any

  useEffect(() => {
    const csvFile = createFileObjectFromPath(
      import.meta.env.VITE_CSV_LOCATION,
      "text/csv"
    );
    Papa.parse(csvFile, {
      header: true,
      complete: function (results) {
        console.log("Data is: ", results);
        // setTableData(results.data); TODO:Fix
        setTableData([
          {
            column1: "value1",
            column2: "value2",
            column3: "value3",
            column4: "value4",
          },
        ]);
      },
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {tableData[0] &&
              Object.keys(tableData[0]).map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row: TableData, index) => (
            <TableRow key={index}>
              {Object.values(row).map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FoodTable;
