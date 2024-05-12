import React from 'react';
import { Provider, connect } from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import ProductAdd from './ProductAdd';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';
import { productAddAll } from './actions';

class App extends React.Component {
  componentDidMount() {
    fetch('/products').then(function(res) {
      return res.json();
    }).then((data) => {
      this.props.dispatch(productAddAll(data));
    });
  }

  render() {
    return (
          <Provider store={this.props.store}>
            <Router>
              <Routes>
                <Route path='/' element={<ProductList />} />
                <Route path='/add' element={<ProductAdd />} />
                <Route path="/edit/:id" element={<ProductEdit />} />
              </Routes>
            </Router>
          </Provider>
    );
  }
}

export default connect() (App);
