
import React,{useState} from 'react'
import { Box, TextField,Button} from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'
import CryptoState from '../../hooks'

function Login({handleClose}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAlert}=CryptoState()


    const handleSubmit= async()=>{

        if(!email||!password){
            setAlert({
                open:true,
                message:`Please fill all the Fields`,
                type:'error'
            })

            return

        }
        try {
            const result =await signInWithEmailAndPassword(auth,email,password)
            setAlert({
                open:true,
                message:`Login Successful.Welcome to our site`,
                type:'success'
            })
            handleClose()
            console.log(result.user)
            
        } catch (error) {
            setAlert({
                open:true,
                message:`User not found.Error: ${error.message}`,
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
        <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
      Sign In
      </Button>
    </Box>
   
  )
}

export default Login