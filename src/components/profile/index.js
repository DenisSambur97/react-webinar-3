import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const store = useStore();

    const select = useSelector(state => ({
        data: state.auth.data,
        login: state.auth.login,
        password: state.auth.password,
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

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/api/v1/users/self', {
    //                 headers: { 'X-Token': token }
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Invalid token');
    //             }
    //             const data = await response.json();
    //             setUser(data);
    //         } catch (error) {
    //             console.error(error);
    //             // Если произошла ошибка, перенаправляем пользователя на страницу логина
    //             navigate('/login');
    //         }
    //     };
    //     fetchData();
    // }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {!user ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                    {/*<p>{user.profile.phone}</p>*/}
                </div>
            )}
        </>
    );
}

export default Profile;
