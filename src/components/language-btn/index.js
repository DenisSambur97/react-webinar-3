import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function LanguageBtn({language}){
  return (
      <p>{language}</p>
  )
}

LanguageBtn.propTypes = {
  title: PropTypes.node,
};

export default memo(LanguageBtn);
