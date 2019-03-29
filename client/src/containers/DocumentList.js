import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CheckBoxList from '../components/CheckBoxList';


class DocumentList extends React.Component{
    state = {
        dense: false,
        doctype:{},
        lists :[],
        tagDatas :{},
        trueTagDatas : [],
    };
    callApi = async(url)=>{
        const resp = await fetch(url);
        const datas = await resp.json();
        return datas;
    }
    componentDidMount(){
        this.callApi("/api/default-doctype-category")
        .then(({doctype, category})=>{
            let document_type = {}, tagDatas={"문서분류" : {}};
            doctype.forEach(obj=>{
                tagDatas["문서분류"][obj.name] = false;
                document_type[obj.doctype_id] = obj.name;
            });
            category.forEach(({typename, name}) =>{
                if(!tagDatas[typename])
                    tagDatas[typename] = {};
                tagDatas[typename][name] = false;
            });
            this.setState({doctype : document_type, tagDatas});
        })
        .catch(err=>{console.log(err);});
        this.callApi("/api/document-list")
        .then(({lists})=>{
            lists.forEach(obj=>{
                obj.category.push(this.state.doctype[obj.doctype]);
            })
            this.setState({lists}, ()=>{console.log(this.state)});
        })
        .catch(err=>console.log(err));
    }
    handleCheckBoxChange = (key,key2)=> (event,value) => {
        const {tagDatas, trueTagDatas} = this.state;
        if(key === null){
            Object.keys(tagDatas).forEach(data=>{
                if (Object.keys(tagDatas[data]).indexOf(key2) > -1)
                    key = data;
            });
        }
        if(key === null) return;
        if(tagDatas[key][key2]){
            let tmp = [...trueTagDatas];
            let idx = tmp.indexOf(key2);
            if(idx > -1) {
                tmp.splice(idx,1);
                this.setState({trueTagDatas : tmp});
            }
        }else{
            this.setState({trueTagDatas : [...trueTagDatas, key2]})
        }
        this.setState({ 
            tagDatas : {
                ...tagDatas,
                [key] : {
                    ...tagDatas[key],
                    [key2] : !tagDatas[key][key2]
                }
            }
        }, ()=>{
            // console.log(value);
            // console.log(trueTagDatas);
            // console.log(tagDatas[key]);
      });

        
    }
    handleCategoryClick  = () =>{
        alert("clicked");
    }
    handleClickList= () =>{
        alert("clicked");
    }
    render() {
        const { classes } = this.props;
        const { doctype, dense, trueTagDatas } = this.state;
        const filteredItems = () => {
            return this.state.lists.map((obj,index) =>{
                let trueTags = obj.category.filter(data=>{
                    let idx = trueTagDatas.indexOf(data);
                    if(idx > -1)
                        return true;
                    else
                        return false;
                });
                if(trueTags.length>0 || trueTagDatas.length === 0){
                    return(
                    <ListItem key={trueTags.length+"_"+index} className={classes.listItem}>
                        <Card className={classes.items}>
                            <CardContent>
                                <Typography className={classes.listType} color="textSecondary" gutterBottom>
                                    {doctype[obj.doctype]}
                                </Typography>
                                <Button  onClick={this.handleClickList}>
                                <Typography className={classes.listTitle}>
                                        {obj.title}
                                </Typography>
                                </Button>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {obj.date}
                                    </Typography>
                                <Typography>
                                    {obj.category.map((data, index2)=>{
                                        let idx = trueTags.indexOf(data);
                                        if(idx > -1)
                                            return <Chip  key={`${index}_${index2}`} label={data} onClick={this.handleCheckBoxChange(null, data)} className={classes.chip} component="a" color="primary"/>
                                        else
                                            return   <Chip  key={`${index}_${index2}`} label={data} onClick={this.handleCheckBoxChange(null, data)} className={classes.chip} component="a" variant="outlined" color="primary"/>
                                    })}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                )}else return null;}
            ).filter(data=>{
                if(data)return true;
            })};

        return(
            <div >
                <div className={classes.checkBox}>
                    <CheckBoxList datas={this.state.tagDatas} onChange={this.handleCheckBoxChange} />
                </div>
                <div>
                    <List className={classes.list} dense={dense}>
                        {filteredItems().sort((a,b)=>{
                            if(a.key > b.key)
                                return -1;
                            else 
                                return 1;
                        })}
                    </List>
                </div>
            </div>
        );
    }
}


const styles = theme => ({
    list: {
        display: 'flex',
        flexWrap: 'wrap',
        margin : theme.spacing.unit,
    },
    listItem:{
        justifyContent: 'center',
    },
    listTitle:{
        textAlign : 'left',
        fontSize : 24,
    },
    listType:{
        fontSize : 16,
    },
    items: {
        width:1200,
    },
    pos: {
        marginBottom: 12,
    },
    chip: {
        margin: theme.spacing.unit/2,
    },
    checkBox:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin : 20,
    }
});



export default withStyles(styles)(DocumentList);