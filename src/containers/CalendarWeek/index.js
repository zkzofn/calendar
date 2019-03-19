import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import {
  GridList,
  GridListTile,
  Typography
} from '@material-ui/core';
import {
  openDialog,
  openAlert,
  closeAlert,
  setALertErrorMessage,
  checkSchedule,
  deleteSchedule,
  saveSchedule,
} from '../../actions/RequestManager'
import { errorMessage } from '../../actions/constants'
import CustomDialog from '../../components/CustomDialog';
import MonthCard from '../../components/MonthCard'
import Alert from '../../components/Alert';


class CalendarWeek extends Component {
  onDragStart = (event, schedule, id) => {
    event.dataTransfer.setData('schedule', JSON.stringify(schedule));
  }

  onDragOver = event => {
    event.preventDefault();
  }

  onDrop = (event, targetTime) => {
    const originSchedule = JSON.parse(event.dataTransfer.getData("schedule"));
    const originStartTime = new Date(originSchedule.startTime);
    const originEndTime = new Date(originSchedule.endTime);
    const diffHours = (originEndTime - originStartTime) / 1000 / 60 / 60;
    const targetYear = targetTime.getFullYear();
    const targetMonth = targetTime.getMonth();
    const targetDate = targetTime.getDate();
    const targetStartHours = targetTime.getHours();
    const startTime = new Date(targetYear, targetMonth, targetDate, targetStartHours);
    const endTime = new Date(targetYear, targetMonth, targetDate, targetStartHours + diffHours);

    if (checkSchedule(startTime, endTime, originSchedule)) {
      console.log(true)
      this.props.deleteSchedule(originSchedule);
      this.props.saveSchedule(originSchedule.title, startTime, endTime);
      this.props.closeAlert();
    } else {
      console.log(false);
      this.props.setALertErrorMessage(errorMessage.duplicatedSchedule);
      this.props.openAlert();
    }
  }

  render() {
    const { classes } = this.props;
    const { controlYear, controlMonth, controlDate } = this.props.date;
    const firstDay = (new Date(controlYear, controlMonth - 1, controlDate)).getDay();
    const firstDate = new Date(controlYear, controlMonth - 1, controlDate - firstDay);
    const lastDate = new Date(controlYear, controlMonth - 1, controlDate - firstDay + 6);
    const days = [null, '일', '월', '화', '수', '목', '금', '토']

    return (
      <div className={classes.root}>

        <GridList
          cols={8}
          className={classes.gridListDays}
          cellHeight={79}
        >
          {days.map((day, index) => {
            if (day !== null) {
              const dateMilli = firstDate.getTime() + 1000 * 60 * 60 * 24 * (index - 1);
              const date = new Date(dateMilli);

              return (
                <GridListTile
                  key={index}
                  className={classnames(
                    classes.gridTile,
                  )}
                >
                  <Typography className={classes.headLine}>{day}</Typography>
                  <Typography variant="h4" className={classes.headLine}>{date.getDate()}</Typography>
                </GridListTile>
              )
            } else {
              return (
                <GridListTile
                  key={index}
                  className={classnames(
                    classes.gridTile,
                  )}
                />
              )
            }
          })}
        </GridList>
        <GridList
          cols={8}
          className={classes.gridList}
          cellHeight={48}
        >
          {Array(8*24).fill(1).map((stuff, index) => {
            const weekIndex = index % 8;
            const hours = parseInt(index / 8);
            const dateMilli = firstDate.getTime() + 1000 * 60 * 60 * 24 * (weekIndex - 1) + 1000 * 60 * 60 * hours;
            const date = new Date(dateMilli);

            if (index % 8 !== 0) {
              const targetScheduleList = this.props.schedules.filter(schedule => {
                return date.getTime() >= new Date(schedule.startTime).getTime()  && date.getTime() < new Date(schedule.endTime).getTime();
              });
              const targetSchedule = targetScheduleList.length >= 0 ? targetScheduleList[0] : null;
              const targetTitle = targetSchedule ? targetSchedule.title : null;
              const targetStartTime =  targetSchedule ? new Date(targetSchedule.startTime) : null;
              const targetEndTime = targetSchedule ? new Date(targetSchedule.endTime) : null;

              return (
                <GridListTile
                  key={index}
                  className={classnames(
                    classes.gridTile,
                    index < 8 ? classes.gridTileTop : null,
                    index % 8 === 0 ? classes.gridTileLeft : null,
                    targetSchedule ? classes.gridTarget : null,
                  )}
                  draggable
                  onDragStart={event => this.onDragStart(event, targetSchedule)}
                  onDragOver={this.onDragOver}
                  onDrop={event => this.onDrop(event, date)}
                >
                  {targetSchedule && targetStartTime.getTime() === date.getTime() ? <Typography className={classes.targetText}>{`${targetTitle === '' ? '(제목없음)' : targetTitle}`}</Typography> : null}
                  {targetSchedule && targetStartTime.getTime() === date.getTime() ? <Typography className={classes.targetText}>{`${targetStartTime.getHours()}시~ ${targetEndTime.getHours()}시`}</Typography> : null}
                </GridListTile>
              )
            } else {
              const hours = parseInt(index / 8);
              const divider = hours < 12 ? "오전" : "오후";
              const dividedHours = hours === 0 || hours === 12 ? 12 : hours % 12;

              return (
                <GridListTile key={index} className={classes.gridTile}>
                  <Typography className={classnames(classes.divider)}>{`${divider} ${dividedHours}시`}</Typography>
                </GridListTile>
              )
            }
          })}
        </GridList>
      </div>
    )
  }
}

CalendarWeek.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    date: state.date,
    schedules: state.schedule.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openDialog,
    openAlert,
    closeAlert,
    setALertErrorMessage,
    deleteSchedule,
    saveSchedule,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalendarWeek))
