import { useState } from 'react';
import { Link } from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import 'style.css'

function UserBar({login, data, isLogged, onLogout, name}) {

  const cn = bem('UserBar');

  const handleLogout = async () => {
    await onLogout();
  };

  return (
      <div className={cn()}>
        {isLogged ? (
            <>
              <Link to="/profile">{name.name} <button onClick={handleLogout}>Выход</button></Link>
            </>
        ) : (
            <Link to="/login"><button>Вход</button></Link>
        )}
      </div>
  );
}

export default UserBar;
