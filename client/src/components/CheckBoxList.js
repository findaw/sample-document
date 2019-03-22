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
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let jsonString = "{"
    let keys = Object.keys(this.props.items);
    for(let i = 0; i < keys.length; i++){
      jsonString += `"${keys[i]}" : ${JSON.stringify(this.props.items[keys[i]])}`;
      if(i !== keys.length -1)
        jsonString += ",";
    }
  
    jsonString += "}";
    this.setState(JSON.parse(jsonString));
  }
  handleChange = (key,key2)=> (event,value) => {
    this.setState({ 
      [key] : {
        ...this.state[key],
        [key2] : value
      }
    }, ()=>{
      console.log(value);
      console.log(this.state[key]);
    });
    
  };
  render(){
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
              {
                this.state ? 
                Object.keys(this.state).map(type=>{
                  return (
                      <FormControl component="fieldset" key={type}>
                      <FormLabel>{type}</FormLabel>
                      <FormGroup row>
                        {
                          Object.keys(this.state[type]).map((name,index)=>{
                            return (
                              <FormControlLabel key={type + index} control={<Checkbox onChange={this.handleChange(type,name)} checked={this.state[type][name]} />} label={name} />
                            );
                          })
                        }
                      </FormGroup>
                    </FormControl>
                  );
                })
                : "load.."
              }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
  
export default withStyles(styles)(CheckBoxList);