import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import {formatMoney} from "../../utils";

function Item(props){

  const callbacks = {
    onClick: () => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        props.onAddToCart();
      }
    },
  }

  return (
    <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
         onClick={callbacks.onClick}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
        {/*{props.selectedCount ? `| Добавлено в корзину: ${props.selectedCount}` : ''}*/}
      </div>
      <p className="Item-price">{formatMoney(props.item.price)}</p>
      <div className='Item-actions'>
        <button onClick={() => props.onAddToCart(props.item)}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  onAddToCart: PropTypes.func,
  selectedCount: PropTypes.number
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
  onAddToCart: () => {},
}

export default React.memo(Item);
