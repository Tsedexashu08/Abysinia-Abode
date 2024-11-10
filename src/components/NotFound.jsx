import { Link } from 'react-router-dom';
import style from '../styles/styles.module.css';
import HouseFloat from './HouseFloat';

function NotFound() {
  return (
    <div className={style.notFound}>
    <HouseFloat/>
      <h1>Oops! You seem to be lost.</h1>
      <p>Lets try and go back:</p>
      <Link to='/signup'>Signup</Link> {/*will uncomment this when link becomes operable.*/}
      {/* This will take the user back to the home page when not found is displayed */}
    </div>
  );
}

export default NotFound