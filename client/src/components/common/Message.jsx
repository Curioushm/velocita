import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ variant = 'info', children }) => {
  // Bootstrap alert classes: alert-info, alert-danger, alert-success, etc.
  return (
    <div className={`alert alert-${variant}`} role="alert" style={{ fontSize: '1rem', margin: '1rem 0' }}>
      {children}
    </div>
  );
};

Message.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Message;
