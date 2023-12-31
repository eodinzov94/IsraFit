import FlagIcon from '@mui/icons-material/Flag'
import SubjectIcon from '@mui/icons-material/Subject'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import LoaderWithError from '../components/LoaderWithError'
import { useAppSelector } from '../store/hooks'
import { useUpdateGoalMutation } from '../store/reducers/api-reducer'
import { IUser } from '../types/ApiTypes'

export default function GoalSetPage() {
  const [alertMessage, setMessage] = useState<string>('')
  const [calories, setCalories] = useState<number>(0)
  const navigate = useNavigate()
  const [setGoal, { isError, isLoading, error }] = useUpdateGoalMutation()
  const user = useAppSelector(state => state.auth.user) as IUser
  const GoalSchema = z.object({
    weightGoal: z.number({ required_error: 'Please choose a goal!' })
      .gte(35, 'Weighing below 35kg is not recommended')
      .lte(250, 'Over 250kg as a goal is too high, try something lower!'),
  })
  const formik = useFormik({
    initialValues: {
      weightGoal: user.weight - 1, dateGoal: dayjs().add(30, 'days'),
    }, validationSchema: toFormikValidationSchema(GoalSchema),
    onSubmit: values => {

      // Algebra, from formulas
      const totalCalorieDeficit = Math.abs((user.weight - values.weightGoal) * 7700)
      const avgDailyDeficit = totalCalorieDeficit / values.dateGoal.diff(dayjs(), 'days')
      const TDEEDeficit = user.TDEE - avgDailyDeficit

      // validate bad life choices by the user.
      checkDeficit(TDEEDeficit)

    },
  })

  /** Edge cases for weight selection*/
  const onWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const goal = parseInt(e.target.value) || 0
    if (!goal)
      setMessage('Please enter a valid number')
    else if (!(goal > 50 && goal < 150)) {
      setMessage('This weight is unhealthy, please reconsider!')
    } else if (goal === user.weight) {
      setMessage('You are already at your goal!')
    } else {
      setMessage('')
    }
    formik.setFieldValue('weightGoal', goal ? goal : '')
    if (!goal && calories)
      setCalories(0)
  }

  /**Check if the user chose values that are too extreme - we can't allow too rapid weight change, it's unhealthy.*/
  const checkDeficit = (TDEEDeficit: number) => {
    const lowerLimit = user.gender === 'Male' ? 1500 : 1200
    const upperLimit = user.gender === 'Male' ? 2000 : 1600
    if (formik.values.weightGoal === user.weight) {
      setMessage('You are already at your goal!')
    } else if (TDEEDeficit < lowerLimit && user.weight > formik.values.weightGoal) {
      setMessage('WARNING! This weight loss plan is too aggressive!')
    } else if (TDEEDeficit > upperLimit && user.weight < formik.values.weightGoal) {
      setMessage(`WARNING! You're risking over-eating!`)
    } else {
      setCalories(TDEEDeficit)
    }
  }

  const handleSetGoal = () => {
    setGoal(
      {
        endDate: formik.values.dateGoal.toDate(),
        goalWeight: formik.values.weightGoal,
        recommendedCalories: calories
      }
    ).then((response: any) => {
      if(response.data.status === 'OK'){
        navigate('/dashboard')
      }
    })
    
  }
  return (<Container component='main' maxWidth='sm'>
    <CssBaseline />
    <Box
      sx={{
        bgcolor: 'background.default',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '20px',
        marginTop: 8,
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {calories === 0 ? (
        <>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <FlagIcon />
          </Avatar>
          <Typography variant='h6' gutterBottom>
            Ready to reach your next fitness milestone?
          </Typography>
          <Typography variant='body1' gutterBottom>
            Tell us more about what you're trying to achieve!
          </Typography>
          <Divider style={{ width: '100%', marginTop: '20px' }} />
          <Grid component='form' onSubmit={formik.handleSubmit} container spacing={3} mt={3}>
            <Typography variant='subtitle1' gutterBottom marginLeft='20px' marginBottom='-5px'>
              1) First, what weight are you trying to reach?
            </Typography>
            <Grid item xs={12} container justifyContent='center'>
              <TextField
                required
                id='weightGoal'
                name='weightGoal'
                label='Your weight goal is: (kg)'
                type='number'
                onChange={onWeightChange}
                onBlur={formik.handleBlur}
                value={formik.values.weightGoal}
                error={(formik.touched.weightGoal && Boolean(formik.errors.weightGoal))}
                helperText={alertMessage}
                color={alertMessage.length > 0 ? 'warning' : 'primary'}
                FormHelperTextProps={{
                  sx() {
                    return {
                      color: 'warning.main',
                    }
                  },
                }}
              />
            </Grid>
            <Divider style={{ width: '96%', margin: '40px 0 20px 20px' }} />
            <Typography variant='subtitle1' gutterBottom marginLeft='20px' marginBottom='-5px' marginTop='20px'>
              2) Second, how long do we have?
            </Typography>
            <Grid item xs={12} container justifyContent='center'>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  label='Your deadline is:'
                  value={formik.values.dateGoal}
                  onChange={(day) => {
                    formik.setFieldValue('dateGoal', day)
                    setMessage('')
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, color: 'white' }}
              >
                Ready!
              </Button>
            </Grid>
          </Grid>
        </>)
        :
        <Grid component='form'
          onSubmit={() => {
            navigate('/food-table') //TODO
          }}
        >
          <LoaderWithError isError={isError} error={error} isLoading={isLoading} />
          <Grid item xs={12} container justifyContent='center'>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <SubjectIcon />
            </Avatar>
          </Grid>
          <Typography align='center' variant='h6' gutterBottom>
            {'According to our calculations, to reach your goal you should maintain a diet of: '}
          </Typography>
          <Typography align='center' color='cornflowerblue' variant='h5' gutterBottom>
            {calories.toFixed(0)}
          </Typography>
          <Typography align='center' variant='h6' gutterBottom>
            {' calories per day for the whole duration'}
          </Typography>
          <Typography align='center' sx={{ color: 'warning.main' }} variant='subtitle1' marginTop='35px' gutterBottom>
            {'Unhappy with the result? let\'s try a different goal!'}
          </Typography>
          <Grid container sx={{ justifyContent: 'center' }} item xs={12}>
            <Button
              type='submit'
              variant='contained'
              sx={{ mb: 2, color: 'white' }}
              onClick={() => setCalories(0)}
            >
              Go back
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleSetGoal}
              variant='contained'
              fullWidth
              sx={{ mb: 2, mt: 2, color: 'white' }}
            >
              Confirm and start your journey!
            </Button>

          </Grid>
        </Grid>
      }
      <Stepper activeStep={calories ? 1 : 0}>
        {[{ label: 'Set a goal', index: 0 }, { label: 'Calorie recommendation', index: 1 }].map(({ label, index }) => {
          return (
            <Step key={index}>
              <StepLabel>{label} </StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  </Container>)
}