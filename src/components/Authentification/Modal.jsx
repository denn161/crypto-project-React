import  React,{useState} from 'react';
import {Modal,Backdrop,Box,Button,Fade,makeStyles,Tab, Tabs, AppBar} from  '@material-ui/core'
import SignUp from './SignUp';
import Login from './Login';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import CryptoState from '../../hooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color:'#fff',
  padding:20,
  borderRadius:10
};

export default function AuthModal() {

const useStyles =makeStyles({
     
  btn:{
      padding:'10px 20px',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#eebc1d',
      width:'100px',
      color:'#000',
      transition:'all .4s ease',
      '&:hover':{
          color:'#fff'
      }
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },




})

const classes =useStyles()

  const [open, setOpen] =useState(false);

  const [value, setValue] = useState(0);
   
  const {setAlert}=CryptoState()

  const handleChange=(e,newValue)=>{
    setValue(newValue)
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle=()=>{
   signInWithPopup(auth,googleProvider).then((res)=>{
    setAlert({
      open:true,
      message:`Sign Up Successful.Welcome ${res.user.email}`,
      type:'success'
  })
    handleClose()
   }).catch((error)=>{
    setAlert({
      open:true,
      message:`Sign Up Error.Error: ${error.message}`,
      type:'error'
  })
   })

   return

  }

  return (
    <>
      <Button className={classes.btn} varinat='contained'  onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar position='static'
                style={{
                    backgroundColor: "transparent",
                    color: "white",
                  }}>
              <Tabs value={value}
                onChange={handleChange}
                variant="fullWidth"
                style={{ borderRadius: 10 }}>
              <Tab label="Login" />
              <Tab label="Sign Up" />
              </Tabs>
            </AppBar>
            {value===0?<Login handleClose={handleClose}/>:<SignUp handleClose={handleClose}/>}
            <Box className={classes.google}>
                   <span>QR</span>
             <GoogleButton style={{width:'100%'}} onClick={signInWithGoogle}/>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}