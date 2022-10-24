import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/style.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer/Footer';
import Error404 from './components/Error404/Error404';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Catalog from './components/Catalog/Catalog';
import MainPage from './components/MainPage/MainPage';
import ProductCard from './components/ProductCard/ProductCard';
import Cart from './components/Cart/Cart';

export const appURL = '/ra16-diploma';
export const serverURL = 'https://ra16-dplm-bcknd.herokuapp.com/api/';

function App(): ReactElement {
  return (
    <Router basename={appURL}>
      <div className="wrapper>">
        <Header />
        <Main>
          <Banner />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/about.html" exact component={About} />
            <Route path="/contacts.html" exact component={Contacts} />
            <Route path="/catalog.html" exact component={Catalog} />
            <Route path="/items/:id.html" exact component={ProductCard} />
            <Route path="/cart.html" exact component={Cart} />
            <Route path="*" component={Error404} /> CartIcon
          </Switch>
        </Main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
