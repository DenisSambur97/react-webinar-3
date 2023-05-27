import React from 'react';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import "style.css"
import lang from "../../store/languages";

function NavigationMenu({language}) {

    const cn = bem('NavigationMenu');

    return (
        <nav className={cn()}>
            <ul>
                <li>
                    <Link to='/' className={cn('link')} >
                        {lang[language].home}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationMenu;