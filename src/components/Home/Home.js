import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';

const Home = () => {
    const [products, setProducts] = useState([]);

    const toggleSpinner = () => {
        document.getElementById('spinner-loader').classList.toggle('d-none');
    };

    useEffect(() => {
        toggleSpinner();
        fetch('https://secret-citadel-75547.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                toggleSpinner();
            })
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-dark m-3 d-none" id="spinner-loader" role="status">
                    <span className="visually-hidden"></span>
                </div>
            </div>
            <div className="row g-2">
                {
                    products.map(pd => <Products pd={pd} key={pd._id} ></Products>)
                }
            </div>
        </div>
    );
};

export default Home;