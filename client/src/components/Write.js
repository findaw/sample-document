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
            subjectList : [],
            defaultCategory : "",
        };
    }
    callApiSubject = async () =>{
        const rspSbj = await fetch("/api/document_subject");
        const subject = await rspSbj.json();
        return subject;
    }
    callApiCategory = async () =>{
        const rspCate = await fetch("/api/document_category");
        const category = await rspCate.json();
        return category;
    }
    componentDidMount(){
        this.callApiSubject()
            .then(res=>{
                let regx = /사건/;
                return res.map( ({ subject }) => {
                    const isNeed = regx.test(subject);
                    return {title : subject, check : false, isNeed : isNeed, content : ""};
                });
            })
            .then(res=>this.setState({subjectList : res}))
            .catch(err=>console.log(err));
        
        this.callApiCategory()
            .then(res=>{
                let prevType = "";
                let items = {};
                res.forEach( ({ category, categorytype })=> { 
                    if(prevType !== categorytype)
                        items[categorytype] = {};
                    items[categorytype][category] = false;
                    prevType = categorytype;
                })
                this.setState( { defaultCategory : items } )
            })
            .catch(err=>console.log(err));
        
    }
    handleContentChange = index => event => {
        this.setState({
            subjectList : this.state.subjectList.map((v,i) => 
              i === index ? {title : v.title, check : v.check, isNeed : v.isNeed, content : event.target.value} : v  
            )
        });
        if((event.target.value.trim() !== "" && !this.state.subjectList[index].check)
            || (event.target.value.trim() === "" && this.state.subjectList[index].check)){
                this.setState({
                    subjectList : this.state.subjectList.map((v,i) => 
                        i === index ? {title : v.title, check : !v.check, isNeed : v.isNeed, content : event.target.value} : v 
                    )
                });
        }

    }
    handleSaveButton = () => {
        let flag = 0;
        let text = "";
        this.state.subjectList.forEach(obj => {
            if(obj.isNeed && !obj.check){
                text +="/" + obj.title;
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
        const {subjectList, defaultCategory} = this.state;  
        const contentBox  =
            subjectList.map(({title, check, isNeed, content}, index)=>{
                return (
                    <ExpansionPanel key={index}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>
                                <Checkbox indeterminate={check} checked={check}/>
                                {isNeed ? ( <Badge color="secondary" variant="dot">{title}&nbsp;&nbsp;</Badge>) : title}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <InputBase 
                                label="content"
                                multiline
                                rows="15"
                                fullWidth
                                value={content}
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
                <div className={classes.contentField}>
                   {
                       contentBox
                   }
                </div>
                <div className={classes.tagField}>
                { defaultCategory ? <CheckBoxList items={defaultCategory} /> : "load..." }
                </div>
                <Button onClick={this.handleSaveButton}variant="contained" color="primary" className={classes.button}>저장</Button>
            </div>
        );
    }
}

export default withStyles(styles)(Write);
