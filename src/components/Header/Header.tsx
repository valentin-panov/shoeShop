import React, { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from './Menu/Menu';
import HeaderSearch from './Search/HeaderSearch';
import img from '../../img/header-logo.png';
import CartIcon from './CartIcon/CartIcon';
import CartCounter from './CartCounter/CartCounter';

export default function Header(): ReactElement {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation: string = pathname.split('/')[1];

  return (
    <Menu className="header">
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to="/">
                <img src={img} alt="Bosa Noga" />
              </Link>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <Link className={`nav-link ${splitLocation === '' ? 'active' : ''}`} to="/">
                      Главная
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className={`nav-link ${splitLocation === 'catalog.html' ? 'active' : ''}`} to="/catalog.html">
                      Каталог
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className={`nav-link ${splitLocation === 'about.html' ? 'active' : ''}`} to="/about.html">
                      О магазине
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className={`nav-link ${splitLocation === 'contacts.html' ? 'active' : ''}`}
                      to="/contacts.html"
                    >
                      Контакты
                    </Link>
                  </li>
                </ul>
                <div className="header-controls">
                  <div className="header-controls-pics">
                    <HeaderSearch />
                    <Link to="/cart.html">
                      <div className="header-controls-pic header-controls-cart">
                        <CartCounter />
                        <CartIcon />
                      </div>
                    </Link>
                  </div>
                  <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                    <input className="form-control" placeholder="Поиск" />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </Menu>
  );
}
