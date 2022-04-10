import { useContext } from "react"

import { Crypto } from "../context/CryptoContext"



const  CryptoState =()=>{

  return useContext(Crypto)

}

export default CryptoState