import React,{useState,useEffect} from 'react';
import Link from 'next/link';
import { BsBagDashFill } from 'react-icons/bs';
import {useStateContext} from '../context/StateContext'
import {runFireworks} from '../lib/utils';

const Canceled = () => {
  const {setCartItems,setTotalPrice,setTotalQuantities} = useStateContext();  
  
  useEffect(()=>{
   localStorage.clear();
   setCartItems([]);
   setTotalPrice(0);
   setTotalQuantities(0);
  },[]);

  return (
    <div className='success-wrapper'>
      <div className='canceled'>

        <p className='icon'><BsBagDashFill/></p>
        <h2>Sorry, your order can't be placed now.</h2>
        <p className='description'>
          If you have any questions, please email 
          <a className='email' href="mailto:lipocodes@gmail.com">lipocodes@gmail.com</a>  
        </p>
        <Link href="/">
          <button type="button" className='btn' width="300px">Continue Shopping</button>  
        </Link>
      </div>

    </div>
  )
}

export default Canceled