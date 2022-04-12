import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
interface MySnackbarInterface{
    openBar: boolean;
    message: string;
}
export default function MySnackbar({openBar,message}:MySnackbarInterface) {
  const [open, setOpen] = React.useState(openBar);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    
    setOpen(false);
  };
  React.useEffect(() =>{
    setOpen(true)
    console.log('use Effect chla')
  },[openBar])
  console.log("Aya")
  return (
    
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
  
      </Snackbar>
     
    

  );
}
