import {memo, useEffect, useState} from 'react';
import 'style.css'
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import {useParams} from "react-router-dom";
import useSelector from "../../store/use-selector";
import {cn as bem} from "@bem-react/classname";

function Article() {
    const store = useStore();
    const [article, setArticle] = useState({});
    const { id } = useParams();

    // Добавляем useSelector из библиотеки react-redux
    const currentPage = useSelector((state) => state.catalog.page);

    const cn = bem('Article');

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));

    useEffect(() => {
        async function fetchArticle() {
            const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
            const data = await response.json();
            setArticle(data.result);
        }
        fetchArticle();
    }, [id]);

    const callbacks = {
        // Добавление в корзину
        addToBasket: () => {
            store.actions.basket.addToBasket(article._id)
        },
        // Удаление из корзины
        removeFromBasket: () => {
            store.actions.basket.removeFromBasket(article._id)
        },
        // Открытие модалки корзины
        openModalBasket: () => {
            store.actions.modals.open('basket')
        }
    }

    return (
        <div className={cn()}>
            <Head title={article.title}/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}>
            </BasketTool>
            <div className={cn('info')}>
                <p>{article.description}</p>
                <p className={cn('info-country')}>Страна производитель: <span>{article.madeIn?.title}</span></p>
                <p className={cn('info-category')}>Категория: <span>{article.category?.title}</span></p>
                <p className={cn('info-year')}>Год выпуска: <span>{article.edition}</span></p>
                <p className={cn('info-price')}>Цена: {article.price} ₽</p>
            </div>
            <button className={cn('btn')} onClick={callbacks.addToBasket}>Добавить</button>
        </div>
    );
}

export default memo(Article);