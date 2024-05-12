import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function ProductEditInner(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [productUpdated, setProductUpdated] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then(res => res.json())
      .then(product => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
      });
  }, [id]);

  const onEditFormSubmit = (e) => {
    e.preventDefault();

    fetch(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        description,
        price
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.status === 200) {
        console.log('Updated');
        props.dispatch({
          type: 'PRODUCT_UPDATE',
          _id: id,
          name,
          description,
          price
        });
        setProductUpdated(true);
      }
      else {
        console.log('Not updated');
      }
    })
  }

  useEffect(() => {
    if (productUpdated) {
      navigate('/');
    }
  }, [productUpdated, navigate]);

  return (
    <div>
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
                        Редактирование
                    </div>
                </div>
                <form onSubmit={onEditFormSubmit}>
                    <div className='widget-content'>

                    <div className='widget-content-wraper'>
                        <label for='name'>Тариф</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='form-control input'/>

                        <br />

                        <label for='description'>Описание</label>
                        <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' className='form-control input' />

                        <br />

                        <label for='price'>Цена</label>
                        <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' className='form-control input' />
                        
                        <br />

                        <input type='submit' className='btn btn-primary' value="Сохранить" />
                    </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

const ProductEdit = (props) => {
  return (
    <ProductEditInner {...props} />
  )
}

export default connect()(ProductEdit);
