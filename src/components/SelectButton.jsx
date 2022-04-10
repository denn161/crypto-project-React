import { makeStyles } from "@material-ui/core";
import React  from 'react'

function SelectButton({children,onClick,selected}) {

     
    const useStyles =makeStyles({
     
        button:{
            display:'block',
            border:'1px solid gold',
            borderRadius:5,
            padding:10,
            paddingLeft:40,
            paddingRight:40,
            cursor:'pointer',
            fontFamily:'Montserrat',
            backgroundColor:selected ?'gold':'',
            color:selected?'black':'',
            fontWeight:selected?700:500,
            '&:hover':{
                backgroundColor: "gold",
                color: "black",
            },
                  
        }
    })


    const classes =useStyles()


  return (
    <div  onClick={onClick} className={classes.button}>{children}</div>
  )
}

export default SelectButton