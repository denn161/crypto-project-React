import { Snackbar } from '@material-ui/core'
import React from 'react'
import CryptoState from '../../hooks'
import MuiAlert from '@material-ui/lab/Alert'


function AlertComp() {

    const {alert,setAlert}=CryptoState()
  
       
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setAlert({open:false})
      };

  return (
     <>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert style={{padding:'15px'}}  onClose={handleClose} elevation={10} variant='filled' severity={alert.type}>
        <p style={{fontSize:'16px',fontWeight:'bold'}}>   {alert.message}</p>
        </MuiAlert>
      </Snackbar>
     </>
  )
}

export default AlertComp