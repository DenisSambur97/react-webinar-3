import {memo, useCallback, useEffect, useState} from 'react';
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import {useParams} from "react-router-dom";
import useSelector from "../../store/use-selector";
import {cn as bem} from "@bem-react/classname";
import Product from "../../components/product";
import ProductLayout from "../../components/product-layout";
import NavigationMenu from "../../components/navigation-menu";

function Article() {
    const store = useStore();
    const [article, setArticle] = useState({});
    const { id } = useParams();

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

    useEffect(() => {
        if (!store.getState().catalog.list.length) {
            store.actions.catalog.load();
        }
    }, []);

    const callbacks = {
        // Добавление в корзину
        addToBasket: () => {
            if (article && article.price) {
                store.actions.basket.addToBasket(article._id)
                console.log(article._id)
            }
        },
        // Открытие модалки корзины
        openModalBasket: () => {
            store.actions.modals.open('basket')
        }
    }

    return (
        <ProductLayout>
            <Head title={article.title}/>
            <NavigationMenu/>
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
            {/*<Product article={article} addToBasket={callbacks.addToBasket}/>*/}
            {article._id &&
                <Product article={article} addToBasket={callbacks.addToBasket}/>
            }
        </ProductLayout>
    );
}

export default memo(Article);