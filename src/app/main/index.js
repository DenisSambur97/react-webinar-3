import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import LanguageBtn from "../../components/language-btn";
import lang from "../../store/languages"
import NavigationMenu from "../../components/navigation-menu";

function Main() {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  // const [language, setLanguage] = useState('ru');

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.count,
    currentPage: state.catalog.currentPage // New State from Store
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Изменение текущей страницы
    changePage: useCallback((page) => {
      setCurrentPage(page);
      store.actions.catalog.load({ page });
    }, [store]),
    // changeLanguage: useCallback(() => {
    //   setLanguage (language === 'ru' ? 'en' : 'ru');
    // }, [language])
  }

  // const handleLanguageChange = () => {
  //   setLanguage(language === 'ru' ? 'en' : 'ru');
  // };

  const renders = {
    item: useCallback((item) => {
      return (
          <Item item={item} onAdd={callbacks.addToBasket} url={`/article/${item._id}`} />
      )
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head
          title='Магазин'
      />
      <NavigationMenu/>
      <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          currentPage={currentPage}
          onPageChange={callbacks.changePage}
      />
      <List
          list={select.list}
          renderItem={renders.item}
      />
      <Pagination
          onPageChange={callbacks.changePage}
          totalPages={select.totalPages}
      />
    </PageLayout>

  );
}

export default memo(Main);
