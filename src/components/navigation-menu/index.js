import React from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "style.css"

function NavigationMenu() {

    const cn = bem('NavigationMenu');

    return (
        <nav className={cn()}>
            <ul>
                <li>
                    <Link to='/' className={cn('link')} >
                        Главная
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationMenu;