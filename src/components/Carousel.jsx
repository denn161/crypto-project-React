

import React,{useState,useEffect, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination,Autoplay } from "swiper";
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import {CoinList, TrendingCoins} from '../config/api'
import CryptoState from '../hooks'
import { numberWithCommas } from '../utills';
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";


function Carousel() {

    const useStyles=makeStyles({
        sliderInfo:{
            display:'flex',
            gap:'7px',
            width:'100%'
        }
    })

    const {currency,symbol}=CryptoState() 

    const [currencyList,setCurrencyList] =useState()    

   
   
    const classes = useStyles()  
    
  
    const getCurrencyList = async()=>{
                try {      
        
            const{ data }=await axios.get(TrendingCoins(currency.toLowerCase()))
               setCurrencyList(data)            
        } catch (error) {
            console.log(error)
            
        }
    }
    useEffect(()=>{
     getCurrencyList()

    },[currency])     
  

  return (       
    <>
     <Swiper
        effect={"coverflow"}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        // breakpoints={{            
        //     512: {
        //       width: 640,
        //       slidesPerView: 3,
        //     },
        //     // when window width is >= 768px
        //     // 768: {
        //     //   width: 768,
        //     //   slidesPerView: 6,
        //     // },
        //   }}
        
        spaceBetween={20}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}        
        modules={[EffectCoverflow,Autoplay]}
        className={classes.swiper}
      >
     
        {currencyList?.map((item)=>{
            let profit =item.price_change_percentage_24>=0?'+':'';

            return (
                <SwiperSlide  key={item.id}>
                <Link to={`/coins/${item.id}`}>
                  <img  src={item.image} alt={item.name} />   
                   <div className={classes.sliderInfo}>
                       <span>{item?.symbol}</span>
                       <span style={{color:profit?"rgba(14,203,129)":"red",fontWeight:500}}>{profit} <span>{item?.price_change_percentage_24h?.toFixed(2)+'%'}</span> </span>
                   </div>
                   <p className={classes.sliderInfo}>
                  <span>{symbol}</span>
                   <span>{numberWithCommas(item?.current_price)}</span>
                   </p>             
                </Link>               
            </SwiperSlide>  
            )
        }

            
        )}     
      </Swiper>
    </>
 
  )
}

export default Carousel