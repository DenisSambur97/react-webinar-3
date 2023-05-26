import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import Item from "../item";
import {Link} from "react-router-dom";

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <Link to={`/`}>
         <span className={cn('linkToMain')}>Главная</span>
      </Link>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:'товар', few:'товара', many:'товаров'})} / ${numberFormat(sum)} ₽`
          : `пусто`
        }
      </span>
      <button onClick={onOpen}>Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  item: PropTypes.object,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  item: null,
}

export default memo(BasketTool);
