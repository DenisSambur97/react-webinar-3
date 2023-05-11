/**
 * Хранилище состояния приложения
 */

class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: initState.list.map((oldState) => ({...oldState, selectedCount: 0})) // Добавляем к старому стейту новое поле для счётчика
    };
    this.lastCode = initState.list.length; // Инициализируем lastCode значением последнего кода записи
    this.listeners = []; // Слушатели изменений состояния
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
    const nextCode = this.lastCode + 1; // Получаем следующий уникальный код
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: nextCode, title: 'Новая запись' }]
    });
    this.lastCode = nextCode; // Обновляем lastCode до нового значения
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
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
          item.selected = !item.selected;
          if (item.selected) { // Проверка на то что, если айтем уже выбран не добавлять выделение в стейт, не знаю верно ли, но исходя из логики так нужно :)
            item.selectedCount++;
          }
        } else {
          item.selected = false; // Убираем у остальных item селект
        }
        return item;
      })
    })
  }
}

export default Store;
