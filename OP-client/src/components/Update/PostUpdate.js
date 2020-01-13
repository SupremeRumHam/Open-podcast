import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postUpdate, clearErrors } from '../../redux/actions/dataActions';

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
submitButton: {
position: 'relative',
float: 'right',
marginTop: 10
},
progressSpinner: {
position: 'absolute'
},
closeButton: {
position: 'absolute',
left: '91%',
top: '6%'
}
};

class PostUpdate extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };
  getDerivedStateFromProp(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postUpdate({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post an Update!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Post a new Update</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="UPDATE!!"
                multiline
                rows="3"
                placeholder="Post an Update"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostUpdate.propTypes = {
  postUpdate: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postUpdate, clearErrors }
)(withStyles(styles)(PostUpdate));
/*
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { postUpdate, clearErrors } from '../../redux/actions/dataActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import MyButton from '../../util/MyButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

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
submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
},
progressSpinner: {
    position: 'absolute'
},
closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
}
};

class PostUpdate extends Component {
    state = {
        open: false,
        body: ' ',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: ' ', open:false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({ open: true});
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {}});
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postUpdate({ body: this.state.body});
    };
    render(){
        const { errors} = this.state;
        const { classes, UI:{loading} } = this.props;
        return (
            <Fragment>
            <MyButton onClick={this.handleOpen} tip="Post an Update!">
                <AddIcon/>
            </MyButton>
            <Dialog
            open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                    <CloseIcon/>
                </MyButton>
            <DialogTitle> Post a new update</DialogTitle>
            <DialogContent>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    name="body"
                    type="text"
                    label="Updates"
                    multiline
                    rows="3"
                    placeholder="interact with the community"
                    error={errors.body ? true : false}
                    helperText={errors.body}
                    className={classes.textField}
                    onChange={this.handleChange}
                    fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary"
                    className={classes.submitButton} disabled={loading}>
                        Submit
                        {loading && (
                            <CircularProgress size={30} className={classes.progressSpinner}/>
                        )}
                    </Button>
                </form>
            </DialogContent>
            </Dialog>
            </Fragment>
        );
    }
}

PostUpdate.propTypes = {
    postUpdate: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
});

export default connect(
  mapStateToProps, 
    { postUpdate, clearErrors}
    )(withStyles(styles)(PostUpdate));
    */