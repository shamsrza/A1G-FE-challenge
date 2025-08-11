import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import CartTab from '../cartTab/cartTab';
import Success from '../../pages/success/success';
import './layout.css';

const Layout = () => {
  return (
    <div className='layout-container'>
      <main className='layout-main'>
        <Header />
        <Outlet />
      </main>
      <CartTab />
    </div>
  );
};
export default Layout;
