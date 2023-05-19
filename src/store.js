import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    // this.state = initState;
    this.state = {...initState, cartVisible: false, cartItems: []};
    this.listeners = []; // Слушатели изменений состояния
    // this.addItemToCart = this.addItemToCart.bind(this);
    // this.removeItemFromCart = this.removeItemFromCart.bind(this);
    // this.openCart = this.openCart.bind(this);
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: generateCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter(item => item.code !== code)
    })
  };

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? {...item, selected: false} : item;
      })
    })
  }

  /**
   * Добавление товара в корзину
   * @param item
   */
  addItemToCart(item) {
    if (item && item.code) {
      const existingItemIndex = this.state.cartItems.findIndex(existingItem => existingItem.code === item.code);
      if (existingItemIndex !== -1) {
        const existingItem = this.state.cartItems[existingItemIndex];
        const updatedItem = {...existingItem, selectedCount: existingItem.selectedCount + 1};
        this.setState({...this.state, cartItems: [...this.state.cartItems.slice(0, existingItemIndex), updatedItem, ...this.state.cartItems.slice(existingItemIndex + 1)]});
      } else {
        this.setState({...this.state, cartItems: [...this.state.cartItems, {...item, selectedCount: 1}]});
      }
      if (this.state.cartVisible) {
        this.setState({...this.state, cartVisible: false});
      }
    }
  };

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  removeItemFromCart(code) {
    this.setState({...this.state, cartItems: this.state.cartItems.filter(item => item.code !== code)});
  };

  /**
   * Открытие корзины
   */
  openCart() {
    this.setState({...this.state, cartVisible: true});
  };
}

export default Store;
