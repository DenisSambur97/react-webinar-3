import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function AuthUser({login, onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const history = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Проверка на валидность логина и пароля
        if (!username || !password) {
            setError('Введите логин и пароль');
        }

        try {
            await onLogin(login, password);
            history('/profile')
        } catch (error) {
            setError(error.message);
        }

        // try {
        //     const response = await fetch('/api/v1/users/sign', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({ login: username, password })
        //     });
        //
        //     if (!response.ok) {
        //         throw new Error('Invalid credentials');
        //     }
        //
        //     const { result } = await response.json();
        //     localStorage.setItem('token', result.token); // Сохраняем токен в локальном хранилище
        //     history('/profile')
        // } catch (error) {
        //     setError(error.message);
        // }
    };

    return (
        <form className="auth-user" onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button type="submit">Войти</button>
            {error && <span>{error}</span>}
        </form>
    );
}

export default AuthUser;
