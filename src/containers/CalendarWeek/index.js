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
  render() {
    const { classes } = this.props;

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
              return (
                <GridListTile
                  key={index}
                  className={classnames(
                    classes.gridTile,
                  )}
                >
                  <Typography className={classes.headLine}>{day}</Typography>
                  <Typography variant="h4" className={classes.headLine}>{index}</Typography>
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
            if (index % 8 !== 0) {
              return (
                <GridListTile
                  key={index}
                  className={classnames(
                    classes.gridTile,
                    index < 8 ? classes.gridTileTop : null,
                    index % 8 === 0 ? classes.gridTileLeft : null,
                  )}
                >
                  <Typography>{''}</Typography>
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
