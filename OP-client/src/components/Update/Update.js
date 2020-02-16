import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteUpdate from './DeleteUpdate';
import UpdateDialog from './UpdateDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
    '@media only screen and (max-width: 414px)': { // eslint-disable-line no-useless-computed-key
      marginLeft:"10px",
      width:"375px",
      height:"350px"
    },
    '@media only screen and (max-width: 375px)': { // eslint-disable-line no-useless-computed-key
      marginLeft:"4px",
      width:"300px",
      height:"350px"
    },
    '@media only screen and (max-width: 320px)': { // eslint-disable-line no-useless-computed-key
      marginLeft:"4px",
      width:"300px",
      height:"350px"
    }
  },
  image: {
    minWidth: 200,
    '@media only screen and (max-width: 414px)': { // eslint-disable-line no-useless-computed-key
      display:"none"
    },
    '@media only screen and (max-width: 375px)': { // eslint-disable-line no-useless-computed-key
      display:"none"
    },
    '@media only screen and (max-width: 320px)': { // eslint-disable-line no-useless-computed-key
      display:"none"
    }
  },
  content: {
    padding: 25,
    objectFit: 'cover',
    '@media only screen and (max-width: 320px)': { // eslint-disable-line no-useless-computed-key
      width: "320px",
      height: "100px"
    }
  }
};

class Update extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      update: {
        body,
        createdAt,
        userImage,
        userHandle,
        updatesId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteUpdate updatesId={updatesId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton updatesId={updatesId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <UpdateDialog
            updatesId={updatesId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Update.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Update));
/*
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteUpdate from './DeleteUpdate';
import UpdateDialog from './UpdateDialog';
import LikeButton from './LikeButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
};

class Update extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      update: {
      body,
      createdAt,
      userImage,
      userHandle,
      updatesId,
      likeCount,
      commentCount
    },
    user: {
      authenticated,
      credentials: { handle}
    }
    } = this.props;

    const deleteButton = 
    authenticated && userHandle === handle ? (
      <DeleteUpdate updatesId={updatesId}/>
    ) : null;
    return (
    <Card className={classes.card}>
      <CardMedia
      image = {userImage}
      title='Profile Image' className={classes.image}/>
      <CardContent className={classes.content}>
      <Typography variant='h5' component={Link} to={`/user/${userHandle}`} color='primary'>
      {userHandle}
      </Typography>
      {deleteButton}
      <Typography variant='body2' color='textSecondary'>
        {dayjs(createdAt).fromNow()}
      </Typography>
      <Typography variant="body1">{body}</Typography>
      <LikeButton updatesId={updatesId}/>
      <span>{likeCount} Likes</span>
      <MyButton tip='comments'>
      <ChatIcon color="primary"/>
      </MyButton>
      <span>{commentCount} comments</span>
      <UpdateDialog updatesId={updatesId} userHandle={userHandle} openDialog={this.props.openDialog}/>
      </CardContent>
      </Card>
    );
  }
}

Update.propTypes = {
  user: PropTypes.object.isRequired,
  update: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Update));
*/
