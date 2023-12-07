import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/Homepage';
import store from './redux-store/Store';

function App() {
  return (
   <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
     </BrowserRouter>
   </Provider>
  );
}

export default App;
