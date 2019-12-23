import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StaticProfile from '../components/profile/StaticProfile';
import Update from '../components/Update/Update';
import Grid from '@material-ui/core/Grid';
import UpdateSkeleton from '../util/UpdateSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';
import { connect} from 'react-redux';
import { getUserData} from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        updatesIdParam: null
    };
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const updatesId = this.props.match.params.updatesId;

        if(updatesId) this.setState({ updatesIdParam: updatesId});

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
        .then((res) => {
            this.setState({
                profile: res.data.user
            });
        })
        .catch((err) => console.log(err));
    }
    render(){
            const { updates, loading } = this.props.data;
            const { updatesIdParam} = this.state;
            const updatesMarkup = loading ? (
                <UpdateSkeleton/>
            ) : updates === null ? (
                <p>No updates from this user</p>
            ) : !updatesIdParam ? (
                updates.map((update) => <Update key={update.updatesId} update={update}/>)
                    ) : (
                        updates.map((update) => {
                            if(update.updatesId !== updatesIdParam)
                            return <Update key={update.updatesId} update={update}/>;
                            else return <Update key={update.updatesId} update={update} openDialog/>;
                        })
                    );
    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={10}>
                {updatesMarkup}
            </Grid>
            <Grid item sm={4} xs={10}>
            {this.state.profile === null ? (
                <ProfileSkeleton/>
            ) : (
                <StaticProfile profile={this.state.profile}/>
            )}
            </Grid>
        </Grid>

    );
}
}
user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getUserData})(user);