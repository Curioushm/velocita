import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const items = useSelector((state) => state?.wishlist?.items ?? []);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">{t('home')}</Link>
          </li>
          <li>
            <Link to="/wishlist">{t('wishlist')} ({items.length})</Link>
          </li>
          <li>
            <button onClick={handleLogout}>{t('logout')}</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;