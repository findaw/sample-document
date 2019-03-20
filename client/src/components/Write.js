import React from'react';
import CheckBoxList from'./CheckBoxList';
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme=>({
    container:{
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 22,
        marginTop : 22,
    },
    contentField: {
        marginTop : 30,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        marginTop : 25,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    tagField:{
        marginTop:20,
    },
    tagPaper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    tag: {
        margin: theme.spacing.unit / 2,
    },
});
class Write extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topic : ["주제1", "주제2", "주제3", "주제4"],
            check : [false,false,false,false],
            need : [true,false,false,false],
            content : ["","","",""],
            tagData: ['Angular','jQuery','Polymer','React','Vue.js'],
            addTag:"",
            addTopic:"",
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

        if((event.target.value.trim() !== "" && !this.state.check[index])
        || (event.target.value.trim() === "" && this.state.check[index])){
            this.handleCheckbox(index);
        }
    }
    handleTopicAddButton = () =>{
        if(this.state.addTopic.trim() === "") return;
        this.setState(({topic,check,need,content})=>({
            topic : [...topic,this.state.addTopic.trim()],
            check : [...check,false],
            need : [...need,false],
            content : [...content,""],
            addTopic : "",
        }));
    }
    handleTopicFieldChange = event => {
        this.setState({
             addTopic : event.target.value,
        });   
    }
    handleTagAddButton = () =>{
        if(this.state.addTag.trim() === "") return;
        this.setState({
            tagData : [...this.state.tagData,this.state.addTag.trim()],
            addTag : "",
        });
    }
    handleTagFieldChange = ({target}) => {
        this.setState({
             addTag : target.value,
        });
    }
    handleTagDelete = data => () => {
        if (data === 'React') {
          alert('Why would you want to delete React?! :)'); 
          return;
        }
        const chipData = [...this.state.tagData];
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);

        this.setState({tagData : chipData});
    };
    handleSaveButton = () => {
        let flag = 0;
        let text = "";
        this.state.need.forEach((data,index) => {
            if(data && !this.state.check[index]){
                text +="/" + this.state.topic[index];
                flag++;
                return;
            }
        });
        if(flag === 0){
            alert("저장되었습니다.");
        }else{
            alert(`필수 항목을 모두 입력해주세요.(${text})`);
        }
    }
    render(){
        const { classes } = this.props;
        const {topic, need, check,content, tagData, addTag, addTopic} = this.state;
        const contentBox  =
            topic.map((value, index)=>{
                return (
                    <ExpansionPanel key={index}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                <Checkbox indeterminate={check[index]} checked={check[index]}/>
                                {need[index] ? ( <Badge color="secondary" variant="dot">{value}&nbsp;&nbsp;</Badge>) : value}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <InputBase 
                                label="content"
                                multiline
                                rows="15"
                                fullWidth
                                value={content[index]}
                                onChange={this.handleContentChange(index)}
                                placeholder="내용 입력"
                                className={classes.textField}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            });
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
                <div className={classes.tagField}>
                    <Paper className={classes.tagPaper}>
                        {tagData.map((data,index) => {
                        let icon = null;

                        if (data === 'React') {
                            icon = <TagFacesIcon />;
                        }

                        return (
                            <Chip
                            key={index}
                            icon={icon}
                            label={data}
                            onDelete={this.handleTagDelete(data)}
                            className={classes.tag}
                            />
                        );
                        })}
                    </Paper>
                    <TextField
                        id="standard-with-placeholder"
                        label="태그명"
                        placeholder="관련 태그 입력"
                        className={classes.textField}
                        value={addTag}
                        onChange={this.handleTagFieldChange}
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <Button onClick={this.handleTagAddButton} variant="contained" color="primary" className={classes.button}>
                        태그추가<AddCircleOutlineIcon className={classes.rightIcon} />
                    </Button><br/>
                </div>
                <div className={classes.contentField}>
                   {
                       contentBox
                   }
                </div>
                <div>
                    <TextField
                        id="standard-with-placeholder"
                        label="주제명"
                        placeholder="추가할 항목 이름 입력"
                        className={classes.textField}
                        value={addTopic}
                        onChange={this.handleTopicFieldChange}
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <Button onClick={this.handleTopicAddButton} variant="contained" color="primary" className={classes.button}>
                        항목추가<AddCircleOutlineIcon className={classes.rightIcon} />
                    </Button><br/>
                </div>
                <CheckBoxList/>
                <Button onClick={this.handleSaveButton}variant="contained" color="primary" className={classes.button}>저장</Button>
            </div>
        );
    }
}

export default withStyles(styles)(Write);
