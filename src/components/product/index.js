import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import {cn as bem, cn} from "@bem-react/classname";
import lang from "../../store/languages";

function Product({article, addToBasket, language}){

  const cn = bem('Product');

  return (
    <>
        <div className={cn('info')}>
            <p>{article.description}</p>
            <p className={cn('info-country')}>{lang[language].countryOfOrigin} <span>{article.madeIn?.title}</span></p>
            <p className={cn('info-category')}>{lang[language].category} <span>{article.category?.title}</span></p>
            <p className={cn('info-year')}>{lang[language].yearOfRelease} <span>{article.edition}</span></p>
            <p className={cn('info-price')}>{lang[language].price} {article?.price ? article.price + ' ₽' : ''}</p>
        </div>
        {article.price && <button className={cn('btn')} onClick={addToBasket}>{lang[language].add}</button>}
    </>
  )
}

Product.propTypes = {
    article: PropTypes.shape({
        description: PropTypes.string,
        madeIn: PropTypes.shape({
            title: PropTypes.string
        }),
        category: PropTypes.shape({
            title: PropTypes.string
        }),
        edition: PropTypes.number,
        price: PropTypes.number
    }).isRequired,
    addToBasket: PropTypes.func.isRequired,
    language: PropTypes.oneOf(['en', 'ru']).isRequired
};

export default memo(Product);
