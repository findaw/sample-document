import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  control: {
    padding: theme.spacing.unit * 2,
  },
});
  
function CheckBoxList (props){
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
                        <FormGroup row>
                          {
                            Object.keys(props.datas[type]).map((name,index)=>{
                              return (
                                <FormControlLabel key={type + index} control={<Checkbox onChange={props.onChange(type,name)} checked={props.datas[type][name]} />} label={name} />
                              );
                            })
                          }
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  );
                })
                : "load.."
              }
            </Grid>
          </Paper>
    );
}
  
export default withStyles(styles)(CheckBoxList);