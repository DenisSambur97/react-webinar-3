import StoreModule from "../module";
/**
 * Детальная ифнормация о товаре для страницы товара
 */
class AuthState extends StoreModule {

  initState() {
    return {
      data: {},
      login: '',
      password: '',
      waiting: false, // признак ожидания загрузки
      isLogged: false,
      error: ''
    }
  }

  /**
   * Загрузка user
   * @return {Promise<void>}
   */
  async load() {
    // Сброс текущих значений
    this.setState({
      data: {},
      waiting: true
    });

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/v1/users/self', {
        headers: { 'X-Token': token }
      });
      const json = await response.json();

      // Загружен успешно
      this.setState({
        ...this.getState(),
        data: json.result,
        waiting: false,
        login: json.result.username,
        password: json.result.password,
        isLogged: true
      }, 'Загружен пользователь из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        waiting: false,
        error: e.message
      });
    }
  }
  /**
   * Логирование User
   * @return {Promise<void>}
   */
  async sign(login, password) {
    // Сброс текущих значений
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });
      const json = await response.json();
      const { token, user } = await response.json();
      localStorage.setItem('token', token); // Сохраняем токен в локальном хранилище
      window.location.replace("/");

      // Загружен успешно
      this.setState({
        ...this.getState(),
        data: user,
        waiting: false,
        login: json.result.username,
        password: json.result.password,
        isLogged: true
      }, 'Загружен пользователь из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        isLogged: false,
        error: e.message,
        waiting: false
      });
    }
  }

  /**
   * Разлогирование user
   * @return {Promise<void>}
   */
  async logout() {
    try {
        await fetch('/api/users/sign', {
          method: 'DELETE',
          headers: {
            'X-Token': localStorage.getItem('token')
          }
        });
      localStorage.removeItem('token');
      window.location.replace('/');
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    }
  }

}

export default AuthState;
