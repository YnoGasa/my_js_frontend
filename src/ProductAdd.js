import React from 'react';
import { useNavigate, NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import { productAdd } from './actions';

class ProductAddInner extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      description: '',
      price: 0
    }

    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
  }

  onNameChange(e) {
    e.preventDefault();

    this.setState({
        name: e.target.value
    });
  }

  onDescriptionChange(e) {
    e.preventDefault();

    this.setState({
        description: e.target.value
    });
  }

  onPriceChange(e) {
    e.preventDefault();

    this.setState({
        price: e.target.value
    });
  }

  onAddFormSubmit(e) {
    e.preventDefault();

    fetch(`products` , {
        method: "POST",
        body: JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        this.props.dispatch(productAdd(data._id, data.name, data.description, data.price));
        
        this.props.history('/');
    })
  }

  render() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <NavLink className={"navbar-brand"} to='/'>MediaTech</NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NavLink className={"btn"} to='/'>Главная</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className={"btn"} to='/'>Тарифы</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="card-hover-shadow-2x mb-3 card">
                <div className="card-header-tab card-header">
                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        Новый тариф
                    </div>
                </div>
                    <form onSubmit={this.onAddFormSubmit}>
                        <div className='widget-content'>
                            <div className='widget-content-wraper'>
                                <label for='name'>Тариф</label>
                                <input type='text' value={this.state.name} onChange={this.onNameChange} name='name' placeholder='Название тарифа' className='form-control input'/>
                                <br />
                                <label for='description'>Описание</label>
                                <input type='text' value={this.state.description} onChange={this.onDescriptionChange} name='description' placeholder='Описание тарифа' className='form-control input' />
                                <br />
                                <label for='price'>Цена</label>
                                <input type='number' value={this.state.price} onChange={this.onPriceChange} name='price' placeholder='Цена' className='form-control input' />
                                <br />
                                <input type='submit' className='btn btn-primary' value="Добавить" />
                            </div>
                        </div>
                    </form>
            </div>
        </div>
    );
  }
}
const ProductAdd = (props) => {
    return (
        <ProductAddInner {...props} history={useNavigate()} />
    )
}
export default connect() (ProductAdd);
