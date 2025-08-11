import Layout from './components/layout/layout';
import Home from './pages/home/home';
import Detail from './pages/detail/detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Success from './pages/success/success';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/:slug' element={<Detail />} />
        </Route>
        <Route path='/success' element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
