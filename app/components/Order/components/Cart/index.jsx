'use client';
import { useState } from 'react';
import { Card, Tag, Modal } from 'antd';

import Image from 'next/image';

import PriceSummary from './components/PriceSummary';
import styles from './styles.module.scss';

const Cart = ({ choosenProducts, setChoosenProducts }) => {
  const [ openModalConfirm, setOpenModalConfirm ] = useState(false);
  const [ temporaryRemoveItem, setTemporaryRemoveItem ] = useState({});

  const calculateTotal = () => {
    let total = 0;

    (choosenProducts || []).forEach((item) => {
      const { toppings, price } = item || {};
      const totalToppings = (toppings || []).reduce((accumulator, topping) => accumulator + topping.price, 0);
      const totalPriceItem = price + totalToppings;
      total += totalPriceItem;
    });

    return total;
  };

  const total = calculateTotal();

  const handleRemoveOrder = (index) => {
    setOpenModalConfirm(true);
    setTemporaryRemoveItem(index);
  };

  const handleConfirmRemoveOrder = () => {
    const newUpdatedProducts = choosenProducts.filter((item, idx) => idx !== temporaryRemoveItem);

    setChoosenProducts(newUpdatedProducts);
    setOpenModalConfirm(false);
  };

  const handleCancelRemoveOrder = () => {
    setOpenModalConfirm(false);
  };

  return (
    <div className={styles.cart_container}>
      <Card
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '0'
        }}
        title="Cart"
        headStyle={{
          fontSize: '20px'
        }}
        bordered={false}
        bodyStyle={{
          padding: 12
        }}
      >
        <div className={styles.cart_wrapper}>
          {(choosenProducts || []).map((items, idx) => {
            const { toppings, name, image, price } = items || {};

            const totalToppings = (toppings || []).reduce((accumulator, topping) => accumulator + topping.price, 0)
            const totalPriceItem = price + totalToppings

            return (
              <Card
                style={{
                  width: '100%',
                  margin: '16px 0'
                }}
                key={idx}
                title={`Order #${idx + 1}`}
                extra={<p style={{cursor: 'pointer'}} onClick={() => handleRemoveOrder(idx)}>X</p>}
              >
                <div className={styles.item}>
                  <Image src={image} alt="product" width={80} height={160} className={styles.image} loading="lazy" />
                  <div className={styles.content_wrapper}>
                    <div className={styles.content}>
                      <p>{name}</p>

                      {toppings.length > 0 ? (
                        <div className={styles.toppings_wrapper}>
                          {toppings.map((item, idx) => {
                            const { value, category } = item || {};

                            return (
                              <Tag 
                                style={{textTransform: 'capitalize', margin: 0}}
                                key={idx} 
                                color={category === 'meat' ? 'red' : 'green'}
                              >
                                {value}
                              </Tag>
                            )
                          })}
                        </div>
                      ) : (
                        <p className={styles.no_toppings}>No Toppings</p>
                      )}
                    </div>

                    <p className={styles.price}>{`$${totalPriceItem}`}</p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Card>
      <PriceSummary totalPrice={total} />

      <Modal 
        style={{width: '240px'}} 
        title="Remove Order" open={openModalConfirm} 
        onOk={handleConfirmRemoveOrder}
        onCancel={handleCancelRemoveOrder}
      >
        <p>Are you sure you want to remove this order?</p>
      </Modal>
    </div>
  )
};

export default Cart