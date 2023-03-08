import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Box, Theme, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { MuiTable } from '../components/Table';
import { CustomBackDrop } from '../components/CustomBackDrop';
import { CustomButton } from '../components/CustomButton';
import { ComboBox } from '../components/MuiComboBox';
import { MuiModal } from '../components/MuiModal';
import { FTextField } from '../components/FTextField';
import ReactDateInputs from 'react-date-inputs';

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is a required field')
    .matches(/^[a-z ,.'-]+$/i, 'Please enter a valid Name'),
  surname: Yup.string()
    .required('Surname is a required field')
    .matches(/^[a-z ,.'-]+$/i, 'Please enter a valid Surname'),
  jobTitle: Yup.object().required('Please select a Job Title'),
  project: Yup.object().required('Please select employee Projects'),
  skills: Yup.object().required('Please select employee Skills'),
  dob: Yup.date().required('Date of birth is required')
});

interface IEmployee {
  projectName: string;
  startDate: string;
  endDate: string;
  employees: number;
  cost: string;
}

interface IColumn {
  id: 'projectName' | 'startDate' | 'endDate' | 'employees' | 'cost';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: readonly IColumn[] = [
  {
    id: 'projectName',
    label: 'Project Name',
    align: 'center',
  },
  {
    id: 'startDate',
    label: 'Start Date',
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'endDate',
    label: 'End Date',
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'employees',
    label: 'Employees',
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'cost',
    label: 'Cost',
    align: 'center',
    format: (value: number) => value.toFixed(0),
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    marginTop: theme.spacing(10),
    margin: theme.spacing(5),
  },
  statusColor: {
    width: theme.spacing(1.2),
    height: theme.spacing(1.2),
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  excelText: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
  },
  excelContainer: {
    marginRight: theme.spacing(2),
  },
  error: {
    color: '#d32f2f',
    fontSize: theme.spacing(1.7),
    fontWeight: '400',
    lineHeight: 1.66,
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [employees, setEmployees] = React.useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);

      // Make api to you backend to get the data the modify it and set state to display the data on the table
      // On success set loading to false and on failer set loading to false
      // Make use of the try catch
      // Your api call logic should
      setEmployees([
        {
          projectName: 'Building',
          startDate: '12/02/2022',
          endDate: '12/02/2022',
          employees: 12,
          cost: 'R50.55',
        },
        {
          projectName: 'Renovation',
          startDate: '12/02/2022',
          endDate: '12/02/2022',
          employees: 50,
          cost: 'R5000.55',
        },
      ]);

      setIsLoading(false);
    })();
  }, []);

  function addEmployee() {
    return (
      <MuiModal open={showModal} setOnClose={setShowModal}>
        <Typography variant='h5'>Add A New Employee</Typography>
        <Typography style={{ marginTop: 10, marginBottom: 15 }} component='div'>
          Fill in all fields and click save to add a new employee
        </Typography>
        <Formik
          initialValues={{
            name: '',
            surname: '',
            jobTitle: '',
            project: '',
            skills: '',
            dob: new Date(),
          }}
          enableReinitialize={true}
          validationSchema={ValidationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);

              // Do your logic here to add a new employee
              // The api call should be in file called employeeService inside service directory
              // Don't add too much logic here

              // on success of the api call show the success message here
              // Also update your state with the added employee so that the data can show on the table
              swal('Oops!!!', 'Employee was succefully added', 'success');

              setShowModal(false);
              setSubmitting(false);
            } catch (err) {
              swal('Oops!!!', 'Something went wrong please try again', 'error');
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FTextField
                    type='text'
                    name='name'
                    label='Name'
                    placeholder='Name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <FTextField
                    type='text'
                    name='surname'
                    label='Surname'
                    placeholder='Surname'
                  />
                </Grid>
                <Grid item xs={12}>
                  <ComboBox
                    label='Job Title'
                    // Data will be pulled frm the backend I believe
                    data={[
                      {
                        type: 'value 1',
                        label: 'value 1',
                      },
                      {
                        type: 'value 2',
                        label: 'value 2',
                      },
                    ]}
                    error={errors.jobTitle}
                    handleChange={(_: any, val: any) =>
                      setFieldValue('jobTitle', val)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <ComboBox
                    multiple={true}
                    label='Projects'
                    // Data will be pulled frm the backend I believe
                    data={[
                      {
                        type: 'value 1',
                        label: 'value 1',
                      },
                      {
                        type: 'value 2',
                        label: 'value 2',
                      },
                    ]}
                    error={errors.project}
                    handleChange={(_: any, val: any) =>
                      setFieldValue('project', val)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <ComboBox
                    multiple={true}
                    label='Skills'
                    // Data will be pulled frm the backend I believe
                    data={[
                      {
                        type: 'value 1',
                        label: 'value 1',
                      },
                      {
                        type: 'value 2',
                        label: 'value 2',
                      },
                    ]}
                    error={errors.skills}
                    handleChange={(_: any, val: any) =>
                      setFieldValue('skills', val)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReactDateInputs
                    label="Date of birth"
                    value={values.dob}
                    onChange={(val) => {
                      setFieldValue('dob', val);
                    }}
                  />
                </Grid>
                {
                  // @ts-ignore
                  errors.dob && <Typography className={classes.error}>{errors.dob}</Typography>
                }
                <Box
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    marginTop: 30,
                  }}
                >
                  <Grid item xs={2} marginRight={2}>
                    <CustomButton
                      styles={{
                        background: 'rgb(238, 239, 240)',
                        color: '#000',
                        ':hover': {
                          background: 'rgb(238, 239, 240)',
                        },
                      }}
                      handleClick={() => setShowModal(false)}
                    >
                      Cancel
                    </CustomButton>
                  </Grid>
                  <Grid item xs={2}>
                    <CustomButton type='submit'>Save</CustomButton>
                  </Grid>
                </Box>
              </Grid>
            </form>
          )}
        </Formik>
      </MuiModal>
    );
  }

  return (
    <Box className={classes.tableContainer}>
      <Box style={{ width: 200, marginBottom: 20 }}>
        <CustomButton
          handleClick={() => {
            setShowModal(true);
          }}
        >
          <AddCircleOutlineIcon style={{ marginRight: 10 }} />
          Add Employee
        </CustomButton>
      </Box>
      <MuiTable rows={employees} columns={columns} />
      <CustomBackDrop loading={isLoading} />
      {addEmployee()}
    </Box>
  );
};
