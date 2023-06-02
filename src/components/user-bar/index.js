import { useState } from 'react';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import 'style.css'

function UserBar() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(''); // по умолчанию нет авторизации

  const cn = bem('UserBar');

  const handleLogout = async () => {
    await fetch('/api/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': localStorage.getItem('token')
      }
    });

    localStorage.removeItem('token');
    setAuthenticated(false);
    setUsername('');
  };

  return (
      <div className={cn()}>
        {authenticated ? (
            <>
              <Link to="/profile">{username}</Link>
              <button onClick={handleLogout}>Выход</button>
            </>
        ) : (
            <Link to="/login"><button>Вход</button></Link>
        )}
      </div>
  );
}

export default UserBar;
