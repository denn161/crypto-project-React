import { CircularProgress, createTheme,ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React,{useState,useEffect, useCallback} from 'react'
import { Line } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { chartDays } from '../config/data'
import {HistoricalChart} from '../config/api'
import CryptoState from '../hooks'
import SelectButton from './SelectButton'

function CoinInfo({coin}) {

  const[historicalData,setHistoricalData]=useState(null)

  const [days,setDays]=useState(1)  

  const timeToDate = historicalData?.map((coin)=>{
    let date=new Date(coin[0])
    let time = date.getHours()>12?`${date.getHours()-12}:${date.getMinutes()}PM`:
     `${date.getHours()}:${date.getMinutes()}AM`
      return days===1 ? time : date.toLocaleDateString()
  })

  const {currency}=CryptoState()

  const {coinId}=useParams()

  const darkTheme = createTheme({
    palette: {
      primary:{
          main:'#fff'
      },
      type:'dark'
    },
  });
 
  const useStyles =makeStyles((theme)=>({     
    container:{
      width:'75%',
      height:'100%',
      padding:40,
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      [theme.breakpoints.down('md')]:{
          width:'100%',
          padding:20
      }
      
       
    },
    btns:{
      display:'flex',
      flexWrap:'wrap',
      justifyContent:'space-around',
      alignItems:'center',
      marginTop:30,
      width:'100%',
      gap:20

    }

  }))

  const classes =useStyles()


const  fethHistoricalCoin = useCallback(async()=>{
       
    try {
      const{ data}= await axios.get(HistoricalChart(coinId,days,currency))
      setHistoricalData(data.prices)
    } catch (error) {
      console.log(error)
      
    }
  },[currency,coinId,days])

  useEffect(()=>{
    fethHistoricalCoin()

  },[fethHistoricalCoin])
    
  return (
   <ThemeProvider theme={darkTheme}>
    <div className={classes.container}>

     {!historicalData?(
       <CircularProgress
        style={{color:'gold'}} size={250} thickness={1}/>
     ):(
       <>
      <Line data={{
        labels:timeToDate,
        datasets:[
          {
            data:historicalData?.map((coin)=>coin[1]),
            label:`Price ( Past ${days} ${days===1?'Day':'Days'} ) in ${currency}`,
            borderColor: "#EEBC1D",
          },
        ],
      
      }} 

      options={{

        elements:{
          point:{
            radius:1,
          }
        }
      }}
      
      />
      <div className={classes.btns}>
        {chartDays.map((day)=>
         <SelectButton  key={day.value}
          onClick={()=>setDays(day.value)}
         
          selected={day.value===days}         
         >

           {day.label}
         </SelectButton>
        )}
      </div>
    </>     

     )}   

    </div>
   </ThemeProvider>
  )
}

export default CoinInfo