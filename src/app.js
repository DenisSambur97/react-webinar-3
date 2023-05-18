import React, {useCallback, useEffect, useRef, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import 'app.css'

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

  const callbacks = {
    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onAddItem: useCallback(() => {
      store.addItem();
    }, [store]),

    addItemToCart: useCallback((item) => {
      if (item && item.code) {
        // Изменяем количество выбранных единиц товара
        const existingItemIndex = cartItems.findIndex(existingItem => existingItem.code === item.code);
        if (existingItemIndex !== -1) {
          const existingItem = cartItems[existingItemIndex];
          const updatedItem = {...existingItem, selectedCount: existingItem.selectedCount + 1};
          setCartItems([...cartItems.slice(0, existingItemIndex), updatedItem, ...cartItems.slice(existingItemIndex + 1)]);
        } else {
          setCartItems([...cartItems, {...item, selectedCount: 1}]);
        }
      }
    }, [cartItems]),

    removeItemFromCart: useCallback((code) => {
      setCartItems(cartItems.filter(item => item.code !== code));
    }, [cartItems]),

    openCart: useCallback(() => {
      setCartVisible(true);
    }, [])
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
      <Controls onAdd={callbacks.onAddItem} onOpenCart={callbacks.openCart} cartItems={cartItems} cartTotalPrice={cartTotalPrice}/>
      <List list={store.getState().list} onDeleteItem={callbacks.onDeleteItem}
            onSelectItem={callbacks.onSelectItem} onAddToCart={callbacks.addItemToCart}/>
      {cartVisible && (
          <div className='Cart-modal'>
            <div className='Cart-modal-overlay' ref={modalEl}/>
            <div className='Cart-modal-content'>
              <button className='Cart-close-button' onClick={() => setCartVisible(false)}>Закрыть</button>
              <Cart cartItems={cartItems} totalPrice={cartTotalPrice} onRemove={callbacks.removeItemFromCart}/>
            </div>
          </div>
      )}
    </PageLayout>
  );
}

export default App;
