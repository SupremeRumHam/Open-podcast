import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Ad from '../components/Ad/Ad';
import AdProfile from '../components/profile/AdProfile';
import AdSkeleton from '../util/AdSkeleton';
import host from '../images/transistor.jpg';

import { connect } from 'react-redux';
import { getAds } from '../redux/actions/dataActions';

class ad extends Component {
  componentDidMount() {
    this.props.getAds();
  }
  render() {
    const { ads, loading, classes } = this.props.data;
    let recentAdsMarkup = !loading ? (
      ads.map((ad) => <Ad key={ad.adsId} ad={ad} />)
    ) : (
      <AdSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={10}>
          {recentAdsMarkup}
        </Grid>
        <Grid item sm={4} xs={10}>
          <AdProfile />
          <p>1234567890</p>
          <a href='https://transistor.fm/?via=supremerumham'>
          <img src={host} style={{
    height: "125px", width:"125px", marginTop: "1%", marginLeft:"30%"}} alt="transistor.fm"/></a>
        </Grid>
      </Grid>
    );
  }
}

ad.propTypes = {
  getAds: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getAds }
)(ad);
