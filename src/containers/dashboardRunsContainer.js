import React, { Component } from 'react';
import DashboardRun from '../components/dashboardRun';
import CircularProgress from '@material-ui/core/CircularProgress';
import {connect} from 'react-redux';
import { fetchRuns } from '../actions/runActions'


class DashboardRunsContainer extends Component {
    
    // state={
    //     runs: [],
    //     renderedRuns: [],
    //     index: 2
    // }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        this.props.fetchRuns(localStorage.currentUser, 0)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }

    // componentDidUpdate() {
    //     if (this.props.runs.length !== this.state.runs.length){
    //         if(this.props.runs.length === 5){
    //             this.setState({
    //                 runs: this.props.runs,
    //                 renderedRuns: this.props.runs.slice(0, 2)
    //             })
    //         }
    //     }
    // }

    handleScroll = (e) => {
        if(e.target.documentElement){
            if(e.target.documentElement.scrollHeight - Math.floor(e.target.documentElement.scrollTop) === ( e.target.documentElement.clientHeight) ){
                if(!this.props.loading){
                    this.props.fetchRuns(localStorage.currentUser, this.props.offset)
                }
            }
        }
    }

    renderRuns = () => {
        //props.runs.map(run => <li>{run.name}</li>)
        return ((this.props.runs.length === 0 && this.props.loading) ? <CircularProgress /> : this.props.runs.map(run => <DashboardRun key={run.id} run={run} creator={run.users.find(user => user.id === run.user_owner_id)}/>))
        
    }

    render(){
        return(
            <div style={{marginTop: '40px'}}>
                {this.renderRuns()}
                {this.props.loading ? <CircularProgress /> : null}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        runs: state.runs.runs,
        offset: state.runs.offset,
        loading: state.runs.loading,
    }
}

export default connect(mapStateToProps, {fetchRuns})(DashboardRunsContainer)