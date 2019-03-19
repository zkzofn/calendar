import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import {
  getNow,
  setPrevControlMonth,
  setNextControlMonth,
  setPrevControlWeek,
  setNextControlWeek,
} from '../../actions/RequestManager';



class ControlDate extends Component {
  setPrevControlMonth() {
    if (this.props.toggle) {
      this.props.setPrevControlMonth();
    } else {
      this.props.setPrevControlWeek();
    }


  }

  setNextControlMonth() {
    if (this.props.toggle) {
      this.props.setNextControlMonth();
    } else {
      this.props.setNextControlWeek();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <IconButton className={classes.button} aria-label="Delete" onClick={this.setPrevControlMonth.bind(this)}>
          <ChevronLeft />
        </IconButton>
        {`${this.props.date.controlYear} ${this.props.date.controlMonth}`}
        <IconButton className={classes.button} aria-label="Delete" onClick={this.setNextControlMonth.bind(this)}>
          <ChevronRight />
        </IconButton>
      </div>
    )
  }
}

ControlDate.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    date: state.date,
    toggle: state.toggle.monthWeek,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNow,
    setPrevControlMonth,
    setNextControlMonth,
    setPrevControlWeek,
    setNextControlWeek,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ControlDate));
