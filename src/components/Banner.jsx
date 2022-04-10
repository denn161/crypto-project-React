import { makeStyles} from '@material-ui/styles'
import {Container,Typography} from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel'

const useStyles=makeStyles({   
    bannerContent:{
         width:'100%',
         paddingTop:25,  
         paddingBottom:25,
         display:'flex',
         flexDirection:'column',
         alignItems:'center',
         justifyContent:'space-around'        

    },
    title:{
        fontWeight:'bold',
        marginBottom:15,
        color:'#fff'


    },
    content:{
        height:'40%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    
    }

})

function Banner() {
    const classes =useStyles()
  return (
    <div className='banner' >      
              
       <Container className={classes.bannerContent}>
         <div className={classes.content}>
         <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>          

         </div>
       <Carousel/>
       </Container>
            
          
             
     
    </div>
  )
}

export default Banner