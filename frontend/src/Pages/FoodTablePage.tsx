import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import data from "../constants/data.json";

const FoodTablePage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      item.hebrew_name.toLowerCase().includes(searchTermLower) ||
      item.english_name.toLowerCase().includes(searchTermLower)
    );
  });

  const slicedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hebrew Name</TableCell>
              <TableCell>English Name</TableCell>
              <TableCell>Protein <b>(gr)</b></TableCell>
              <TableCell>Total Fat <b>(gr)</b></TableCell>
              <TableCell>Carbohydrates <b>(gr)</b></TableCell>
              <TableCell>Food Energy <b>(kcal)</b></TableCell>
              <TableCell>Total Sugars <b>(gr)</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((item) => (
              <TableRow key={item.Code}>
                <TableCell>{item.hebrew_name}</TableCell>
                <TableCell>{item.english_name}</TableCell>
                <TableCell>{item.protein}</TableCell>
                <TableCell>{item.total_fat}</TableCell>
                <TableCell>{item.carbohydrates}</TableCell>
                <TableCell>{item.food_energy}</TableCell>
                <TableCell>{item.total_sugars}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default FoodTablePage;
