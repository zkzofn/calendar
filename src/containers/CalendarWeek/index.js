import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
// import { } from '../actions/RequestManager';



class Template extends Component {
  render() {
    return (
      <div>
        Template
      </div>
    )
  }
}

Template.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    // cohort: state.cohorts.single.article
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
)(withStyles(styles)(Template));
