import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Article from "./article";
import {useState} from "react";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const [language, setLanguage] = useState('ru');
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main language={language} setLanguage={setLanguage}/>} />
                <Route path='article/:id' element={<Article language={language}/>} />
            </Routes>
            {activeModal === 'basket' && <Basket language={language}/>}
        </BrowserRouter>
    </>
  );
}

export default App;
