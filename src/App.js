import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

function App() {
  const [quote, setQuote] = useState({});

  const getQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Container>
      <Row id="quote-box">
        <Col id="text">
          <p>{quote.content}</p>
        </Col>
        <Col id="author">
          <p>{quote.author}</p>
        </Col>
        <button id="new-quote" type="button" onClick={getQuote}>New Quote</button>
        <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">twitter</a>
      </Row>
    </Container>
  );
}

export default App;
