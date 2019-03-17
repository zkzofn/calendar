import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import Card from '@material-ui/core/Card';
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
    console.log(schedule);
    this.props.openDialog(schedule.startTime, schedule.endTime, schedule.title)
  }

  render() {
    const { classes, year, month, date } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    const todaySchedules = this.props.schedules.filter(schedule => {
      return new Date(schedule.startTime) >= new Date(year, month - 1, date) && new Date(schedule.startTime) < new Date(year, month - 1, date + 1)
    }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    return (
      <Card className={classes.card}>
        {this.props.days ? <Typography className={classes.cardDate}>{this.props.days}</Typography> : null}
        <Typography className={classes.cardDate}>{this.props.dateStr}</Typography>
        {todaySchedules.map((schedule, index) =>
          <Typography key={index} className={classes.miniCard} onClick={this.editSchedule(schedule)}>
            {bull}
            <span className={classes.scheduleText}>{convertTime(new Date(schedule.startTime).getHours())} {schedule.title === "" ? "(제목 없음)" : schedule.title}</span>
          </Typography>
        )}
      </Card>
    )
  }
}

MonthCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    schedules: state.schedule.data
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
