import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {formatMoney} from "../../utils";
import { cn as bem } from '@bem-react/classname';

function Cart({cartItems, totalPrice, onRemove}){
    const cn = bem('Cart');
    return (
        <div className={cn()}>
            <h2>Корзина</h2>
            {cartItems.length > 0 ? (
                <>
                    <ul className={cn('items')}>
                        {cartItems.map(item => (
                            <li key={item.code} className={cn('item')}>
                                <span className={cn('item-code')}>{item.code} </span>
                                <p className={cn('item-name')}>{item.title}</p>
                                <div className={cn('item-info')}>
                                    <p className={cn('item-price')}>{formatMoney(item.price)}</p>
                                    <div className={cn('item-selected')}>{item.selectedCount} шт</div>
                                    <button className={cn('item-del')} onClick={() => onRemove(item.code)}>Удалить</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={cn('total-price')}><p>Итого</p> <span>{formatMoney(totalPrice)}</span></div>
                </>
            ) : (
                <div className={cn('empty')}>Корзина пуста</div>
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