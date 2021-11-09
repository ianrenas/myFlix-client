// main-view.jsx
import React from 'react';
import axios from 'axios';// Using it to fetch the movies, then set the state of movies using this.setState
import { BrowserRouter as Router, Route } from "react-router-dom";

import { connect } from 'react-redux';

// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';

//#1 The rest of components import statements but without the MovieCard's 
//because it will be imported and used in the MoviesList component rather than in here. 
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


import NavBar from '../navbar-view/navbar-view'


// SCSS Styling import
import './main-view.scss';


// #2 export keyword removed from here
class MainView extends React.Component {

  constructor() {
    super();

    // #3 movies state removed from here
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // Log In
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });


    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // Getting all movies in Database
  getMovies(token) {
    axios.get('https://myflix-api-00001.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }//By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API
    })
      .then(response => {

        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //  Getting user recent data from Database
  getUsers(token) {
    axios.post('https://myflix-api-00001.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //same code as above
        this.props.setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //When a new user is registered  
  onRegister(register) {
    this.setState({
      register: register,
    });
  }

  render() {

    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <NavBar user={user} />

        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user)
              return <Col>
                <LoginView onLoggedIn={user =>
                  this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          <Route path="/profile" render={() => {
            if (!user) return <Col>
              <ProfileView />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user =>
                this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m =>
                m._id === match.params.movieId)} onBackClick={() =>
                  history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user =>
                this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m =>
                m.Director.Name === match.params.name).Director} onBackClick={() =>
                  history.goBack()} />
            </Col>
          }
          } />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user =>
                this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m =>
                m.Genre.Name === match.params.name).Genre} onBackClick={() =>
                  history.goBack()} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={(data) =>
              this.onLoggedIn(data)} />;
            if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />

        </Row>
      </Router>
    );
  }
};


// #7
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #8
export default connect(mapStateToProps, { setMovies })(MainView);