import React,{useState} from 'react'
import { Box, TextField,Button } from '@material-ui/core'
import CryptoState from '../../hooks'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

function SignUp({handleClose}) {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState("")   

const {setAlert}=CryptoState()


const handleSubmit= async ()=>{
   
    if(confirmPassword!==password){
       setAlert({open:true,message:'Passwords don not match!Try again...',type:'error'})
       
       return
    }
    try {
        const result =await createUserWithEmailAndPassword(auth,email,password)
        setAlert({
            open:true,
            message:`Sign Up Successful.Welcome ${result.user.email}`,
            type:'success'
        })
        handleClose()
        
    } catch (error) {
        setAlert({
            open:true,
            message:`Sign Up Error.Error: ${error.message}`,
            type:'error'
        })
        
    }
   

}

  return (
    <Box p={3} style={{display:'flex',flexDirection:'column',gap:'20px',width:'100%'}}>
     <TextField
     variant='outlined'
     value={email}
      type='email'
      label='Enter email'
      onChange={(e)=>setEmail(e.target.value)}
      fullWidth/>        
      <TextField
      variant='outlined'
      value={password}
      type='password'
      label='Enter password'
      onChange={(e)=>setPassword(e.target.value)}
      fullWidth/>
      <TextField
      variant='outlined'
      value={confirmPassword}
      type='password'
      label='Confirm password'
      onChange={(e)=>setConfirmPassword(e.target.value)}
      fullWidth/>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={()=>handleSubmit()}
      >
      Sign Up
      </Button>
    </Box>
  )
}

export default SignUp