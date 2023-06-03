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
        login: json.result.username,
        password: json.result.password,
        isLogged: true
      }, 'Загружен пользователь из АПИ');

    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        error: e.message
      });
    }
  }
  /**
   * Логирование User
   * @return {Promise<void>}
   */
  async sign(login, password) {
    this.setState({
      ...this.getState()
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      console.log(data.result)
      if (data.result.token && data.result.user) {
        localStorage.setItem('token', data.result.token);
        this.setState({
          ...this.getState(),
          data: data.user,
          isLogged: true,
          error: '',
          login: data.user.username,
          password: data.user.password,
        });
      } else {
         // throw new Error('Некорректный ответ от сервера');
        this.setState({
          ...this.getState(),
          data: {},
          isLogged: false,
          error: ''
        });
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        data: {},
        isLogged: false,
        error: e.message,
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
      window.location.replace('/login');
      this.setState({
        ...this.getState(),
        data: {},
        isLogged: false
      }, 'Пользователя не залогировался');
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    }
  }

}

export default AuthState;
