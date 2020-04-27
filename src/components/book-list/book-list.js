import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import BookListItem from '../book-list-item';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import withBookstoreService from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions';
import compose from '../../utils';

import './book-list.css';

const BookList = ({ books, onAddedToCart }) => (
  <ul className="book-list">
    {
      books.map((book) => (
        <li key={book.id}>
          <BookListItem book={book} onAddedToCart={() => onAddedToCart(book.id)} />
        </li>
      ))
    }
  </ul>
);

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddedToCart: PropTypes.func.isRequired,
};

class BookListContainer extends Component {
  componentDidMount() {
    const { fetchAllBooks } = this.props;
    fetchAllBooks();
  }

  render() {
    const {
      books,
      loading,
      error,
      onAddedToCart,
    } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return <BookList books={books} onAddedToCart={onAddedToCart} />;
  }
}

BookListContainer.propTypes = {
  fetchAllBooks: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  onAddedToCart: PropTypes.func.isRequired,
};

const mapStateToProps = ({ bookList: { books, loading, error } }) => ({
  books,
  loading,
  error,
});

const mapDispatchToProps = (dispatch, { bookstoreService }) => bindActionCreators({
  fetchAllBooks: fetchBooks(bookstoreService),
  onAddedToCart: bookAddedToCart,
}, dispatch);

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps),
)(BookListContainer);
