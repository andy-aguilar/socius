import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardRun from '../components/dashboardRun';
import {connect} from 'react-redux';

class ProfileHistoryContainer extends Component {
    
    state={
        runs: [],
        renderedRuns: [],
        index: 6
    }

    componentDidUpdate() {
        if(this.props.runs.length !== this.state.runs.length){
            this.setState({
                runs: this.props.runs,
                renderedRuns: this.props.runs.slice(0, 6)
            })
        }
    }

    renderRuns = () => {
        return (this.props.loading ? <CircularProgress /> : this.props.runs.map(run => <DashboardRun key={run.id} run={run} creator={run.users.find(user => user.id === run.user_owner_id)}/>))
    }

    render(){
        return(
        <div >{this.renderRuns()}</div>
        )
    }

}

const mapStateToProps = state => {
    return {
        runs: state.runs.userHistory,
        loading: state.runs.updatingHistory,
    }
}

export default connect(mapStateToProps)(ProfileHistoryContainer)