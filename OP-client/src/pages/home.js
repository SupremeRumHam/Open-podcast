import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Update from '../components/Update/Update';
import Profile from '../components/profile/Profile';
import UpdateSkeleton from '../util/UpdateSkeleton';
import Ad from '../images/transistor.jpg';

import { connect } from 'react-redux';
import { getUpdates } from '../redux/actions/dataActions';

class home extends Component {
  componentDidMount() {
    this.props.getUpdates();
  }
  render() {
    const { updates, loading, classes } = this.props.data;
    let recentUpdatesMarkup = !loading ? (
      updates.map((update) => <Update key={update.updatesId} update={update} />)
    ) : (
      <UpdateSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={10}>
          {recentUpdatesMarkup}
        </Grid>
        <Grid item sm={4} xs={10}>
          <Profile />
          <a href='https://transistor.fm/?via=supremerumham'>
          <img src={Ad} style={{
    height: "125px", width:"125px", marginTop: "1%", marginLeft:"30%"}} alt="transistor.fm"/></a>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getUpdates: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUpdates }
)(home);

/*
import React, {
  Component
} from 'react';

import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Update from '../components/Update/Update';
import Profile from '../components/profile/Profile';
import UpdateSkeleton from '../util/UpdateSkeleton';
import { connect } from 'react-redux';
import { getUpdates } from '../redux/actions/dataActions';

class home extends Component {
    componentDidMount(){
      this.props.getUpdates();
    }
  render() {
    const {updates, loading } = this.props.data;
    let recentUpdatesMarkup = !loading ? (
      updates.map((update) => <Update key={update.updatesId} update={update}/>)
    ) : (
     <UpdateSkeleton/>
  );
    return (
      <Grid container spacing={10}>
      <Grid item sm={8} xs={10}>
      {recentUpdatesMarkup}
      </Grid>
      <Grid item sm={4} xs={10}>
      <Profile/>
      </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getUpdates: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getUpdates })(home);
*/
