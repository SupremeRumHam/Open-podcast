import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import { connect} from 'react-redux';
import { getUpdate, clearErrors } from '../../redux/actions/dataActions';
import  LikeButton  from './LikeButton';

const styles = {
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
    },
    button: {
      float:'right'
    },
profileImage: {
    maxWidth:200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
},
dialogContent: {
    padding: 20
},
closeButton: {
    position: 'absolute',
    left: '90%'
},
expandButton: {
position: "absolute",
left: '90%'
},
spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
}
};

class UpdateDialog extends Component {
state = {
    open: false,
    oldPath: '',
    newPath: ''
};
componentDidMount(){
    if(this.props.openDialog){
        this.handleOpen();
    }
}
handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, updatesId } = this.props;
    const newPath = `/users/${userHandle}/update/${updatesId}`;

    if(oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);
    this.setState({ open: true, oldPath, newPath});
    this.props.getUpdate(this.props.updateId);
};
handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false});
    this.props.clearErrors();
};

render() {
    const {
        classes,
        update: {
            updatesId,
            body,
            createdAt,
            likeCount,
            commentCount,
            userImage,
            userHandle,
            comments
        },
        UI: { loading}
    } = this.props;

const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
    <CircularProgress size={200} thickness={2}/>
    </div>
) : (
    <Grid container spacing={10}>
        <Grid item sm={5}>
            <img src={userImage} alt="Profile" className={classes.profileImage}/>
            </Grid>
            <Grid item sm={7}>
            <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}>
                @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant='body2' color='textSecondary'>
                {dayjs(createdAt).format('h:mm a, MMMMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeparator}/>
            <Typography variant="body1">{body}</Typography>
            <LikeButton updatesId={updatesId}/>
            <span>{likeCount} likes</span>
            <MyButton tip="comments">
                <ChatIcon color="primary"/>
            </MyButton>
            <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator}/>
        <CommentForm updatesId={updatesId}/>
        <Comments comments={comments}/>
    </Grid>
);

    return (
        <Fragment>
            <MyButton onClick={this.handleOpen}
             tip="Expand update"
              tipClassName={classes.expandButton}>
            <UnfoldMore color="primary"/>
            </MyButton>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm">
                <MyButton
                tip="Close"
                onClick={this.handleClose}
                tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
}
UpdateDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getUpdate: PropTypes.func.isRequired,
    updatesId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    update: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    update: state.data.update,
    UI: state.UI
});

const mapActionsToProps = {
    getUpdate,
    clearErrors
};

export default connect(
    mapStateToProps,
     mapActionsToProps
     )(withStyles(styles)(UpdateDialog));
