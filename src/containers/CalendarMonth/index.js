import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import { GridList, GridListTile, Card, Typography } from '@material-ui/core';
// import { } from '../actions/RequestManager';



class CalendarMonth extends Component {
  render() {
    const { classes } = this.props;
    const { controlYear, controlMonth } = this.props.date;
    const startDay = (new Date(controlYear, controlMonth - 1, 1)).getDay();
    const startDate = new Date(controlYear, controlMonth - 1, 1 - startDay);
    const lastDay = 6 - (new Date(controlYear, controlMonth, 0).getDay());
    const lastDate = new Date(controlYear, controlMonth, lastDay);
    const dateCount = (lastDate - startDate)/1000/60/60/24 + 1;
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return (
      <div className={classes.root}>
        <GridList cellHeight={100} className={classes.gridList} cols={7}>
          {Array(dateCount).fill(1).map((stuff, index) => {
            const month = new Date(controlYear, controlMonth - 1, 1 - startDay + index).getMonth() + 1;
            const date = new Date(controlYear, controlMonth - 1, 1 - startDay + index).getDate();

            return (
              <GridListTile
                key={index}
                className={classnames(
                  classes.gridTile,
                  index < 7 ? classes.gridTileTop : null,
                  index % 7 === 0 ? classes.gridTileLeft : null,
                )}
              >
                {index < 7 ? <Typography>{days[index]}</Typography> : null}
                <Typography>{date === 1 ? `${month}월 ${date}일` : date}</Typography>

              </GridListTile>
            )
          })}
        </GridList>
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
    // getCohort,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CalendarMonth));
