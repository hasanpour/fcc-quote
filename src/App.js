import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GithubCorner from 'react-github-corner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import './App.css';

/**
   * Use on background color
   * @returns random color
   */
const randomColor = () => {
  const colors = ['#f16966', '#00413d', '#3c415e', '#c81d11', '#2e3136', '#d99058', '#0067a5', '#701c1c'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function App() {
  const [quote, setQuote] = useState({
    content: '',
    author: '',
  });
  const [bgColor, setBgColor] = useState(randomColor());
  const [textOpacity, setTextOpacity] = useState(0);

  /**
   * Fetch a quote from API
   */
  const getQuote = async () => {
    setBgColor(randomColor());
    setTextOpacity(0);

    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data);
    } catch (error) {
      setQuote({
        content: error,
        author: 'error',
      });
    }

    setTextOpacity(1);
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="wrapper" style={{ backgroundColor: bgColor }}>
      <div id="quote-box">
        <div id="text">
          <p className="quote-text" style={{ color: bgColor, opacity: textOpacity }}>
            <FontAwesomeIcon icon={faQuoteLeft} />
            {' '}
            {quote.content}
            {' '}
            <FontAwesomeIcon icon={faQuoteRight} />
          </p>
        </div>

        <div id="author">
          <p className="quote-text" style={{ color: bgColor, opacity: textOpacity }}>
            -
            {' '}
            {quote.author}
          </p>
        </div>

        <div className="card-controls">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`“${quote.content}”\n-${quote.author}`)}`}
            target="_blank"
            title="Share this on Twitter!"
            rel="noreferrer"
            style={{ backgroundColor: bgColor }}
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <button
            id="new-quote"
            type="button"
            onClick={getQuote}
            style={{ backgroundColor: bgColor }}
          >
            New Quote
          </button>
        </div>
      </div>

      <GithubCorner href="https://github.com/hasanpour/fcc-quote" />
    </div>
  );
}
