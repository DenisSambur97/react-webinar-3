import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {formatMoney, plural} from "../../utils";

function Controls({onOpenCart, cartItems, cartTotalPrice}){
  return (
    <div className='Controls'>
      <p className={'Controls-title'}>В корзине:</p>
      <p className={'Controls-products'}>
          {cartItems.length > 0 ? `${cartItems.length} ${plural(cartItems.length, {one: 'товар', few: 'товара', many: 'товаров'})} ` : 'пусто'}
          {cartTotalPrice > 0 ? `/ ${formatMoney(cartTotalPrice)}` : ''}
      </p>
      {/*Добавил ин-лайн стиль. Не захотелось из-за одного свойства добавлять класс, могу переделать :)*/}
      <button onClick={onOpenCart} style={{width: '82px'}}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
    onOpenCart: PropTypes.func,
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number,
            name: PropTypes.string,
            price: PropTypes.number,
            selectedCount: PropTypes.number
        })
    ).isRequired,
    cartTotalPrice: PropTypes.number.isRequired
};

Controls.defaultProps = {
    onOpenCart: () => {}
}

export default React.memo(Controls);
