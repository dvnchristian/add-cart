'use client';
import { useEffect, useState } from 'react';

// Components
import Cart from './components/Cart';
import Products from './components/Products';

import styles from './styles.module.scss';

const Order = () => {
  const [ choosenProducts, setChoosenProducts ] = useState([]);

  // get stored cart in localStorage when refresh page
  useEffect(() => {
    const storageCart = JSON.parse(window.localStorage.getItem('tempCart')) || "";

    setChoosenProducts(storageCart)
  }, []);

  // set to localStorage everytime there are changes
  useEffect(() => {
    localStorage.setItem('tempCart', JSON.stringify(choosenProducts));
  }, [choosenProducts]);

  return (
    <section id="order" className={styles.container}>
      <div className={styles.order}>
        <Products 
          setChoosenProducts={setChoosenProducts} 
          choosenProducts={choosenProducts} 
        />
        <Cart 
          setChoosenProducts={setChoosenProducts} 
          choosenProducts={choosenProducts}
        />
      </div>
    </section>
  )
};

export default Order