import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    control: {
      padding: theme.spacing.unit * 2,
      width:1100,
    },
  });

function RadioList(props) {

    const { classes } = props;

    return (
        <Paper className={classes.control}>
        <Grid container spacing={24}>
          {
            props.datas ? 
            Object.keys(props.datas).map(type=>{
              return (
                <Grid  key={type} item xs={12}>
                  <FormControl  component="fieldset">
                    <FormLabel>{type}</FormLabel>
                    <FormGroup>
                        <RadioGroup
                            aria-label={type}
                            className={classes.group}
                            value={props.selectValue}
                            onChange={props.onChange}
                            row
                        >
                        {props.datas[type].map((name,index)=>{
                            return (
                                <FormControlLabel key={type + index} control={<Radio />} label={name} value={name}/>
                            );
                        })}
                        </RadioGroup>
                    </FormGroup>
                  </FormControl>
                </Grid>
              );
            })
            : "load.."
          }
        </Grid>
      </Paper>
    )
}

export default withStyles(styles)(RadioList);
