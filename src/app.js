import React, {useCallback, useEffect, useRef, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const modalEl = useRef(null);

  const list = store.getState().list;

  store.subscribe(() => {
    setCartItems(store.getState().cartItems);
    setCartVisible(store.getState().cartVisible);
  });

  const callbacks = {
    // onDeleteItem: useCallback((code) => {
    //   store.deleteItem(code);
    // }, [store]),
    //
    // onSelectItem: useCallback((code) => {
    //   store.selectItem(code);
    // }, [store]),
    //
    // onAddItem: useCallback(() => {
    //   store.addItem();
    // }, [store]),

    addItemToCart: useCallback((item) => {
      store.addItemToCart(item);
    }, [store]),

    removeItemFromCart: useCallback((code) => {
      store.removeItemFromCart(code);

    }, [store]),

    openCart: useCallback(() => {
      store.openCart();
    }, [store])
  }

  const cartTotalPrice = cartItems.reduce((total, item) => total + item.price * item.selectedCount, 0);

// Добавил обработчик события keydown на элемент window и mousedown на элемент document.body..
// Если нажата клавиша Escape и модальное окно отображается и если пользователь кликнул вне модального окна, то скрыть его.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27 && cartVisible) {
        setCartVisible(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const handleMouseDown = (event) => {
      if (cartVisible && modalEl.current && modalEl.current.contains(event.target)) {
        setCartVisible(false);
      }
    };
    document.body.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.removeEventListener('mousedown', handleMouseDown);
    };
  }, [cartVisible]);

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Controls
          // onAdd={callbacks.onAddItem}
          onOpenCart={callbacks.openCart}
          cartItems={cartItems}
          cartTotalPrice={cartTotalPrice}/>
      <List
            list={store.getState().list}
            onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem}
            onAddToCart={callbacks.addItemToCart}/>
      {cartVisible && (
          <Modal
              cartItems={cartItems}
              cartTotalPrice={cartTotalPrice}
              onRemove={callbacks.removeItemFromCart}
              setCartVisible={setCartVisible}
              modalEl={modalEl}/>
      )}
    </PageLayout>
  );
}

export default App;
