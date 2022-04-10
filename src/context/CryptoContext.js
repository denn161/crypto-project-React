import React, { createContext,useEffect,useState } from "react";
import {CoinList} from '../config/api'
import axios from 'axios'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export const Crypto = createContext()  

function CryptoContext({children}) {

     const [currency,setCurrency]=useState('RUB')
     const [symbol,setSymbol]=useState('₽')
     const [loading,setLoading]=useState(false)
     const [coins,setCoins] =useState() 
     const [alert, setAlert] = useState({
         open:false,
         message:'',
         type:'succes'
     })

     const [user, setUser] = useState(null)

     const [watchList, setWatchList] = useState([])


   const getCurrencyTableLIst = async()=>{
        try {    
    setLoading(true)
    const{ data }=await axios.get(CoinList(currency.toLowerCase()))
       setCoins(data)   
       setLoading(false)         
} catch (error) {
    console.log(error)
    setLoading(false)
    
}

}
  useEffect(()=>{
    if(user){
      const coinref = doc(db,'watchlist',user.uid)
    const unsubscribe=onSnapshot(coinref,(coin)=>{
         if(coin.exists()){
           console.log(coin.data().coins)
           setWatchList(coin.data().coins)
         }else{
           console.log('No Items in Watchlist')
         }

      })

      return ()=>{
        unsubscribe()
      }

    }

  

  },[user])


  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      console.log(user)
        if(user) setUser(user)
        else setUser(null)

    })

  },[])

    useEffect(()=>{
     currency==='RUB'? setSymbol('₽'):setSymbol('$')   
     

    },[currency])

  return (
      <Crypto.Provider value={{currency,
      symbol,loading,coins,getCurrencyTableLIst,setCurrency,alert,setAlert,user,watchList}}>
          {children}
      </Crypto.Provider>

    
   
  )
}

export default CryptoContext


