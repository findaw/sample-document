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


class DocumentList extends React.Component{
    state = {
        dense: false,
        lists : [{
            title : "헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. ",
            docType : "미해결 사건",
            category : ["서울", "부산", "방화", "범죄", "해결", "강원도"],
            date : "15:05 2018-09-02",
        },
        {
            title : "군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. ",
            docType : "인물(범인)",
            category : ["미해결", "경기도", "수원", "강도", "살인", "대구"],
            date : "12:05 2019-02-02",
        },
        {
            title : "국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다. ",
            docType : "해결사건",
            category : ["인물(범인)", "서울", "부산", "방화","살인", "울산", "강원도", "강간",],
            date : "18:05 2018-08-02",
        },{
            title : "국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다. ",
            docType : "해결사건",
            category : ["인물(범인)", "서울", "울산", "해결","방화"],
            date : "19:05 2018-08-02",
        }],
        tagDatas :{
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
        trueTagDatas : [],
    };
    
    handleCheckBoxChange = (key,key2)=> (event,value) => {
        const {tagDatas, trueTagDatas} = this.state;
        if(key === null){
            Object.keys(tagDatas).forEach(data=>{
                if (Object.keys(tagDatas[data]).indexOf(key2) > -1)
                    key = data;
            })
        }
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
        const { dense, trueTagDatas } = this.state;
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
                                    {obj.docType}
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

export default withStyles(styles)(DocumentList);