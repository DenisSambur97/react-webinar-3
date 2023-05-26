import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, renderItem, setPageData, onClose}){
  useEffect(() => {
    if (typeof setPageData === 'function') {
      setPageData(list);
    }
  }, [list]);

  return (
    <div className='List'>{
      list.map(item =>
        <div key={item._id} className='List-item'>
          {renderItem(item)}
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })).isRequired,
  setPageData: PropTypes.func,
  renderItem: PropTypes.func,
};

List.defaultProps = {
  setPageData: (list) => {},
  renderItem: (item) => {},
}

export default memo(List);
