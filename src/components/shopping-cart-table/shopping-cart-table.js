import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { bookAddedToCart, bookRemovedFromCart, allBooksREmovedFromCart } from '../../actions';

import './shopping-cart-table.css';

const ShoppingCartTable = ({
  items,
  total,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const renderRow = (item, idx) => {
    const {
      id,
      title,
      count,
      total: itemTotal,
    } = item;

    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{count}</td>
        <td>${itemTotal}</td>
        <td>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={() => onDelete(id)}
          >
            <i className="fa fa-trash-o" />
          </button>
          <button
            type="button"
            className="btn btn-outline-success btn-sm float-right"
            onClick={() => onIncrease(id)}
          >
            <i className="fa fa-plus-circle" />
          </button>
          <button
            type="button"
            className="btn btn-outline-warning btn-sm float-right"
            onClick={() => onDecrease(id)}
          >
            <i className="fa fa-minus-circle" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            items.map(renderRow)
          }
        </tbody>
      </table>

      <div className="total">
        Total: ${total}
      </div>
    </div>
  );
};

ShoppingCartTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { shoppingCart: { cartItems, orderTotal } } = state;
  return {
    items: cartItems,
    total: orderTotal,
  };
};


const mapDispatchToProps = {
  onIncrease: bookAddedToCart,
  onDecrease: bookRemovedFromCart,
  onDelete: allBooksREmovedFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);
