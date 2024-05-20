import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Product from './Product';


class ProductList extends React.Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <NavLink className={"navbar-brand"} to='/'>MediaTech</NavLink>
        <div className="navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={"btn"} to='/'>Главная</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={"btn"} to='/add'>Добавить продукт</NavLink>
              </li>
            </ul>
          </div>
        </div>
        </nav>

        <div className="card-hover-shadow-2x mb-3 card">
        <div className="card-header-tab card-header">
          <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
              Тарифы
            </div>
          
        </div>
        <div>
          <perfect-scrollbar className="ps-show-limits">
            <div style={{position: "static"}} className="ps ps--active-y">
              <div className="ps-content">
                <ul className=" list-group list-group-flush">
                {
                    this.props.products.map((product) => {
                        return (
                        <Product key={product._id} product={product}/>
                        );
                    })
                } 
                </ul>
              </div>
            </div>
          </perfect-scrollbar>
        </div>
      </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
    return {
        products: [...state.products]
    }
}

export default connect(mapStateToProps) (ProductList);
