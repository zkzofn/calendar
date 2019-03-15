import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { getNow, setPrevControlMonth, setNextControlMonth } from '../../actions/RequestManager';



class Template extends Component {
  setPrevControlMonth() {
    this.props.setPrevControlMonth();
  }

  setNextControlMonth() {
    this.props.setNextControlMonth();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton className={classes.button} aria-label="Delete" onClick={() => this.setPrevControlMonth()}>
          <ChevronLeft />
        </IconButton>
        {`${this.props.date.controlYear} ${this.props.date.controlMonth}`}
        <IconButton className={classes.button} aria-label="Delete" onClick={() => this.setNextControlMonth()}>
          <ChevronRight />
        </IconButton>
      </div>
    )
  }
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    date: state.date
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNow,
    setPrevControlMonth,
    setNextControlMonth
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Template));