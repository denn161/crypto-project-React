import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import CoinPage from './pages/CoinPage'
import Home from './pages/Home'
import { makeStyles } from '@material-ui/styles';
import AlertComp from './components/Authentification/Alert'


  


function App() {


    const useStyles = makeStyles({
        App: {
          backgroundColor: '#14161a',
          color:'white',
          minHeight:'100vh',
          width:'100vw'
         
        },
      });

     const classes = useStyles() 
  


    return (
       <BrowserRouter>
        <div className={classes.App}>
        <Header/>
        <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/coins/:coinId' element={<CoinPage/>}  />
        </Routes> 
        </div>    
        <AlertComp/> 

       </BrowserRouter>
    )
}

export default App
