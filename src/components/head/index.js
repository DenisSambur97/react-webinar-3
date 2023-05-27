import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';
import lang from "../../store/languages";

function Head({title, language, article}){
  return (
    <div className='Head'>
        <h1>{article ? title : lang[language].pageTitle}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
