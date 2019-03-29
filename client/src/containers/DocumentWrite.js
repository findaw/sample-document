import React from 'react';
import CheckBoxList from '../components/CheckBoxList';
import RadioList from '../components/RadioList';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
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
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

class DocumentWrite extends React.Component{
    state={
        title:"",
        doctype:{},
        doctypeId:{},
        doctypeValue:"",
        category :{},
        subjects:{},
        content:{},
        addDefaultTags:[],
        addTags:[],
        tagAddData:"",
        expanded: 'panel1',
    }
    callApi= async(url) =>{
        const resp = await fetch(url);
        const jsonData = await resp.json();
        return jsonData;
    }
    componentDidMount(){
        this.callApi("/api/default-subject-category")
            .then(({subjarr, catearr})=>{
                let subjects = {}, category = {}, doctypeId = {};
                let documenttype = {"문서분류": []}, doctypeValue = "";

                subjarr.forEach(({doctype_id, doctype, name, isNeed})=>{
                    if(!subjects[doctype])  subjects[doctype] = {};
                    subjects[doctype][name] = isNeed.data[0] === 1 ? true : false;
                    if(documenttype["문서분류"].indexOf(doctype) < 0){
                        documenttype["문서분류"].push(doctype);
                        doctypeId[doctype] = doctype_id;
                    }
                    if(doctypeValue === "")
                        doctypeValue = doctype;
                });
                catearr.forEach(({typename, name})=>{
                if(!category[typename])  category[typename] = {};
                   category[typename][name] = false;
                })

                this.setState({subjects, category, doctypeId, doctype : documenttype, doctypeValue });
            })
            .catch(err=>console.log(err));
    }
    handleTitleChange = event=>{
        this.setState({title : event.target.value});
    }
    handleRadioChange = target => event=>{
        const check = window.confirm("내용이 초기화됩니다. 문서타입을 변경하시겠습니까?");
        if(!check) return;
        this.setState({
            [target] : event.target.value, 
            content : {}
        },()=>{
            let textareas = document.getElementsByTagName("textarea");
            for(let item of textareas){
                item.value = "";
            }
        });
    }
    handleSelectChange = (event) => {
        const {content, doctypeValue, subjects} = this.state;
        this.setState({ subjects : {...subjects,
            [doctypeValue] : {
                ...subjects[doctypeValue],
                [event.target.value] : !subjects[doctypeValue][event.target.value]
            }, 
        }},()=>{    
            if(!subjects[doctypeValue][event.target.value]);
                this.setState({ content: {...content, [event.target.value] : ""} });
        });
    }
    handleSubjectBoxChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
    };
    handleContentBlur = title=> event=>{
        const content = event.target.value ? event.target.value : "";
        this.setState({
            content : {...this.state.content, [title] : content}
        },()=>{
            console.log(this.state.content);
        })
    }
    handleCheckBoxChange = target=> (key,key2)=> (event,value) => {
        const {addDefaultTags} = this.state;
        if(value){
            let tmp = [...addDefaultTags,key2];
            this.setState({addDefaultTags : tmp});
        }else{
            let tmp = [...addDefaultTags];
            let idx = tmp.indexOf(key2);
            if(idx > -1) {
                tmp.splice(idx,1);
                this.setState({addDefaultTags : tmp});
            }
        }
        this.setState({ 
            [target] : {
                ...this.state[target],
                [key] : {
                    ...this.state[target][key],
                    [key2] : value
                }
            }
        }); 
    }
    handleTagAddButtonClick = event=>{
        if(this.state.tagAddData.trim() !== ""){
            let tmp = [...this.state.addTags,this.state.tagAddData];
            this.setState({addTags : tmp, tagAddData : ""});
        }
    }
    handleTagAddFieldBlur = event=>{
        this.setState({tagAddData : event.target.value});
    }
    handleTagDelete = data => event=>{
        const {addTags} = this.state;
        let tmp = [...addTags];
        let idx = tmp.indexOf(data);
        if(idx > -1) {
            tmp.splice(idx,1);
            this.setState({addTags : tmp});
        }
    }
    sendDocument = async(url, data) =>{
        return await fetch(url,{
            method : "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }
    handleSaveButtonClick = async (event)=>{
        const {title, content, doctypeId, doctypeValue, addDefaultTags, addTags} = this.state;
        let tag = [...addDefaultTags, ...addTags];
        let body = {title, content, tag, doctype_id : doctypeId[doctypeValue]};

        this.sendDocument("/api/document",body).then(res=>{
            if(res.status === 200){
                alert("저장되었습니다.");
                window.location.reload();
            }else if(res.status === 400){
                alert("서버에 문제가 발생했습니다.");
            }
        })
        .catch(err=>console.log(err));
    }
    render(){
        const {classes} = this.props;
        const {doctype, doctypeValue, subjects,expanded,category, addDefaultTags, addTags } = this.state;
          
        return(
            <div className={classes.container}>
                <div className={classes.titleComponenet}>
                    <TextField onChange={this.handleTitleChange} label="문서 제목" placeholder="문서의 제목을 입력하세요." className={classes.titleField} margin="normal" variant="outlined" />
                </div>
                <div className={classes.checkBoxComponent}>
                    <RadioList datas={doctype} selectValue={doctypeValue} onChange={this.handleRadioChange("doctypeValue")}/>
                </div>
                <div className={classes.selectComponent}>
                    <FormControl className={classes.selectControl}>
                        <InputLabel htmlFor="select-multiple-checkbox">{doctypeValue} 목차</InputLabel>
                        {subjects[doctypeValue] && 
                        (<Select value={subjects[doctypeValue]} onChange={this.handleSelectChange} >
                         {Object.keys(subjects[doctypeValue]).map((title,index)=>{ return(
                            <MenuItem key={index} value={title} >
                            <Checkbox checked={subjects[doctypeValue][title]} />
                            <ListItemText primary={title} />
                            </MenuItem>
                        )})}
                        </Select>)}
                    </FormControl>
                </div>
                <div className={classes.subjectComponent}>
                    <div className={classes.subjectWrapper}>
                    {subjects[doctypeValue] && 
                    Object.keys(subjects[doctypeValue]).map((title,index)=>{
                        if(subjects[doctypeValue][title]) return (
                            <ExpansionPanel key={index} onChange={this.handleSubjectBoxChange(`panel${index}`)} className={classes.subjectField} square expanded={expanded === `panel${index}`} >
                                <ExpansionPanelSummary>
                                    <Typography>{title}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <InputBase onBlur={this.handleContentBlur(title)} className={classes.contentField}label="content" multiline rows="15" fullWidth placeholder="내용 입력" />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })}
                    </div>
                </div>
                <div className={classes.checkBoxComponent}>
                    <CheckBoxList datas={category} onChange={this.handleCheckBoxChange("category")}/>
                </div>
                <div className={classes.tagComponent}>
                    <div className={classes.tagWrapper}>
                        <Paper className={classes.tagPaper}>                        
                            <div className={classes.tagPaperTitle}>태그내역</div>
                            <div className={classes.chipsField}>
                                {addDefaultTags.map((data, index)=>{ return(
                                    <Chip key={index} label={data} className={classes.chip} component="a" href="#chip" clickable variant="outlined" color="primary" />
                                )})} 
                                {addTags.map((data, index)=>{ return(
                                    <Chip key={index} label={data} className={classes.chip} component="a" href="#chip" clickable variant="outlined" color="primary"  onDelete={this.handleTagDelete(data)}/>
                                )})}
                            </div>
                        </Paper>
                         <div className={classes.TagAddComponent}>
                            <TextField maxLength="15" value={this.state.tagAddData} onChange={this.handleTagAddFieldBlur} label="추가할 태그" placeholder="특징적인 것 입력" variant="outlined" />
                            <Button  onClick={this.handleTagAddButtonClick} variant="contained" color="primary"  className={classes.tagAddButton}  variant="outlined">추가</Button>
                            <br/><br/>
                            <Button  onClick={this.handleSaveButtonClick} variant="contained" color="primary">저장</Button>
                        </div>
                   </div>
                </div>
            </div>
        )
    }

}


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
        width:800,
    },
    selectMenu:{
        maxHeight: 48 * 4.5 + 8,
        width: 250,
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
        justifyContent:'center',
        margin : theme.spacing.unit,
        marginTop : 30,
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
    tagPaperTitle:{
        paddingLeft:30,
        paddingTop:20,
    },
    TagAddComponent:{
        marginTop:20,
    },
    tagAddButton:{
        height:58,
    },
    chipsField:{
        padding:20,
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

export default withStyles(styles)(DocumentWrite);