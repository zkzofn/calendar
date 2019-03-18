import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import { selectMonthWeek } from '../../actions/RequestManager';

class ControlToggle extends Component {
  handleMonthWeek(selectMonth) {
    this.props.selectMonthWeek(selectMonth);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button
          variant={this.props.toggle.monthWeek ? "contained" : "text"}
          size="small"
          color="primary"
          className=""
          onClick={this.handleMonthWeek.bind(this, true)}
        >
          월
        </Button>
        <Button
          variant={this.props.toggle.monthWeek ? "text" : "contained"}
          size="small"
          color="primary"
          className=""
          onClick={this.handleMonthWeek.bind(this, false)}
        >
          주
        </Button>
      </div>
    )
  }
}

ControlToggle.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    toggle: state.toggle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectMonthWeek,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ControlToggle));
