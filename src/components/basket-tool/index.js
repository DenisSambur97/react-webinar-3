import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import lang from "../../store/languages";

function BasketTool({sum, amount, onOpen, language}) {
  const cn = bem('BasketTool');

  return (
    <div className={cn()}>
      <span className={cn('label')}>{lang[language].inCart}</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {one:lang[language].plural.one, few:lang[language].plural.few, many:lang[language].plural.many})} / ${numberFormat(sum)} ₽`
          : `${lang[language].emptyBasket}`
        }
      </span>
      <button onClick={onOpen}>{lang[language].goToBasket}</button>
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
