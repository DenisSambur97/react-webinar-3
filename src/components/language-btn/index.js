import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function LanguageBtn({language, onLanguageChange}){
  const handleClick = () => {
    const newLanguage = (language === 'ru') ? 'en' : 'ru';
    onLanguageChange(newLanguage);
  };

  return (
      <button onClick={handleClick} className="btn">
        {language === 'ru' ? 'English' : 'Русский'}
      </button>
  )
}

LanguageBtn.propTypes = {
  language: PropTypes.string,
};

export default memo(LanguageBtn);
