import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeUpdate, unlikeUpdate } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedUpdate = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.updatesId === this.props.updatesId
      )
    )
      return true;
    else return false;
  };
  likeUpdate = () => {
    this.props.likeUpdate(this.props.updatesId);
  };
  unlikeUpdate = () => {
    this.props.unlikeUpdate(this.props.updatesId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedUpdate() ? (
      <MyButton tip="Undo like" onClick={this.unlikeUpdate}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeUpdate}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  updatesId: PropTypes.string.isRequired,
  likeUpdate: PropTypes.func.isRequired,
  unlikeUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeUpdate,
  unlikeUpdate
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);
/*
import React, { Component} from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { connect } from 'react-redux';
import {likeUpdate, unlikeUpdate} from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedUpdate = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.updatesId === this.props.updatesId
          )
        )
        return true;
        else return false;
      };
      likeUpdate = () => {
        this.props.likeUpdate(this.props.updatesId);
      };
      unlikeUpdate = () => {
        this.props.unlikeUpdate(this.props.updatesId);
      };
      render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
          <Link to="/login">
            <MyButton tip="Like">
              <FavoriteBorder color="primary" />
            </MyButton>
          </Link>
        ) : this.likedUpdate() ? (
          <MyButton tip="Undo like" onClick={this.unlikeUpdate}>
            <FavoriteIcon color="primary" />
          </MyButton>
        ) : (
          <MyButton tip="Like" onClick={this.likeUpdate}>
            <FavoriteBorder color="primary" />
          </MyButton>
        );
        return likeButton;
      }
    }

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    updatesId: PropTypes.string.isRequired,
    likeUpdate: PropTypes.func.isRequired,
    unlikeUpdate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeUpdate,
    unlikeUpdate
};

export default connect(
  mapStateToProps, mapActionsToProps
  )(LikeButton);
  */