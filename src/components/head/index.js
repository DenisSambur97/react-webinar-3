import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onOpenCart: PropTypes.func
};

export default React.memo(Head);
