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
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  chipWrapper: {
    marginBottom: theme.spacing.unit * 5,
  },
});
  
class CheckBoxList extends React.Component {
  state = {
    color: {
      va1: true,
      va2: false,
      va3: false,
    },
    icon: {
      va1: false,
      va2: true,
    },
    variant: {
      va1: false,
      va2: true,
      va3: false,
    },
  };

  handleChange = (key,key2)=> (event,value) => {
    // this.setState({ 
    //   [key]:   Object.assign({...this.state[key]}, {[key2] : value})
    // });
    
    this.setState({ 
      [key]: {
        ...this.state[key],
        [key2] : value
      }
    }, ()=>{
      console.log(value);
      console.log(this.state[key]);
    });
    
  };

  render() {
    const { classes } = this.props;
    const { color, icon, variant } = this.state;

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel>color</FormLabel>
                  <FormGroup row>
                    {Object.keys(color).map(key=>{
                      return (
                        <FormControlLabel key={key} control={<Checkbox onChange={this.handleChange('color',key)} checked={color[key]} />} label={key} />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel>icon</FormLabel>
                  <FormGroup row>
                  {Object.keys(icon).map(key=>{
                      return (
                        <FormControlLabel key={key} control={<Checkbox onChange={this.handleChange('icon',key)} checked={icon[key]} />} label={key} />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel>variant</FormLabel>
                  <FormGroup row>
                  {Object.keys(variant).map(key=>{
                      return (
                        <FormControlLabel key={key} control={<Checkbox onChange={this.handleChange('variant',key)} checked={variant[key]} />} label={key} />
                      );
                    })}
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
  
export default withStyles(styles)(CheckBoxList);