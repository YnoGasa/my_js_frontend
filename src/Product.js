import React from 'react';
import { connect } from 'react-redux';
import { productDelete } from './actions';
import { NavLink } from 'react-router-dom';

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick(e) {
    e.preventDefault();

    fetch(`products/${this.props.product._id}`, {
      method: "DELETE"
    }).then((res) => {
      if (res.status === 200) {
        console.log('Deleted')
        this.props.dispatch(productDelete(this.props.product._id));
      }
      else {
        console.log('Not deleted');
      }});
  }

  render() {
    return (
      <div>
      <li className="list-group-item">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <div className="widget-heading">{this.props.product.name}</div>
                <div className="widget-subheading">
                  <div>{this.props.product.description}</div>
                  <div>₽{this.props.product.price}</div>
                </div>
              </div>
            <div className="widget-content-right">
                <NavLink className={"border-0 btn-transition btn btn-outline-success"} to={`/edit/${this.props.product._id}`}><i className="bi bi-pencil-square"></i></NavLink>
                <button className="border-0 btn-transition btn btn-outline-danger" onClick={this.onDeleteClick}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
      </li>
      </div>

    );
  }
}

export default connect() (Product);
