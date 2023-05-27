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

function Main({language, setLanguage}) {
  const store = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalPages: state.catalog.count,
    currentPage: state.catalog.currentPage
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
  }

  const renders = {
    item: useCallback((item) => {
      return (
          <Item item={item} language={language} onAdd={callbacks.addToBasket} url={`/article/${item._id}`} />
      )
    }, [callbacks.addToBasket, language]),
  };

  return (
    <PageLayout>
      <Head
          title='Магазин'
          language={language}
      />
      <LanguageBtn
        language={language}
        onLanguageChange={setLanguage}
      />
      <NavigationMenu
          language={language}
      />
      <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
          currentPage={currentPage}
          onPageChange={callbacks.changePage}
          language={language}
      />
      <List
          list={select.list}
          renderItem={renders.item}
          language={language}
      />
      <Pagination
          onPageChange={callbacks.changePage}
          totalPages={select.totalPages}
          language={language}
      />
    </PageLayout>

  );
}

export default memo(Main);
