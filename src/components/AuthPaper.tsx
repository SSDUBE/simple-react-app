import { makeStyles } from '@mui/styles';
import { Box, Typography, Paper, Theme } from '@mui/material';
import BackgroundImg from '../assets/work.jpeg';
import { theme } from '../Theme';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    position: 'relative',
    height: '100vh',
  },
  backgroundImage: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    zIndex: -1,
  },
  paperContainer: {
    width: 'auto',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    padding: theme.spacing(5),
  },
  paper: {
    position: 'relative',
    background: theme.palette.common.white,
    width: theme.spacing(65),
    marginTop: theme.spacing(9),
  },
  header: {
    height: theme.spacing(18),
    background: theme.palette.primary.light,
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(-9),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    height: '100vh',
    width: '100%',
    objectFit: 'cover',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -999,
  },
}));

interface Props {
  children: JSX.Element;
  title: string;
  subTitle: string;
}

export const AuthPaper = ({
  children,
  title,
  subTitle,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <img src={BackgroundImg} alt='logo' className={classes.backgroundImage} />
      <Box className={classes.paperContainer}>
        <Paper elevation={3} className={classes.paper}>
          <Box className={classes.subContainer}>
            <Box className={classes.header}>
              <Typography
                variant='h3'
                align='center'
                color={theme.palette.common.white}
              >
                {title}
              </Typography>
              <Typography align='center' color={theme.palette.common.white}>
                {subTitle}
              </Typography>
            </Box>
            {children}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
