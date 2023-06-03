import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import {cn as bem} from '@bem-react/classname';
import './style.css'
import useTranslate from "../../hooks/use-translate";

function AuthUser({onLogin}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const store = useStore()
    const history = useNavigate()
    const {t} = useTranslate();

    const cn = bem('AuthUser');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUsernameBlur = () => {
        store.actions.auth.setState({login: username});
    }

    const handlePasswordBlur = () => {
        store.actions.auth.setState({password: password});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Проверка на валидность логина и пароля
        if (!username || !password) {
            setError('Введите логин и пароль');
        }

        try {
            await onLogin(username, password);
            history('/profile')
        } catch (error) {
            setError(error.message);
            store.actions.auth.setState({error: error.message}) // ADD
        }
    };

    return (
            <form className={cn()} onSubmit={handleSubmit}>
                <h3>{t('auth.entry')}</h3>
                <label htmlFor="login">{t('auth.login')}</label>
                <input type="text" value={username} name="login" onChange={handleUsernameChange} onBlur={handleUsernameBlur} />
                <label htmlFor="password">{t('auth.password')}</label>
                <input type="password" value={password} name="password" onChange={handlePasswordChange} onBlur={handlePasswordBlur} />
                {error && <span>{error}</span>}
                <button type="submit">{t('auth.signin')}</button>
            </form>
    );
}

export default AuthUser;
