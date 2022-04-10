import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import {Container,createTheme,TableCell,LinearProgress,ThemeProvider,Typography,TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
   } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import CryptoState from '../hooks'
import { makeStyles } from '@material-ui/styles'
import { numberWithCommas } from '../utills'
import millify from 'millify'



const tableHeadTitles=["Coin", "Price", "24h Change", "Market Cap"]


function CoinsTable() {
    const {currency,symbol,loading,coins,getCurrencyTableLIst}=CryptoState() 
    const [page, setPage] = useState(1);
    const [searchcoin,setSearchCoin]=useState('')

    const navigate = useNavigate()

   const useStyles=makeStyles({
       container:{
           textAlign:'center', 
           padding:'50px 0'          
       },
       title:{
           margin:30,
           fontFamily:'Montserrat'           
       },
       cell:{
           display:'flex',
           flexDirection:'column',
           gap:5,
           alignItems:'flex-center'
       },
       symbol:{
           color:'#fff',
           textTransform:'uppercase',
           fontWeight:'bold',
           display:'block',
           fontSize:22
       },
       name:{
           color:'darkgrey'
       },
       row:{
           cursor:'grab',
           backgroundColor: "#16171a",
          "&:hover": {
             backgroundColor: "#131111",
           }
       } ,
       
       pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
    }
    })  

    const darkTheme = createTheme({
        palette: {
          primary:{
              main:'#fff'
          },
          type:'dark'
        },
      });

    console.log(coins)    
   
    const classes = useStyles()     
  
   const handleSearch =()=>{
        return coins?.filter((item)=>{

        return item.name.toLowerCase().includes(searchcoin)|| item.symbol.toLowerCase().includes(searchcoin)
        })
    }
    const searchEl = handleSearch()
    

    useEffect(()=>{
     getCurrencyTableLIst()

    },[currency])
  return (
    <ThemeProvider theme={darkTheme}>
    <Container className={classes.container}>
     <Typography className={classes.title} variant='h4'>
     Cryptocurrency Prices by Market Cap
     </Typography>
     <TextField 
      label="Search For a Crypto Currency.."
      variant="outlined"
      style={{ marginBottom: 20, width: "100%",color:'#fff' }}
      onChange={(e)=>setSearchCoin(e.target.value)}
      value={searchcoin}
      />
      <TableContainer>
          {loading&&(
            <LinearProgress style={{ backgroundColor: "gold" }} />
          )}
          <Table style={{marginTop:'20px' }}>
              <TableHead style={{ backgroundColor: "#EEBC1D"}}>
             <TableRow>
                 {tableHeadTitles.map((title)=>
                 <TableCell key={title} align={title==='Coin'?"left":"right"} style={{color:'#000',
                 fontWeight:'700',
                 fontFamily:'Montserrat',
                 fontSize:'20px'}} >
                     {title}
                 </TableCell>
                 )}
             </TableRow>
              </TableHead>
              <TableBody>
              {searchEl?.slice((page - 1) * 10, (page - 1) * 10 + 10)
              .map((coin)=>{
      let profit =coin.price_change_percentage_24>=0?'+':'';

         return(
             <TableRow className={classes.row} key={coin.id} onClick={()=>navigate(`/coins/${coin.id}`)}>            
               <TableCell component={'th'} scope='row' style={{display:'flex',gap:50}}>             
                 <img src={coin?.image} alt={coin?.name}
                  style={{
                      height:50,
                      marginBottom:10
                  }}/>
                  <div className={classes.cell}>
                    <span className={classes.symbol}>{coin?.symbol}</span>
                    <span className={classes.name}>{coin?.name}</span>
                  </div>               
               </TableCell>          
             <TableCell align='right'
                 style={{color:'#fff',fontWeight:500}} >
                 <div  className={classes.cell}>
                 <span>{symbol}</span>
                  <span>{numberWithCommas(coin?.current_price)}</span>
                 </div>
               </TableCell>
               <TableCell align='right'>
               <span
                style={{color:profit>0?"green":"red",fontWeight:500}}>
                    {profit}
              <span>{coin?.price_change_percentage_24h?.toFixed(2)+'%'}</span>
                      </span>
               </TableCell>
               <TableCell style={{display:'flex',gap:5}} align='right'>
                <span>
                {symbol}
                </span>
              <span>{millify(coin?.market_cap)}</span>
             
               </TableCell>
               
             </TableRow>

               
          )
              })}
              </TableBody>
          </Table>
      </TableContainer>
      <Pagination
          count={(searchEl?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
   </Container>
   </ThemeProvider>
  )
}

export default CoinsTable