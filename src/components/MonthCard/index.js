import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { convertTime } from '../../actions/RequestManager';

/**
 * props: {
 *   days
 *   dateStr
 * }
 */
class MonthCard extends Component {
  onClickCard(event) {
    event.stopPropagation();
    console.log("card")
  }

  render() {
    const { classes, year, month, date } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    const todaySchedules = this.props.schedules.filter(schedule => {
      return new Date(schedule.startTime) >= new Date(year, month - 1, date) && new Date(schedule.endTime) < new Date(year, month - 1, date + 1)
    }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    return (
      <Card className={classes.card} onClick={this.onClickCard}>
        {this.props.days ? <Typography>{this.props.days}</Typography> : null}
        <Typography>{this.props.dateStr}</Typography>
        {todaySchedules.map((schedule, index) =>
          <Typography key={index} className={classes.miniCard}>
            {bull}
            <span className={classes.scheduleText}>{convertTime(new Date(schedule.startTime).getHours())} {schedule.title}</span>
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

  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MonthCard));
