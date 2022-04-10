import React from 'react'
import {Link} from 'react-router-dom'
import {AppBar,Container,Toolbar,Typography,Select,MenuItem,createTheme,ThemeProvider} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AuthModal from './Authentification/Modal'

import CryptoState from '../hooks'
import SelectButton from './SelectButton'
import UserSideBar from './UserSideBar'



const useStyles =makeStyles({
   title:{
       color:'gold',
       fontFamily:'Montserrat',
       fontWeight:'bold',
       cursor:'pointer',
       fontSize:'26px'
   },
   container:{
       display:'flex',      
       paddingTop:'10px',
       paddingBottom:'10px',
       alignItems:'center'
       
   }

})

function Header() {
    const classes=useStyles()
    const darkTheme = createTheme({
        palette: {
          primary:{
              main:'#000'
          },
          type:'dark'
        },
      });    


   const {currency,setCurrency,user,setUser}=CryptoState()  
   
   

  return (
   <ThemeProvider theme={darkTheme}>
        <AppBar color='primary' position='static'>
      <Container >
          <Toolbar className={classes.container}>
        <Link to={'/'}><Typography className={classes.title} variant='h5'>Crypto Hunter</Typography></Link>
          <Select  variant='outlined' style={{
              width:100,
              marginRight:40,
              marginLeft:'auto'
          }}
           onChange={(e)=>setCurrency(e.target.value)} 
            value={currency}>        
           <MenuItem value={'RUB'}>RUB</MenuItem>
           <MenuItem value={'USD'}>USD</MenuItem>             
          </Select>    
         {user?<UserSideBar/>:<AuthModal/>}
          </Toolbar>         
      </Container>
  </AppBar>
   </ThemeProvider>
  )
}

export default Header