import React from 'react';
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, listType = '' }) => {
  if (pages <= 1) return null;

  // Determine base path for admin or user
  let basePath = '';
  if (isAdmin && listType === 'orderlist') {
    basePath = '/admin/orders/page/';
  } else if (isAdmin && listType === 'productlist') {
    basePath = '/admin/products/page/';
  } else {
    basePath = '/page/';
  }

  return (
    <nav className="my-4">
      <ul className="pagination justify-content-center">
        {[...Array(pages).keys()].map(x => (
          <li
            key={x + 1}
            className={`page-item${page === x + 1 ? ' active' : ''}`}
          >
            <Link
              className="page-link"
              to={`${basePath}${x + 1}`}
            >
              {x + 1}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
