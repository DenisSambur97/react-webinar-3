import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProductLayout({children}) {

    const cn = bem('ProductLayout');

    return (
        <div className={cn()}>
            {children}
        </div>
    );
}

ProductLayout.propTypes = {
    children: PropTypes.node
}

export default memo(ProductLayout);
