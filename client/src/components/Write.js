import React from'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

const styles = theme=>({
    container:{
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 22,
        marginTop : 22,
    },
    writeBox: {
        marginTop : 30,
    },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    },
    button: {
        marginTop : 25,
    },
});
class Write extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text : ["주제1", "주제2", "주제3", "주제4"],
            check : [false,false,false,false],
            need : [true,false,false,false],
            content : ["","","",""],
        };
    }
    handleCheckbox = index =>{
        this.setState({
            check : this.state.check.map((v,i) => i === index ? !v : v),
        });
    }
    handleContentChange = index => event => {
        this.setState({
            content : this.state.content.map((v,i) => i === index ? event.target.value : v)
        });
        console.log(event.target.value);
        console.log(this.state.content);
        if((event.target.value.trim() != "" && !this.state.check[index])
        || (event.target.value.trim() === "" && this.state.check[index])){
            this.handleCheckbox(index);
        }
        else {
            return;
        }
    }
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.container}>
                
                <TextField
                    id="standard-with-placeholder"
                    label="제목"
                    placeholder="제목 입력"
                    className={classes.textField}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <div className={classes.writeBox}>
                   {
                       this.state.text.map((value, index)=>{
                        return (
                            <ExpansionPanel key={index}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                
                                    <Typography className={classes.heading}>
                                        <Checkbox indeterminate={this.state.check[index]} checked={this.state.check[index]}/>
                                        {this.state.need[index] ? ( <Badge color="secondary" variant="dot">{value}&nbsp;&nbsp;</Badge>) : value}
                                    </Typography>
                                
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails id="value">
                                    <InputBase 
                                        label="content"
                                        multiline
                                        rows="20"
                                        fullWidth
                                        value={this.state.content[index]}
                                        onChange={this.handleContentChange(index)}
                                        placeholder="내용 입력"
                                        className={classes.textField}
                                    />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        );
                       })

                   }
                </div>

                <Button variant="contained" color="primary" className={classes.button}>저장</Button>
            </div>
        );
    }
}

export default withStyles(styles)(Write);
