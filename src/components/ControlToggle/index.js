import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button';
import { toggleMonthWeek } from '../../actions/RequestManager';

class ControlToggle extends Component {
  toggleMonthWeek() {
    this.props.toggleMonthWeek();
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
          onClick={this.props.toggleMonthWeek.bind(this)}
        >
          월
        </Button>
        <Button
          variant={this.props.toggle.monthWeek ? "text" : "contained"}
          size="small"
          color="primary"
          className=""
          onClick={this.props.toggleMonthWeek.bind(this)}
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
    toggleMonthWeek,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ControlToggle));
