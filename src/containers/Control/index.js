import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import ControlDate from '../../components/ControlDate';
import ControlToggle from '../../components/ControlToggle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import { } from '../actions/RequestManager';


class Control extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit">
              Calendar
            </Typography>
            <ControlDate />
            <ControlToggle />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Control.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Control));
