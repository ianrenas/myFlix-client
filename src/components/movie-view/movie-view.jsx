import React from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;


    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card>
                <div className="movie-view">
                  <div className="movie-poster">
                    <img src={movie.ImagePath} />
                  </div>
                  <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                  </div>
                  <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                  </div>
                  <div className="genre-title">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                  </div>
                  <div className="genre-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Genre.Description}</span>
                  </div>
                  <div className="director-title">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                  </div>
                  <div className="director-bio">
                    <span className="label">Bio: </span>
                    <span className="value">{movie.Director.Bio}</span>
                  </div>


                  <Button onClick={() => { onBackClick(null); }}>Back</Button>

                </div>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
  }).isRequired
}