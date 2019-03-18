import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import CalendarMonth from '../CalendarMonth';
import CalendarWeek from '../CalendarWeek';

import Control from '../Control'

class App extends Component {
  render() {
    return (
      <div>
        <Control />
        {this.props.toggle.monthWeek ? <CalendarMonth /> : <CalendarWeek />}
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    toggle: state.toggle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
