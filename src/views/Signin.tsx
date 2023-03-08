import { Box, Typography, Link, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FTextField } from '../components/FTextField';
import { AuthPaper } from '../components/AuthPaper';
import swal from 'sweetalert';
import BounceLoader from 'react-spinners/BounceLoader';
import { theme } from '../Theme';
import { CustomButton } from '../components/CustomButton';

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: Yup.string().required('Password is required'),
});

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: 600,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Signin = () => {
  const classes = useStyles();

  return (
    <AuthPaper title='Welcome' subTitle='Sign into your account'>
      <Box className={classes.formContainer}>
        <Box className={classes.subContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={ValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);

                // Do the api request here using axios to the backend then navigate to home on success
                console.log('Values ', values);
                setSubmitting(false);
              } catch (err) {
                swal(
                  'Oops!!!',
                  'Something went wrong please try again',
                  'error'
                );
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
            }) => (
              <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FTextField
                      type='text'
                      name='email'
                      label='Email'
                      placeholder='Email'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FTextField
                      type='password'
                      name='password'
                      label='Password'
                      placeholder='Password'
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 12 }}>
                    <CustomButton type='submit' disabled={isSubmitting}>
                      {!isSubmitting ? (
                        'SIGN IN'
                      ) : (
                        <BounceLoader
                          size={25}
                          color={theme.palette.common.white}
                          loading={true}
                        />
                      )}
                    </CustomButton>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      marginTop: 12,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>
                      Don't have an account?{' '}
                      <Link href='signin' underline='hover'>
                        Sign up
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </AuthPaper>
  );
};

export default Signin;
