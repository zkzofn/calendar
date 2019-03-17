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
import CustomDialog from '../../components/CustomDialog';
import MonthCard from '../../components/MonthCard'
import { openDialog } from '../../actions/RequestManager'

class CalendarMonth extends Component {
  handleTile(startYear, startMonth, startDate, that, timeDiff = 1) {
    // 현재 시간 기준으로 1시간(timeDiff) 짜리 일정을 셋팅해서 dialog 를 띄운다.
    const now = new Date();
    const startTime = new Date(startYear, startMonth - 1, now.getHours() === 23 ? startDate - 1 : startDate, now.getHours() + 1);
    const endTime = new Date(startYear, startMonth - 1, now.getHours() === 23 ? startDate - 1 : startDate, now.getHours() + 1 + timeDiff);

    this.props.openDialog(startTime, endTime, null);
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
        <GridList cellHeight={100} className={classes.gridList} cols={7}>
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
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalendarMonth));
