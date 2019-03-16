import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from 'prop-types';
import { styles } from "./styles";
import { withStyles } from "@material-ui/core/styles/index";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import { } from '../actions/RequestManager';

/**
 * props: {
 *   days
 *   date
 * }
 */
class MonthCard extends Component {
  onClickCard(event) {
    event.stopPropagation();
    console.log("card")
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    // console.log(this.props.days)
    // console.log(this.props.date)

    return (
      <Card className={classes.card} onClick={this.onClickCard}>
        {this.props.days ? <Typography>{this.props.days}</Typography> : null}
        <Typography>{this.props.date}</Typography>

      </Card>
    )
  }
}

MonthCard.propTypes = {
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
)(withStyles(styles)(MonthCard));
