import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {cn as bem} from '@bem-react/classname';
import 'style.css'
import useTranslate from "../../hooks/use-translate";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const store = useStore();
    const {t} = useTranslate();

    const cn = bem('Profile');

    const select = useSelector(state => ({
        data: state.auth.data,
        isLogged: state.auth.isLogged,
        waiting: state.auth.waiting
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                await store.actions.auth.load(); // Загрузка данных пользователя с использованием метода load из объекта actions у AuthState.
                setUser(select.data); // Устанавливаем данные пользователя в локальный state.
            } catch (error) {
                console.error(error);
                navigate('/login'); // Если произошла ошибка, перенаправляем пользователя на страницу логина
            }
        };
        fetchData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!user ? (
                <div className={cn()}>Loading...</div>
            ) : (
                <div className={cn()}>
                    <h3>{t('profile')}</h3>
                    <p><span>{t('profile.name')}: </span>{select.data.profile.name}</p>
                    <p><span>{t('profile.phone')}: </span>{select.data.email}</p>
                    <p><span>email: </span>{select.data.profile.phone}</p>
                </div>
            )}
        </>
    );
}

export default Profile;
