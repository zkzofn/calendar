import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles/index";
import { openAlert, closeAlert, setALertErrorMessage } from '../../actions/RequestManager';



class Alert extends Component {
  handleClose = () => {
    this.props.closeAlert();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.alert.open}
          onClose={this.handleClose}
        >
          <DialogTitle>{"Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.alert.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    alert: state.alert
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openAlert,
    closeAlert,
    setALertErrorMessage,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Alert));
