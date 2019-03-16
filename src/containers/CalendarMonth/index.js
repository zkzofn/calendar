import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import {
  Grid,
  GridList,
  GridListTile,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  TextField,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { WatchLaterOutlined } from '@material-ui/icons'
import MonthCard from '../../components/MonthCard'
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from "@date-io/moment";
import moment from 'moment';
// import "moment/locale/ko";
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { errorMessage } from '../../actions/constants';

// import { } from '../actions/RequestManager';



class CalendarMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      scheduleTitle: "",
      startTime: new Date(),
      endTime: new Date(),
      endDateError: false,
      endDateErrorMessage: ""
    }

    moment.locale("ko");
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  onClickTile(startYear, startMonth, startDate, that, timeDiff = 1) {
    // 현재 시간 기준으로 1시간 짜리 일정을 셋팅해서 dialog 를 띄운.
    const now = new Date();
    const startTime = new Date(startYear, startMonth - 1, startDate, now.getHours() + 1);
    const endTime = new Date(startYear, startMonth - 1, startDate, now.getHours() + 1 + timeDiff);
    // const
    // 기존에 저장되어있던 일정이 있으면 겹치는지 확인해야한다.
    this.setState({
      dialogOpen: true,
      startTime,
      endTime,
    })
  }

  handleScheduleTitle(event) {
    this.setState({ scheduleTitle: event.target.value });
  }

  handleStartDateChange = date => {
    const startTime = moment(date)._d;
    const endTime = new Date(startTime.setHours(startTime.getHours() + 1));

    this.setState({
      startTime: moment(date)._d,
      endTime,
    });
  }

  handleEndDateChange = date => {
    if (moment(date)._d < this.state.startTime) {
      this.setState({
        endDateError: true,
        endDateErrorMessage: errorMessage.endDateCantPrevStartDate
      });
    } else {
      this.setState({
        endTime: moment(date)._d,
        endDateError: false,
        endDateErrorMessage: "",
      });
    }
  }

  handleStartTimeChange = (that, selectedTime) => {
    const time = selectedTime.key;

    this.setState(prevState => {
      const startTime = new Date(prevState.startTime.setHours(time));
      const endTime = new Date(new Date(prevState.startTime).setHours(startTime.getHours() + 1));

      console.log(startTime);
      console.log(endTime);

      return {
        startTime,
        endTime,
      }
    });
  }


  render() {
    const { classes } = this.props;
    const { controlYear, controlMonth } = this.props.date;
    const firstDay = (new Date(controlYear, controlMonth - 1, 1)).getDay();
    const firstDate = new Date(controlYear, controlMonth - 1, 1 - firstDay);
    const lastDay = 6 - (new Date(controlYear, controlMonth, 0).getDay());
    const lastDate = new Date(controlYear, controlMonth, lastDay);
    const dateCount = (lastDate - firstDate)/1000/60/60/24 + 1;
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const startTime = new Date(this.state.startTime);
    const endTime = new Date(this.state.endTime);

    return (
      <div className={classes.root}>
        <GridList cellHeight={100} className={classes.gridList} cols={7}>
          {Array(dateCount).fill(1).map((stuff, index) => {
            const fullDate = new Date(controlYear, controlMonth - 1, 1 - firstDay + index);
            const year = fullDate.getFullYear();
            const month = fullDate.getMonth() + 1;
            const date = fullDate.getDate();

            return (
              <GridListTile
                key={index}
                className={classnames(
                  classes.gridTile,
                  index < 7 ? classes.gridTileTop : null,
                  index % 7 === 0 ? classes.gridTileLeft : null,
                )}
                onClick={this.onClickTile.bind(this, year, month, date)}
              >
                <MonthCard
                  days={index < 7 ? days[index] : null}
                  date={date === 1 ? `${month}월 ${date}일` : date}
                />

              </GridListTile>
            )
          })}
        </GridList>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose.bind(this)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Input
              className={classes.defaultMargin}
              placeholder="일정 제목"
              fullWidth
              onChange={this.handleScheduleTitle.bind(this)}
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
                    error={this.state.endDateError}
                    onChange={this.handleEndDateChange}
                    format={'YYYY년 MM월 DD일'}
                    InputProps={{
                      disableUnderline: !this.state.endDateError,
                    }}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
            <Typography className={classes.errorMessage}>{this.state.endDateErrorMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose.bind(this)} color="primary">
              취소
            </Button>
            <Button onClick={this.handleDialogClose.bind(this)} color="primary" autoFocus>
              저장
            </Button>
          </DialogActions>

        </Dialog>


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
