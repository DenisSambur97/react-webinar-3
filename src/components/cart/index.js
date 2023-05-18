import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {formatMoney} from "../../utils";

function Cart({cartItems, totalPrice, onRemove}){

    return (
        <div className='Cart'>
            <h2>Корзина</h2>
            {cartItems.length > 0 ? (
                <>
                    <ul className='Cart-items'>
                        {cartItems.map(item => (
                            <li key={item.code} className='Cart-item'>
                                <span className="Cart-item-code">{item.code} </span>
                                <p className='Cart-item-name'>{item.title}</p>
                                <div className="Cart-item-info">
                                    <p className='Cart-item-price'>{formatMoney(item.price)}</p>
                                    <div className='Cart-item-selected'>{item.selectedCount} шт</div>
                                    <button className='Cart-item-del' onClick={() => onRemove(item.code)}>Удалить</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='Cart-total-price'><p>Итого</p> <span>{formatMoney(totalPrice)}</span></div>
                </>
            ) : (
                <div className="Cart-empty">Корзина пуста</div>
            )}
        </div>
    );
}

Cart.propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        selectedCount: PropTypes.number,
        price: PropTypes.number
    })).isRequired,
    totalPrice: PropTypes.number.isRequired,
    onRemove: PropTypes.func
};

Cart.defaultProps = {
    onRemove: () => {}
}

export default Cart;