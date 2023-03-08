import { FunctionComponent } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface ICustomBackDrop {
  loading: boolean;
}

export const CustomBackDrop: FunctionComponent<ICustomBackDrop> = ({
  loading,
}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 9999, width: '100%', height: '100%' }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
