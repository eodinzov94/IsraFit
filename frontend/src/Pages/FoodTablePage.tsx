import { ChangeEvent, MouseEvent, useState } from "react";
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
  Tooltip
} from "@mui/material";
import data from "../constants/data.json";

const FoodTablePage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((item) => {
    const searchTerms = searchTerm.toLowerCase().split(' ');
    return searchTerms.every(term => 
      item.hebrew_name.toLowerCase().includes(term) || 
      item.english_name.toLowerCase().includes(term)
    );
  });

  const slicedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div>
      <Tooltip title="per 100gr/100ml" arrow>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          mb: 4,
          width:{sm:'100%', md:'40%',xs:'100%'},
        }}
      />
      </Tooltip>
      <TableContainer component={Paper}>
        <Table sx={{
          '@media screen and (max-width: 800px)': {
            '& thead': {
              display: 'none',
            },
            '& tr': {
              borderBottom: '3px solid #ddd',
              display: 'block',
              marginBottom: '.625em',
            },
            '& td': {
              borderBottom: '1px solid #ddd',
              display: 'block',
              fontSize: '.8em',
              textAlign: 'right',
              '&::before': {
                content: 'attr(data-label)',
                float: 'left',
                fontWeight: 'bold',
              },
              '&:last-child': {
                borderBottom: 0,
              },
            },
          }
        }}
        >
          <TableHead>
            <TableRow >
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
              <TableRow key={item.code} >
                <TableCell data-label="Hebrew Name">{item.hebrew_name}</TableCell>
                <TableCell data-label="English Name">{item.english_name}</TableCell>
                <TableCell data-label="Protein (gr)" >{item.protein}</TableCell>
                <TableCell data-label="Total Fat (gr)"> {item.total_fat}</TableCell>
                <TableCell data-label="Carbohydrates (gr)">{item.carbohydrates}</TableCell>
                <TableCell data-label="Food Energy (kcal)">{item.food_energy}</TableCell>
                <TableCell data-label="Total Sugars (gr)">{item.total_sugars}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
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
