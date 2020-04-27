import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './shop-header.css';

const ShopHeader = ({ numItems, total }) => (
  <header className="shop-header row">
    <Link to="/">
      <div className="logo text-dark">ReStore</div>
    </Link>
    <Link to="/cart">
      <div className="shopping-cart">
        <i className="cart-icon fa fa-shopping-cart" />
        {numItems} items (${total})
      </div>
    </Link>
  </header>
);

ShopHeader.propTypes = {
  numItems: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal } }) => ({
  total: orderTotal,
  numItems: cartItems.reduce((count, item) => count + item.count, 0),
});

export default connect(mapStateToProps)(ShopHeader);
