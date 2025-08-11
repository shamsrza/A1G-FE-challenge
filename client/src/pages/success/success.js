import fireworks from '../../assets/images/fireworks.png';
import { Link } from 'react-router-dom';
import './success.css';
const Success = () => {
  return (
    <div className='success_container'>
      <h1 className='success_title'>Order received</h1>
      <div className='success_content'>
        <img src={fireworks} alt='' />
        <h1 style={{ fontSize: '4rem' }}>Thank you!</h1>
        <p>We have successfully received your order.</p>
      </div>
      <div className='submit_another_order'>
        <Link to='/' className='custom_btn'>
          Submit another order
        </Link>
      </div>
    </div>
  );
};
export default Success;
