import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    // DayView,
    // WeekView,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui';
import {connect} from 'react-redux';

const currentDate = new Date();


// const schedulerData = [
//     { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//     { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];


const Calendar = (props) => {

    const [data, setData] = useState([])

    useEffect(() => {
        if(props.runs.length > 0 && props.userHistory.length > 0){
            if(props.runs.length + props.userHistory.length != data.length){
                let allRuns = [...props.runs, ...props.userHistory]
                let schedulerD = allRuns.map(run => {
                    let foo = run.date.split('T')[0].split('-').map(date => parseInt(date, 10))
                    let bar = new Date(foo[0], foo[1], foo[2], 6)
                    let end = new Date(foo[0], foo[1], foo[2], 7)
                    return {startDate: bar, title: run.name, endDate: end}
                })
                setData(schedulerD)
            }
        }
    }, [props.runs, props.userHistory])

    return(
        <div>
            { data.length === 0 ? 
                null :
                <Scheduler
                    data={data}
                    >
                    <ViewState
                        defaultCurrentDate={currentDate}
                    />
                    {/* <DayView
                        startDayHour={0}
                        endDayHour={24}
                    /> */}
                    <MonthView
                        startDayHour={5}
                        endDayHour={14}
                    />
                    <Appointments />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <AllDayPanel />
                </Scheduler>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        runs: state.runs.userRuns,
        runsLoading: state.runs.loadingUserruns,
        userHistory: state.runs.userHistory,
        historyLoading: state.runs.updatingHistory,
    }
}

export default connect(mapStateToProps)(Calendar)