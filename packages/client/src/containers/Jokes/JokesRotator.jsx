import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './JokesRotator.css';

function Bubble({ children }) {
  return <div className="Bubble">{children}</div>;
}

Bubble.propTypes = {
  children: PropTypes.node,
};

Bubble.defaultProps = {
  children: null,
};

function JokesRotator({ jokes }) {
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentJokeIndex, jokes.length]);

  return (
    <Bubble>
      <article>
        <h2>Joke</h2>
        <p>{jokes[currentJokeIndex]}</p>
      </article>
    </Bubble>
  );
}

JokesRotator.propTypes = {
  jokes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JokesRotator;
