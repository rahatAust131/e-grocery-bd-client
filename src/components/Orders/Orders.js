import React, { useContext, useEffect, useState } from 'react';
import './Orders.css';
import { UserContext } from '../../App';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser] = useContext(UserContext);

    useEffect(() => {
        const url = `https://secret-citadel-75547.herokuapp.com/orders?email=${loggedInUser.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOrders(data)
            })
    });
    return (
        <div className="text-center orders-container">
            <h3>Hi <span className="colored-text">{loggedInUser.displayName}</span>! You have {orders.length} orders</h3>
            <table className="table table-striped order-table">
                <thead>
                    <tr>
                        <th className="th" scope="col">Item Name</th>
                        <th className="th" scope="col">Order Placing Time</th>
                        <th className="th" scope="col">Price</th>
                        <th className="th" scope="col">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order =>
                            <tr className="tr">
                                <td className="td">{order.item.name}</td>
                                <td className="td">{new Date(order.time).toDateString('dd/mm/yyyy')}</td>
                                <td className="td">{order.item.price}</td>
                                <td className="td">{order.item.quantity}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Orders;