'use client';

import styles from './styles.module.scss';

const PriceSummary = ({ totalPrice }) => {
  return (
    <div className={styles.price_summary}>
      <p>
        Total Price
      </p>

      <p>
        {`$${totalPrice}`}
      </p>
    </div>
  )
};

export default PriceSummary