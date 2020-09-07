import React, { Component } from 'react';
import ProfileRun from '../components/profileRun'
import CircularProgress from '@material-ui/core/CircularProgress'
import DashboardRun from '../components/dashboardRun'

class ProfileRunsContainer extends Component {
    
    state={
        runs: [],
        renderedRuns: [],
        index: 6
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
        if(this.props.runs.length != this.state.runs.length){
            this.setState({
                runs: this.props.runs,
                renderedRuns: this.props.runs.slice(0, 6)
            })
        }
    }

    handleScroll = (e) => {
        if(e.target.documentElement){
            if(e.target.documentElement.scrollHeight - Math.floor(e.target.documentElement.scrollTop) === ( e.target.documentElement.clientHeight) ){
                console.log('bottom')
                if(this.state.renderedRuns.length != this.state.runs.length){
                    this.setState({
                        renderedRuns: [...this.state.renderedRuns, ...this.state.runs.slice(this.state.index, this.state.index + 2)],
                        index: this.state.index + 2
                    })
                }
            }
        }
    }

    renderRuns = () => {
        return (this.props.loading ? <CircularProgress /> : this.state.renderedRuns.map(run => <DashboardRun key={run.id} run={run} creator={run.users.find(user => user.id === run.user_owner_id)}/>))
    }

    render(){
        return(
        <div >{this.renderRuns()}</div>
        )
    }

}

export default ProfileRunsContainer