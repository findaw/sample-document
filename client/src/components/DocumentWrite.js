import React from 'react';
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import CheckBoxList from './CheckBoxList';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

const styles = theme =>({
    container:{
        margin : 10,
    },
    titleField: {
        marginTop : 30,
        marginLeft: theme.spacing.unit*2,
        marginRight: theme.spacing.unit*2,
        width:1200,
    },
    titleComponenet:{
        display:'flex',
        justifyContent :'center',
    },
    selectComponent:{
        display:'flex',
        justifyContent :'center',
        margin:20,
    },
    selectControl: {
        margin : theme.spacing.unit*2,
        width:1200,
    },
    subjectComponent :{
        display:'flex',
        justifyContent:'center'
    },
    subjectWrapper :{
        width:1200,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    subjectField:{
        width:'100%',
    },
    contentField:{
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    checkBoxComponent:{
        display:'flex',
        justifyContent : 'center',
        margin : theme.spacing.unit,
        marginTop : 30,
        alignText : 'center',
    },
    tagComponent:{
        display:'flex',
        justifyContent:'center',
    },
    tagWrapper:{
        width:1200,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    tagPaper:{
        width:'100%',
        
    },
    tagAddButton:{
        height:58,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

class DocumentWrite extends React.Component{
    state={
        category :{
            "문서분류":{
                "미해결" : false,  
                "해결" : false,
                "인물(범인)" : false,
            },
            "지역" :{
                "경기도" : false,  
                "서울" : false,
                "울산" : false,
                "수원" : false,
                "강원도" : false,
                "충청남도" : false,
                "부산" : false,
                "대구" : false,
            },
            "사건분류":{
                "살인" : false,
                "방화" : false,
                "강도" : false,
                "강간" : false,
            },
        },
        subjects:[  'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',,],
        selectSubjects : ['Oliver Hansen','Ralph Hubbard',],
        expanded: 'panel1',
        content:['','','','','',],
        tagDatas:[],
        tagAddData:"",
    }
    handleSelectChange = event => {
        this.setState({ selectSubjects: event.target.value });
    };
    handleSubjectBoxChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
    };
    handleContentBlur = index=> event=>{
        const content = event.target.value ? event.target.value : "";
        this.setState({
            content : this.state.content.map((data, i)=>{
                if(index === i)
                    return content;
                else
                    return data;
            })
        },()=>{
          //  console.log(this.state.content[index]);
           // console.log(event.target ? event.target.value:false);
        })
    }
    handleSaveButtonClick = event=>{
        alert(this.state.content);
    }
    handleCheckBoxChange = (key,key2)=> (event,value) => {
        const {category, tagDatas} = this.state;
        if(value){
            let tmp = [...tagDatas,key2];
            this.setState({tagDatas : tmp});
        }else{
            let tmp = [...tagDatas];
            let idx = tmp.indexOf(key2);
            if(idx > -1) {
                tmp.splice(idx,1);
                this.setState({tagDatas : tmp});
            }
        }
        this.setState({ 
            category : {
                ...category,
                [key] : {
                    ...category[key],
                    [key2] : value
                }
            }
        }, ()=>{
          //  console.log(value);
          //  console.log(trueTagDatas);
         //   console.log(tagDatas[key]);
      }); 
    }
    handleTagAddButtonClick = event=>{
        if(this.state.tagAddData.trim() !== ""){
            let tmp = [...this.state.tagDatas,this.state.tagAddData];
            this.setState({tagDatas : tmp, tagAddData : ""});
        }
    }
    handleTagAddFieldBlur = event=>{
        this.setState({tagAddData : event.target.value});
    }
    render(){
        const {classes} = this.props;
        const {subjects, selectSubjects,expanded, content, category, tagDatas } = this.state;
        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
        };
          
        return(
            <div className={classes.container}>
                <div className={classes.titleComponenet}>
                    <TextField
                        id="outlined-with-placeholder"
                        label="문서 제목"
                        placeholder="문서의 제목을 입력하세요."
                        className={classes.titleField}
                        margin="normal"
                        variant="outlined"
                        />
                </div>
                <div className={classes.selectComponent}>
                    <FormControl className={classes.selectControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">목차</InputLabel>
                        <Select
                        multiple
                        value={selectSubjects}
                        onChange={this.handleSelectChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                        >
                        {subjects.map(name => (
                            <MenuItem key={name}  value={name}>
                            <Checkbox checked={selectSubjects.indexOf(name) > -1} />
                            <ListItemText  primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                  </div>
                  <div  className={classes.subjectComponent}>
                    <div className={classes.subjectWrapper}>
                    {selectSubjects.map((data,index)=>{
                        return (
                            <ExpansionPanel
                                className={classes.subjectField}
                                key={data} square
                                expanded={expanded === `panel${index}`}
                                onChange={this.handleSubjectBoxChange(`panel${index}`)}
                                >
                                <ExpansionPanelSummary>
                                    <Typography>{data}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                        <InputBase 
                                            label="content"
                                            multiline
                                            rows="15"
                                            fullWidth
                                            defaultValue={content[index]}
                                            onBlur={this.handleContentBlur(index)}
                                            placeholder="내용 입력"
                                            className={classes.contentField}
                                        />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    }).sort((a,b)=>{
                        if(a.key>b.key)
                            return 1;
                        else
                            return -1;
                    })}
                </div>
                </div>
                <div className={classes.checkBoxComponent}>
                    <CheckBoxList datas={category} onChange={this.handleCheckBoxChange}/>
                </div>
                <div className={classes.tagComponent}>
                    <div className={classes.tagWrapper}>
                        <Paper className={classes.tagPaper}>
                        
                        <p style={{padding:20}}>태그내역</p>
                        {tagDatas.map((data, index)=>{
                            return(
                                <Chip
                                key={index}
                                label={data}
                                className={classes.chip}
                                component="a"
                                href="#chip"
                                clickable
                                variant="outlined"
                                color="primary"
                                />
                            )
                        }) }
                        </Paper>
                    <p>
                        <TextField
                            value={this.state.tagAddData} 
                            onChange={this.handleTagAddFieldBlur}
                            label="추가할 태그"
                            placeholder="특징적인 것 입력"
                            variant="outlined"
                        />
                        <Button  onClick={this.handleTagAddButtonClick} className={classes.tagAddButton} variant="contained" color="primary" variant="outlined">추가</Button>
                        <br/><br/>
                        <Button  onClick={this.handleSaveButtonClick} variant="contained" color="primary">저장</Button>
                    </p>
                   </div>
                </div>
            </div>
        )
    }

}

export default withStyles(styles)(DocumentWrite);