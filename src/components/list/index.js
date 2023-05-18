import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteItem, onAddToCart}){
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onDelete={onDeleteItem} onAddToCart={onAddToCart}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onAddToCart: PropTypes.func
};

List.defaultProps = {
  onDeleteItem: () => {},
  onAddToCart: () => {},
}

export default React.memo(List);
