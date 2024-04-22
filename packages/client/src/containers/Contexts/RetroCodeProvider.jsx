import React, { useState, useMemo } from 'react';
import { RetroCodeContext } from './RetroCodeContext';
import { PropTypes } from 'prop-types';

export function RetroCodeProvider({ children }) {
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
}

RetroCodeProvider.propTypes = {
  children: PropTypes.node,
};

RetroCodeProvider.defaultProps = {
  children: null,
};
