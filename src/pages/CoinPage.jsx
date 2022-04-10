import React, { useState,useEffect,useCallback } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import CryptoState from '../hooks'
import { SingleCoin} from '../config/api'
import { Button, makeStyles } from '@material-ui/core'
import CoinInfo from '../components/CoinInfo'
import { numberWithCommas } from '../utills'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { async } from '@firebase/util'

function CoinPage() {

  const [coin,setCoin]=useState()

 const {coinId}=useParams()
  
  const useStyles =makeStyles((theme)=>({

    container:{
      display:'flex',
      width:'100%',
      height:'100vh',
      [theme.breakpoints.down('md')]:{
        flexDirection:'column',
        alignItems:'center',
        height:'100%',
        width:'100%'
      }

    },
    sideBar:{
      flex:'0 1 30%',
      borderRight:'2px solid #ccc',
      flexDirection:'column',
      padding:'25px 10px',
      [theme.breakpoints.down('md')]:{
        borderRight:'none',
        flex:'0 1 100%'
      }
    },
    diagramma:{
      flex:'0 1 70%',
      [theme.breakpoints.down('md')]:{
         flex:'0 1 100%'
      }
    },
    image:{
       display:'flex',
       flexDirection:'column',
       alignItems:'center',
       gap:15
    },
    name:{
      marginTop:10,
      fontSize:'36px',
      fontWeight:'bold',

    },
    text:{
      color:'#fff',
      letterSpacing:'2px',
      textAlign:'left',
      marginTop:20,
      width:'100%',
      fontSize:'20px',
      [theme.breakpoints.down('md')]:{
        textAlign:'center',
       
     }
    },
    marketData:{
      marginTop:30,
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      gap:20

    },
    marketTitle:{
      fontWeight:'bold',
      fontSize:'30px',


    },
    marketPrice:{
      color:'darkgrey',
      fontSize:'26px',
      fontWeight:500

    },
    marketInfo:{
      display:'flex',
      gap:15,
      alignItems:'center',
      
    },
    img:{
      height:200,
      objectFit:'cover',
      maxWidth:200,
      width:'100%'
    }

  }))
  const classes = useStyles()  

  const {currency,symbol,user,watchList,setAlert}=CryptoState()

   const fetchCoin = useCallback(async()=>{

    try {     
      const {data} = await axios.get(SingleCoin(coinId))
       setCoin(data)      
      
    } catch (error) {
      console.log(error)
      
    }
  },[coinId])

  const isWatchList = watchList?.includes(coin?.id)

  const addToWatchList = async ()=>{
   const coinRef =doc(db,'watchlist',user.uid)

     try {
       await setDoc(coinRef,{
         coins:watchList?[...watchList,coin?.id]:[coin?.id],

       });
       setAlert({
        open:true,
        message:`${coin?.name} Added to the our Watchlist`,
        type:'success'
    })
       
     } catch (error) {
      setAlert({
        open:true,
        message:`Error.Error: ${error.message}`,
        type:'error'
    })
       
     }

  }

  const removeCoinFromWatchList= async()=>{

    const coinRef =doc(db,'watchlist',user.uid)

    try {
      await setDoc(coinRef,{
        coins:watchList?.filter((item)=>item !==coin?.id),

      },
      {merge:true}
      );
      setAlert({
       open:true,
       message:`${coin?.name} Remove from of the our Watchlist`,
       type:'success'
   })

      
    } catch (error) {
     setAlert({
       open:true,
       message:`Error.Error: ${error.message}`,
       type:'error'
   })
      
    }

  }






  useEffect(()=>{
    fetchCoin()

  },[fetchCoin]) 
  return (
    <div className={classes.container}>
     <div className={classes.sideBar}>
       <div className={classes.image}>
         <img className={classes.img}  src={coin?.image?.large} alt={coin?.name} />
         <p className={classes.name}>{coin?.name}</p>
         <div  className={classes.text} dangerouslySetInnerHTML={{__html:coin?.description?.en.slice(0,290)}}></div>
       </div>
       <div  className={classes.marketData} >
         <div className={classes.marketTitle} >Rank:&nbsp;<span style={{color:'darkgray'}}>{coin?.market_cap_rank}</span></div>
         <div  className={classes.marketInfo}>
           <div className={classes.marketTitle}>Current Price:</div>
           <div className={classes.marketPrice}>{currency.toLowerCase()==='rub'? coin?.market_data?.current_price?.rub:
            coin?.market_data?.current_price?.usd }{symbol}</div>
         </div>
         <div className={classes.marketInfo}>
         <div className={classes.marketTitle}>Market Cap:</div>
           <div  className={classes.marketPrice}>{symbol}{coin&&numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()]).slice(0,-6)+'M'
          }</div>

         </div>
       </div>
       {user&& (
         <Button style={{
           width:'100%',
           height:40,
           backgroundColor:isWatchList?'blue':'#eebc1D',
           cursor:'pointer',
           display:'flex',
           justifyContent:'center',
           aligtnItems:'center',
           marginTop:40,
           color:isWatchList?'#fff':'#000',
           fontWeight:isWatchList?'bold':500
          }} 
           onClick={isWatchList?removeCoinFromWatchList:addToWatchList}>
         {isWatchList?'Remove from Watchlist':'Add to Watchlist'}
         </Button>
       )}
     </div>
     <div className={classes.diagramma}>
      <CoinInfo coin={coin}/>
     </div>

    </div>
  )
}

export default CoinPage