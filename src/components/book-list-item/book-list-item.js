import React from 'react';
import PropTypes from 'prop-types';

import './book-list-item.css';

const BookListItem = ({ book, onAddedToCart }) => {
  const {
    title,
    author,
    price,
    coverImage,
  } = book;

  return (
    <div className="book-list-item">
      <div className="book-cover">
        <img src={coverImage} alt="cover" />
      </div>
      <div className="book-details">
        <span className="book-title">{title}</span>
        <div className="book-author">{author}</div>
        <div className="book-price">${price}</div>
        <button
          type="button"
          className="btn btn-info add-to-cart"
          onClick={onAddedToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

BookListItem.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    price: PropTypes.number,
    coverImage: PropTypes.string,
  }).isRequired,
  onAddedToCart: PropTypes.func.isRequired,
};

export default BookListItem;
