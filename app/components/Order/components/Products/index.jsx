'use client';

import { useState } from 'react';
import Image from 'next/image';

import { PRODUCT_LIST, TOPPING_LIST } from './constants';
import { Card, Checkbox, Modal, Button } from 'antd';

import styles from './styles.module.scss';

const Products = ({ setChoosenProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState({})
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleChooseProduct = (choosenItems) => {
    setSelectedProducts(choosenItems)
    setOpenModal(true);
  };

  const handleAddToCart = () => {
    const finalProductData = {
      ...selectedProducts,
      toppings: selectedToppings
    };

    setChoosenProducts((prevCart) => [...prevCart, finalProductData]);
    setOpenModal(false);
    setSelectedToppings([]);
  };


  const handleCancel = () => {
    setOpenModal(false);
    setSelectedToppings([]);
  };
  
  const handleChooseTopping = (topping) => {
    const { value, price, category } = topping || {};

    const isToppingSelected = selectedToppings.some((selectedTopping) => selectedTopping.value === value);

    if (isToppingSelected) {
      const updatedToppings = selectedToppings.filter((selectedTopping) => selectedTopping.value !== value);
      setSelectedToppings(updatedToppings);

    } else {
      const newTopping = { value, price, category };

      setSelectedToppings([...selectedToppings, newTopping]);
    }
  };

  return (
    <div className={styles.products}>
    <h1 className={styles.title}>
      Pizza List
    </h1>
    <div className={styles.products_wrapper}>
      {PRODUCT_LIST.map((items, idx) => {
        const { image, name, price } = items || {};

        return (
          <Card
            key={idx}
            style={{
              width: 240,
              cursor: 'pointer',
            }}
            cover={<Image src={image} alt="product" width={80} height={200} className={styles.image} loading="lazy" />}
            onClick={() => handleChooseProduct(items)}
          >
            <div className={styles.item}>
              <p>{name}</p>
              <p>{`$${price}`}</p>
            </div>
          </Card>
        )
      })}
    </div>

    <Modal 
      title="Toppings" 
      open={openModal} 
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      ]}
    >
      <div className={styles.topping_list}>
        {TOPPING_LIST.map((topping, idx) => {
          const { label, value, price } = topping || {};

          return (
            <div key={idx} className={styles.topping}>
              <Checkbox 
                checked={selectedToppings.some(topping => topping.value === value)} 
                onChange={() => handleChooseTopping(topping)}
              >
                {`${label} ($${price})`}
              </Checkbox>
            </div>
          )
        })} 
      </div>
    </Modal>
  </div>
  )
};

export default Products;