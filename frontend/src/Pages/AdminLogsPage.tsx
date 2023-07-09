import {
    Alert,
    LinearProgress,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useGetAllLogsQuery } from "../store/reducers/api-reducer";
import { LogRow } from "../types/ApiTypes";
import ExportExcel from "../components/ExportExel";
import { isErrorWithDataAndMessage } from "../helpers/helpers";

const AdminLogsPage = () => {
    const { data, isLoading, isError,error } = useGetAllLogsQuery('');
    const allLogs = data?.allLogs || [] as LogRow[];
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
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
    const filteredData = allLogs.filter((item) => {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term =>
            item.userEmail.toLowerCase().includes(term) ||
            item.url.toLowerCase().includes(term) ||
            item.method.toLowerCase().includes(term) ||
            item.status.includes(term)
        );
    });
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const slicedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    return (
        <div>
            <Snackbar open={isError} autoHideDuration={7000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {isErrorWithDataAndMessage(error) && error.data.message || 'Something went wrong'}
                </Alert>
            </Snackbar>
            {isLoading && <LinearProgress />}
            <TextField
                label="Search by email, url, method, status"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                    mb: 4
                }}
            />
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
                            <TableCell>User</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>HTTP Method</TableCell>
                            <TableCell>URL</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slicedData.map((item) => (
                            <TableRow key={`${item.url}-${item.date}-${item.userEmail}`} >
                                <TableCell data-label="User">{item.userEmail}</TableCell>
                                <TableCell data-label="Date"> {item.date.replace("T", " ").substring(0, 16)}</TableCell>
                                <TableCell data-label="HTTP Method">{item.method}</TableCell>
                                <TableCell data-label="URL" >{item.url}</TableCell>
                                <TableCell data-label="Status">{item.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={allLogs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <ExportExcel csvData={allLogs} fileName={"logs"} />
            </TableContainer>
        </div>
    );
};

export default AdminLogsPage;
