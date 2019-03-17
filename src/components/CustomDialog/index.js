import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles/index";
import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  TextField,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { WatchLaterOutlined } from '@material-ui/icons'
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import { errorMessage } from '../../actions/constants'
import { styles } from "./styles";
import {
  checkSchedule,
  saveSchedule,
  closeDialog,
  setErrorMessage,
  setDialogStartTime,
  setDialogEndTime,
  setTitle,
  deleteSchedule,
} from '../../actions/RequestManager'



class CustomDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    }

    this.originSchedule = {};
    moment.locale("ko");
  }

  componentWillUpdate(nextProps) {
    if (!this.props.dialog.open && nextProps.dialog.open) {
      this.originSchedule = {
        title: nextProps.dialog.title,
        startTime: nextProps.dialog.startTime,
        endTime: nextProps.dialog.endTime,
      }
    }
  }

  handleTitle = (event) => {
    this.props.setTitle(event.target.value);
  }

  handleTitleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSave();
    }
  }

  handleStartDateChange = date => {
    const startTime = moment(date)._d;
    const endTime = new Date(startTime.setHours(startTime.getHours() + 1));

    this.props.setDialogStartTime(moment(date)._d);
    this.props.setDialogEndTime(endTime);
  }

  handleEndDateChange = date => {
    if (moment(date)._d < this.props.dialog.startTime) {
      this.props.setErrorMessage(errorMessage.endDateCantPrevStartDate);
    } else {
      this.props.setErrorMessage(null);
      this.props.setDialogEndTime(moment(date)._d);
    }
  }

  handleStartTimeChange = (that, selectedTime) => {
    const time = selectedTime.key;

    this.props.setDialogStartTime(new Date(this.props.dialog.startTime.setHours(time)));
    this.props.setDialogEndTime(new Date(new Date(this.props.dialog.startTime).setHours(this.props.dialog.startTime.getHours() + 1)));
  }

  handleEndTimeChange = (that, selectedTime) => {
    const time = selectedTime.key;
    const endTime = new Date(this.props.dialog.endTime.setHours(time));

    if (this.props.dialog.startTime < endTime) {
      this.props.setErrorMessage(null);
      this.props.setDialogEndTime(endTime);
    } else {
      this.props.setErrorMessage(errorMessage.endDateCantPrevStartDate);
      this.props.setDialogEndTime(new Date(new Date(this.props.dialog.startTime).setHours(this.props.dialog.startTime.getHours() + 1)));
    }
  }

  handleSave = () => {
    const { title, startTime, endTime } = this.props.dialog;
    
    if (checkSchedule(startTime, endTime)) {
      // this.originSchedule
      
      this.props.saveSchedule(title === "" || title === null ? "" : title, startTime, endTime);
      this.props.closeDialog();
      this.props.setErrorMessage(null);
    } else {
      this.props.setErrorMessage(errorMessage.duplicatedSchedule);
    }
  }

  deleteSchedule = () => {
    this.props.deleteSchedule(this.originSchedule);
    this.props.closeDialog();
  }


  render() {
    const { classes } = this.props;
    const startTime = new Date(this.props.dialog.startTime);
    const endTime = new Date(this.props.dialog.endTime);

    return (
      <Dialog
        open={this.props.dialog.open}
        onClose={this.props.closeDialog}
      >
        <DialogTitle>
          <Input
            className={classes.defaultMargin}
            placeholder="일정 제목"
            defaultValue={this.props.dialog.title}
            fullWidth
            onChange={this.handleTitle}
            onKeyPress={this.handleTitleKeyPress}
          />
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}  moment={moment}>
            <Grid container spacing={8} alignItems="flex-end">
              <Grid item >
                <WatchLaterOutlined className={classes.icon}/>
              </Grid>
              <Grid item className={classes.schedule} >
                <DatePicker
                  className={classes.scheduleDate}
                  margin="normal"
                  value={startTime}
                  onChange={this.handleStartDateChange}
                  format={'YYYY년 MM월 DD일'}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
                <TextField
                  select
                  className={classes.scheduleTime}
                  value={`${startTime.getHours()}`}
                  onChange={this.handleStartTimeChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                    autoWidth: true,
                    displayEmpty: true,
                    IconComponent: () => null,
                  }}
                  margin="normal"
                  InputProps={{
                    disableUnderline: true,
                  }}
                >
                  {Array(24).fill(0).map((stuff, index) => {
                    const divider = index / 12 >= 1 ? "오후" : "오전";
                    const time = index % 12 === 0 ? 12 : index % 12;
                    return (
                      <MenuItem key={index} value={index}>
                        {`${divider} ${time}:00`}
                      </MenuItem>
                    )
                  })}
                </TextField>
                <span className={classes.bridge}>-</span>
                <TextField
                  select
                  className={classes.scheduleTime}
                  value={`${endTime.getHours()}`}
                  onChange={this.handleEndTimeChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                    IconComponent: () => null,
                  }}
                  margin="normal"
                  InputProps={{
                    disableUnderline: true,
                  }}

                >
                  {Array(24).fill(0).map((stuff, index) => {
                    const divider = index / 12 >= 1 ? "오후" : "오전";
                    const time = index % 12 === 0 ? 12 : index % 12;
                    return (
                      <MenuItem key={index} value={index}>
                        {`${divider} ${time}:00`}
                      </MenuItem>
                    )
                  })}
                </TextField>
                <DatePicker
                  className={classes.scheduleDate}
                  margin="normal"
                  value={endTime}
                  onChange={this.handleEndDateChange}
                  format={'YYYY년 MM월 DD일'}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
          <Typography className={classes.errorMessage}>{this.props.dialog.errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeDialog}>
            취소
          </Button>
          {this.originSchedule.title !== null ? <Button onClick={this.deleteSchedule} color="secondary">삭제</Button> : null}
          <Button
            onClick={this.handleSave}
            color="primary"
            autoFocus
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

CustomDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    dialog: state.dialog,
    schedule: state.schedule.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveSchedule,
    closeDialog,
    setErrorMessage,
    setDialogStartTime,
    setDialogEndTime,
    setTitle,
    deleteSchedule,
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CustomDialog));
