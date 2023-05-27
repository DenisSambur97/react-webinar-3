import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem, cn} from "@bem-react/classname";

function Product({article, addToBasket}){

  const cn = bem('Product');

  return (
    <>
        <div className={cn('info')}>
            <p>{article.description}</p>
            <p className={cn('info-country')}>Страна производитель: <span>{article.madeIn?.title}</span></p>
            <p className={cn('info-category')}>Категория: <span>{article.category?.title}</span></p>
            <p className={cn('info-year')}>Год выпуска: <span>{article.edition}</span></p>
            <p className={cn('info-price')}>Цена: {article?.price ? article.price + ' ₽' : ''}</p>
        </div>
        {article.price && <button className={cn('btn')} onClick={addToBasket}>Добавить</button>}
    </>
  )
}

Product.propTypes = {
  title: PropTypes.node,
};

export default memo(Product);
