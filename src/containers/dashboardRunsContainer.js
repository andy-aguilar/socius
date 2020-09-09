import React, { Component } from 'react';
import DashboardRun from '../components/dashboardRun';
import CircularProgress from '@material-ui/core/CircularProgress'


class DashboardRunsContainer extends Component {
    
    state={
        runs: [],
        renderedRuns: [],
        index: 2
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate() {
        if (this.props.runs.length !== this.state.runs.length){
            if(this.props.runs.length === 5){
                this.setState({
                    runs: this.props.runs,
                    renderedRuns: this.props.runs.slice(0, 2)
                })
            }
        }
    }

    handleScroll = (e) => {
        if(e.target.documentElement){
            if(e.target.documentElement.scrollHeight - Math.floor(e.target.documentElement.scrollTop) === ( e.target.documentElement.clientHeight) ){
                if(this.state.renderedRuns.length !== this.state.runs.length){
                    this.setState({
                        renderedRuns: [...this.state.renderedRuns, ...this.state.runs.slice(this.state.index, this.state.index + 2)],
                        index: this.state.index + 2
                    })
                }
            }
        }
    }

    renderRuns = () => {
        //props.runs.map(run => <li>{run.name}</li>)
        return (this.props.runs.loading ? <CircularProgress /> : this.state.renderedRuns.map(run => <DashboardRun key={run.id} run={run} creator={run.users.find(user => user.id === run.user_owner_id)}/>))
        
    }

    render(){
        return(
            <div style={{marginTop: '40px'}}>{this.renderRuns()}</div>
        )
    }

}

export default DashboardRunsContainer