import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Cart from "../cart";
import {cn as bem} from "@bem-react/classname";

function Modal({cartItems, cartTotalPrice, setCartVisible, onRemove, modalEl}){
  const cn = bem('Cart');
  return (
      <div className={cn('modal')}>
        <div className={cn('modal-overlay')} ref={modalEl}/>
        <div className={cn('modal-content')}>
          <button className={cn('close-button')} onClick={() => setCartVisible(false)}>Закрыть</button>
          <Cart
              cartItems={cartItems}
              totalPrice={cartTotalPrice}
              onRemove={onRemove}/>
        </div>
      </div>
  )
}

Modal.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.number,
            name: PropTypes.string,
            price: PropTypes.number,
            selectedCount: PropTypes.number,
        })
    ).isRequired,
    cartTotalPrice: PropTypes.number.isRequired,
    setCartVisible: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    modalEl: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]).isRequired,
};

export default React.memo(Modal);
