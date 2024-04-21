// RetroCodeContext.js
import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const RetroCodeContext = createContext();

export const RetroCodeProvider = ({ children }) => {
  const [retroCode, setRetroCode] = useState('');
  const value = useMemo(
    () => ({ retroCode, setRetroCode }),
    [retroCode, setRetroCode],
  );

  return (
    <RetroCodeContext.Provider value={value}>
      {children}
    </RetroCodeContext.Provider>
  );
};

RetroCodeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
