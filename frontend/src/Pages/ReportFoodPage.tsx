import { ChangeEvent, MouseEvent, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Grid,
  Input,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import data from '../constants/data.json'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SendIcon from '@mui/icons-material/Send'
import { useReportMealMutation } from '../store/reducers/api-reducer'
import LoaderWithError from '../components/LoaderWithError'

const ReportFoodPage = () => {
  const [reportMeal, { isError, isLoading, error,isSuccess }] = useReportMealMutation()
  const [quantity, setQuantity] = useState<number>(100)
  const [currItem, setItem] = useState<number>(-1)
  const [mealDate, setDate] = useState<dayjs.Dayjs>(dayjs())
  const [sum, setSum] = useState<number>(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const handleReportMeal = () => {
    reportMeal({ date: mealDate.toDate(), totalCalories: sum })
  }
  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const filteredData = data.filter((item) => {
    const searchTerms = searchTerm.toLowerCase().split(' ')
    return searchTerms.every(term =>
      item.hebrew_name.toLowerCase().includes(term) ||
      item.english_name.toLowerCase().includes(term),
    )
  })

  const slicedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  )
  return (
    <div>
      <LoaderWithError isError={isError} error={error} isLoading={isLoading} />
      <Grid sx={{ mt: 2 }} container spacing={3} justifyContent='space-evenly'>
        <Snackbar open={isSuccess} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
          <Alert severity="success" sx={{ width: '100%' }} >
            Meal added successfully
          </Alert>
        </Snackbar>
        <Tooltip title='per 100gr/100ml' arrow>
          <TextField
            label='Search'
            variant='outlined'
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              mb: 4,
              width: { sm: '100%', md: '40%', xs: '100%' },
            }}
          />
        </Tooltip>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            label='Meal date:'
            value={mealDate}
            onChange={(day) => {
              if (day)
                setDate(day)
            }}
          />
        </LocalizationProvider>
        <Box
          sx={{
            width: 'fit-content',
            mb: 3,
            gap: 2,
            bgcolor: 'background.default',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography align='justify' gutterBottom variant='button'>
            {'Current calories for this meal: ' + sum + ' (kcal)'}
          </Typography>
          <Tooltip title='Reset' arrow>
            <Button
              type='submit'
              variant='contained'
              onClick={() => {
                setSum(0)
              }}
              sx={{ color: 'white' }}>
              <RestartAltIcon />
            </Button>
          </Tooltip>
          <Tooltip title='Submit' arrow>
            <Button
              type='submit'
              variant='contained'
              onClick={handleReportMeal}
              sx={{ color: 'white' }}>
              <SendIcon />
            </Button>
          </Tooltip>
        </Box>
      </Grid>
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
          },
        }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Hebrew Name</TableCell>
              <TableCell>English Name</TableCell>
              <TableCell>Protein <b>(gr)</b></TableCell>
              <TableCell>Total Fat <b>(gr)</b></TableCell>
              <TableCell>Carbohydrates <b>(gr)</b></TableCell>
              <TableCell>Food Energy <b>(kcal)</b></TableCell>
              <TableCell>Total Sugars <b>(gr)</b></TableCell>
              <TableCell>Quantity <b>(gr/ml)</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((item) => (
              <TableRow key={item.code}>
                <TableCell data-label='Hebrew Name'>{item.hebrew_name}</TableCell>
                <TableCell data-label='English Name'>{item.english_name}</TableCell>
                <TableCell data-label='Protein (gr)'>{item.protein}</TableCell>
                <TableCell data-label='Total Fat (gr)'> {item.total_fat}</TableCell>
                <TableCell data-label='Carbohydrates (gr)'>{item.carbohydrates}</TableCell>
                <TableCell data-label='Food Energy (kcal)'>{item.food_energy}</TableCell>
                <TableCell data-label='Total Sugars (gr)'>{item.total_sugars}</TableCell>
                <TableCell sx={{ display: 'flex', flexDirection: 'row', gap: 3, alignItems: 'baseline', p: 2 }}
                  data-label='Quantity'>

                  <Input
                    key={item.code}
                    name='quantity'
                    type='number'
                    value={currItem === item.code ? quantity : 100}
                    onFocus={() => {
                      if (currItem !== item.code) setQuantity(100)
                      setItem(item.code)
                    }}
                    onChange={(e) => {
                      setQuantity(Number(e.target.value) > 2000 ? 2000 : Number(e.target.value))
                    }}
                    inputProps={{ min: 0, max: 2000, step: 10, style: { textAlign: 'center' } }}
                    required
                    sx={{ height: 40, width: 60 }}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    onClick={() => {
                      setSum((sum) => sum + ((quantity / 100) * item.food_energy))
                    }}
                    sx={{ color: 'white', height: 40, ml: 2 }}>
                    +
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component='div'
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}

export default ReportFoodPage
