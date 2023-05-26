import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import Article from "../components/article";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='article/:id' element={<Article />} />
            </Routes>
            {activeModal === 'basket' && <Basket />}
        </BrowserRouter>
    </>
  );
}

export default App;
