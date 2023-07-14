import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';



const mockData = [
    {
        Date: '1/1/2022',
        ReportType: 'Food',
        ValueReported: 1000,
    },
    {
        Date: '1/1/2022',
        ReportType: 'Food',
        ValueReported: 1000,
    },
    {
        Date: '1/1/2022',
        ReportType: 'BMI',
        ValueReported: 67.5,
    }
]

const LastReports = () => {

    return (
        <div>
            <div>
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
                                <TableCell>Date</TableCell>
                                <TableCell>Report Type</TableCell>
                                <TableCell>Value Reported</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockData.map((item, index) => (
                                <TableRow key={index} >
                                    <TableCell data-label="Date">{item.Date}</TableCell>
                                    <TableCell data-label="Report Type">{item.ReportType}</TableCell>
                                    <TableCell data-label="Value Reported" >{`${item.ValueReported} (${item.ReportType === 'Food' ? 'kcal' : 'kg'}) `}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default LastReports;