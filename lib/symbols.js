import React, { PropTypes } from 'react';
import { maskFor, iconFor } from './networks';

function renderBackgroundSymbol() {
  return (
    <symbol id="background" viewBox="0 0 64 64">
      <g className="social-background">
        <circle cx="32" cy="32" r="31" />
      </g>
    </symbol>
  );
}

function renderSymbols(props) {
  return props.networks.map((key) => [
    <symbol id={`${key}-icon`} viewBox="0 0 64 64">
      <g className="social-icon">
        <path d={iconFor(key)} />
      </g>
    </symbol>,
    <symbol id={`${key}-mask`} viewBox="0 0 64 64">
      <g className="social-mask">
        <path d={maskFor(key)} />
      </g>
    </symbol>,
  ]);
}

function Symbols(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="social-symbols" version="1.1">
      {renderBackgroundSymbol()}
      {renderSymbols(props)}
    </svg>
  );
}

Symbols.propTypes = {
  networks: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Symbols;
