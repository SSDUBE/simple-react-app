import { FunctionComponent } from 'react';
import { Button } from '@mui/material';
import { theme } from '../Theme';

interface ICustomButton {
  href?: string;
  title?: string;
  type?: any;
  disabled?: boolean;
  styles?: any;
  handleClick?: () => void;
  children: any;
}

export const CustomButton: FunctionComponent<ICustomButton> = ({
  href,
  title,
  disabled = false,
  children,
  type = 'reset',
  handleClick,
  styles,
}) => {
  return (
    <Button
      href={href}
      disabled={disabled}
      type={type}
      onClick={handleClick ? handleClick : () => {}}
      sx={{
        background: theme.palette.primary.light,
        color: theme.palette.common.white,
        borderRadius: theme.spacing(5),
        width: '100%',
        height: theme.spacing(6),
        ':hover': {
          background: theme.palette.primary.light,
        },
        ...styles,
      }}
    >
      {title || children}
    </Button>
  );
};