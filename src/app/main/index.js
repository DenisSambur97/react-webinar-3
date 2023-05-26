import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Main() {
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
          <Item item={item} onAdd={callbacks.addToBasket} />
      )
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} currentPage={currentPage} onPageChange={callbacks.changePage}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination currentPage={currentPage} onPageChange={callbacks.changePage} totalPages={select.totalPages}/>
    </PageLayout>

  );
}

export default memo(Main);
