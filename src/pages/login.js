import React, {
  Component
} from 'react';

import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import AppIcon from '../images/OP.png';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

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
    color: '1px solid rgba(0,0,0,0.1)',
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
  }
};

class login extends Component {
  constructor(){
    super();
    this.state = {
      email: ' ',
      password: ' ',
      errors: {}
    };
  }
  componentDidUpdate(nextProps){
    if(nextProps.UI.errors){
    this.setState({ errors:nextProps.UI.errors});
  }
}
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: {loading} } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
      <Grid item sm/>
      <Grid item sm>
      <img src={AppIcon} alt="logo" className={classes.image} />
      <Typography variant='h2' className={classes.pageTitle}>
      Login
      </Typography>
      <form noValidate onSubmit={this.handleSubmit}>
      <TextField id='email'
      name='email'
       type='email'
        label="Email"
         className={classes.textField}
         helperText={errors.email}
         error={errors.email ? true : false}
      value={this.state.email}
      onChange={ this.handleChange} fullWidth/>

<TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />

      {errors.general && (
        <Typography variant='body2'
        className={classes.customError}>
        {errors.general}
        </Typography>
      )}
      <Button type="submit"
      variant='contained'
      color='primary'
      className={classes.button}
      disabled={loading}
      >
      Login
      {loading && (
        <CircularProgress size={30}
        className={classes.progress}/>
      )}
      </Button>
      <br/>
      <small> Don't have an account? Sign up <Link to="/signup">here</Link></small>
      </form>
      </Grid>
      <Grid item sm/>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
