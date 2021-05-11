import React from 'react';
import { useHistory } from 'react-router-dom';
import './Products.css';

const Products = (props) => {
    const { _id, name, imageURL, price, quantity } = props.pd;
    const history = useHistory();

    const handleBuyProduct = id => {
        history.push(`/product/${id}`);
    };

    return (
        <div className="col-md-4">
            <div className="card product-card">
                <img className="card-img-top img-fluid" src={imageURL} alt="productImg" />
                <div className="card-body text-center">
                    <p className="card-text">Id : {_id}</p>
                    <h4 className="card-title">{name}</h4>
                    <p className="card-text">Quantity : {quantity || 1}</p>
                </div>
                <div className="card-footer product-card-footer">
                    <h5 className="card-title">tk {price}</h5>
                    <button className="btn btn-primary buy-btn" onClick={() => handleBuyProduct(_id)}>Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Products;