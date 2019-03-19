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

class CalendarMonth extends Component {
  handleTile(startYear, startMonth, startDate, that, timeDiff = 1) {
    // 현재 시간 기준으로 1시간(timeDiff) 짜리 일정을 셋팅해서 dialog 를 띄운다.
    const now = new Date();
    const startTime = new Date(startYear, startMonth - 1, now.getHours() === 23 ? startDate - 1 : startDate, now.getHours() + 1);
    const endTime = new Date(startYear, startMonth - 1, now.getHours() === 23 ? startDate - 1 : startDate, now.getHours() + 1 + timeDiff);

    this.props.openDialog(startTime, endTime, null);
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
    const originStartHours = originStartTime.getHours();
    const startTime = new Date(targetYear, targetMonth, targetDate, originStartHours);
    const endTime = new Date(targetYear, targetMonth, targetDate, originStartHours + diffHours);

    if (checkSchedule(startTime, endTime, originSchedule)) {
      this.props.deleteSchedule(originSchedule);
      this.props.saveSchedule(originSchedule.title, startTime, endTime);
      this.props.closeAlert();
    } else {
      this.props.setALertErrorMessage(errorMessage.duplicatedSchedule);
      this.props.openAlert();
    }
  }

  render() {
    const { classes } = this.props;
    const { controlYear, controlMonth } = this.props.date;
    const firstDay = (new Date(controlYear, controlMonth - 1, 1)).getDay();
    const firstDate = new Date(controlYear, controlMonth - 1, 1 - firstDay);
    const lastDay = 6 - (new Date(controlYear, controlMonth, 0).getDay());
    const lastDate = new Date(controlYear, controlMonth, lastDay);
    const dateCount = (lastDate - firstDate)/1000/60/60/24 + 1;
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <div className={classes.root}>
        <GridList
          cellHeight={parseInt((window.innerHeight - 64) / (dateCount / 7) - 4)}
          className={classes.gridList}
          cols={7}
        >
          {Array(dateCount).fill(1).map((stuff, index) => {
            const fullDate = new Date(controlYear, controlMonth - 1, 1 - firstDay + index);
            const year = fullDate.getFullYear();
            const month = fullDate.getMonth() + 1;
            const date = fullDate.getDate();

            return (
              <GridListTile
                key={index}
                className={classnames(
                  classes.gridTile,
                  index < 7 ? classes.gridTileTop : null,
                  index % 7 === 0 ? classes.gridTileLeft : null,
                )}
                onClick={this.handleTile.bind(this, year, month, date)}
                onDragOver={this.onDragOver}
                onDrop={event => this.onDrop(event, fullDate)}
              >
                <MonthCard
                  days={index < 7 ? days[index] : null}
                  dateStr={date === 1 ? `${month}월 ${date}일` : date}
                  year={year}
                  month={month}
                  date={date}
                />
              </GridListTile>
            )
          })}
        </GridList>
        <CustomDialog />
        <Alert />
      </div>
    )
  }
}

CalendarMonth.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    date: state.date,
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
)(withStyles(styles)(CalendarMonth));
