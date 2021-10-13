import axios from 'axios';
import React from 'react';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../register-view/register-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }


  componentDidMount() {
    axios.get('https://myflix-api-00001.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {

    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />


    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}