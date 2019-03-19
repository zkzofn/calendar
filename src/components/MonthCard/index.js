import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import classnames from 'classnames'
import { withStyles } from "@material-ui/core/styles/index";
import { Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { convertTime, openDialog } from '../../actions/RequestManager';

/**
 * props: {
 *   days
 *   dateStr
 * }
 */
class MonthCard extends Component {
  editSchedule = schedule => event => {
    event.stopPropagation();
    this.props.openDialog(schedule.startTime, schedule.endTime, schedule.title)
  }

  onDragStart = (event, schedule, id) => {
    event.dataTransfer.setData('schedule', JSON.stringify(schedule));
    document.getElementById(id).style.opacity = '0.5';
  }

  onDragEnd = (event, id) => {
    document.getElementById(id).style.opacity = '1';
  }

  render() {
    const { classes, year, month, date } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    const todaySchedules = this.props.schedules.filter(schedule => {
      return new Date(schedule.startTime) >= new Date(year, month - 1, date) && new Date(schedule.startTime) < new Date(year, month - 1, date + 1)
    }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    const cardId = `${year}_${month}_${date}_card`;
    const now = new Date();

    return (
      <Card className={classes.card}>
        {this.props.days ? <Typography className={classes.cardDate}>{this.props.days}</Typography> : null}
        <Typography
          id={cardId}
          className={classnames(
            classes.cardDate,
            year === now.getFullYear() && month === now.getMonth() + 1 && date === now.getDate() ? classes.cardDateToday : null
          )}
        >
          {this.props.dateStr}
        </Typography>
        {todaySchedules.map((schedule, index) => {
          const id = `${year}_${month}_${date}_schedule_${index}`;
          return (
            <Typography
              id={id}
              key={index}
              className={classes.miniCard}
              onClick={this.editSchedule(schedule)}
              draggable
              onDragStart={event => this.onDragStart(event, schedule, id, cardId)}
              onDragEnd={event => this.onDragEnd(event, id)}
            >
              {bull}
              <span className={classes.scheduleText}>{convertTime(new Date(schedule.startTime).getHours())} {schedule.title === "" ? "(제목 없음)" : schedule.title}</span>
            </Typography>
          )
        })}
      </Card>
    )
  }
}

MonthCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    schedules: state.schedule.data,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openDialog
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MonthCard));
