import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from "../../utils";
import './style.css';
import {Link} from "react-router-dom";
import lang from "../../store/languages";

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAdd: (e) => {
        props.onAdd(props.item._id)
    }
  }

  return (
    <div className={cn()}>
      <Link className={cn('title')} to={props.url}>
          {props.item.title}
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{lang[props.language].add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func,
  language: PropTypes.string.isRequired, // добавляем propTypes для language
};

Item.defaultProps = {
  onAdd: () => {},
}

export default memo(Item);
