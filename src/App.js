import React, { Component } from 'react';
import { Row, Col, Card, Carousel } from 'antd';
import logo from './logo.png';
import './stylesheets/App.scss';

import companies from './companies';

class App extends Component {

  state = {
    companies,
    movies: [],
    suggest: []
  }

  handleClick = (page, id) => {
    this.props.history.push(`/${page}/${id}`);
  }

  async getMovies() {
    const movies = await fetch(`${process.env.REACT_APP_API_URL}movies`)
      .then(res => res.json());

    const suggest = await fetch(`${process.env.REACT_APP_API_URL}suggest`)
      .then(res => res.json());


    this.setState({ movies, suggest });
  }

  componentDidMount = () => {
    this.getMovies();
  }

  render() {
    const movies = [...this.state.movies];
    const suggest = [...this.state.suggest];

    const highlightItems = movies.filter(movie => movie.highlighted).map(item => {
      return (
        <div key={item.id} className="highlight-item">
          <Card
            cover={
              <img
                alt={item.title}
                src={item.cover}
              />
            }
            onClick={() => this.handleClick("movie", item.id)}
          />
        </div>
      );
    });

    // Object.keys() nous donne un tableau numérique avec toutes les clés du tableau associatif 
    // ["disney", "marvel", "pixar", "starwars"]
    const companiesList = Object.keys(companies).map(key => {
      return (
        <Col key={key} className="company" md={6}>
          <Card
            cover={
              <img
                alt={companies[key]}
                src={`${process.env.PUBLIC_URL}/img/companies/logo-${key}.png`}
              />
            }
            onClick={() => this.handleClick("company", key)}
          />
        </Col>
      );
    });

    const newList = movies.slice(0, 6).map(movie => {
      return (
        <Col key={movie.id} className="item" md={4}>
          <Card
            cover={
              <img
                alt={movie.title}
                src={movie.poster}
              />
            }
            onClick={() => this.handleClick("movie", movie.id)}
          />
        </Col>
      );
    });

    const suggestionsList = suggest.slice(suggest.length - 3).map(movie => {
      return (
        <Col key={movie.id} className="item" md={8}>
          <Card
            cover={
              <img
                alt={movie.title}
                src={movie.cover}
              />
            }
            onClick={() => this.handleClick("movie", movie.id)}
          />
        </Col>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div className="App-container">
          <Carousel >
            {highlightItems}
          </Carousel>

          <div className="companies">
            <Row gutter={16}>
              {companiesList}
            </Row>
          </div>

          <div className="new">
            <h2>Nouveautés</h2>
            <Row gutter={16}>
              {newList}
            </Row>
          </div>

          <div className="suggestions">
            <h2>Suggestions</h2>
            <Row gutter={16}>
              {suggestionsList}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
