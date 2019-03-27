import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

const styles = theme=>({
    root:{
        width:'100%',
    },
    titleComponent: {
        display:'flex',
        justifyContent : 'center', 
    },
    titleWrapper:{
        width:1200,
        margin: theme.spacing.unit*7,
    },
    titleField:{
        textAlign:'center',
    },
    contentsContainer: {
        display:'flex',
        justifyContent : 'center', 
    },
    contentsWrapper:{
        width:1200,
        margin: theme.spacing.unit*2,
    },
    contentsComponent:{
        padding: theme.spacing.unit*2,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    otherDocuments: {
        display: 'flex',
        flexWrap: 'wrap',
        margin : theme.spacing.unit,
        justifyContent: 'center',
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
})



class DocumentView extends React.Component{
    state={
        title:"헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. ",
        category :["방화", "경기도", "서울", "강도", "미해결"],
        subjects:['April Tucker','Ralph Hubbard','Omar Alexander',],
        content:[`<p>모든 국민의 재산권은 보장된다. 그 내용과 한계는 법률로 정한다. 훈장등의 영전은 이를 받은 자에게만 효력이 있고, 어떠한 특권도 이에 따르지 아니한다.</p>
        <p>헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. 누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다.</p>
        <p>모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.</p>
        <p>대통령으로 선거될 수 있는 자는 국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다. 국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다.</p>
        <p>국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.</p>
        <p>제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다.</p>
        <p>국회의원이 회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다. 위원은 정당에 가입하거나 정치에 관여할 수 없다.</p>
        <p>군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다.</p>
        <p>국가원로자문회의의 의장은 직전대통령이 된다. 다만, 직전대통령이 없을 때에는 대통령이 지명한다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.</p>
        <p>국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다. 모든 국민은 자기의 행위가 아닌 친족의 행위로 인하여 불이익한 처우를 받지 아니한다.</p>`,`<p>모든 국민은 인간다운 생활을 할 권리를 가진다. 국가는 건전한 소비행위를 계도하고 생산품의 품질향상을 촉구하기 위한 소비자보호운동을 법률이 정하는 바에 의하여 보장한다.</p>
        <p>모든 국민은 주거의 자유를 침해받지 아니한다. 주거에 대한 압수나 수색을 할 때에는 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야 한다. 대한민국은 민주공화국이다.</p>
        <p>대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수 있다. 법원은 최고법원인 대법원과 각급법원으로 조직된다. 헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다.</p>
        <p>국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다. 대통령의 선거에 관한 사항은 법률로 정한다.</p>`,`<p>모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다. 지방의회의 조직·권한·의원선거와 지방자치단체의 장의 선임방법 기타 지방자치단체의 조직과 운영에 관한 사항은 법률로 정한다.</p>
        <p>대통령으로 선거될 수 있는 자는 국회의원의 피선거권이 있고 선거일 현재 40세에 달하여야 한다. 국회의원의 선거구와 비례대표제 기타 선거에 관한 사항은 법률로 정한다.</p>
        <p>국회의원은 국회에서 직무상 행한 발언과 표결에 관하여 국회외에서 책임을 지지 아니한다. 민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.</p>
        <p>제2항의 재판관중 3인은 국회에서 선출하는 자를, 3인은 대법원장이 지명하는 자를 임명한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을 박탈당하지 아니한다.</p>
        <p>국회의원이 회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가 있으면 회기중 석방된다. 위원은 정당에 가입하거나 정치에 관여할 수 없다.</p>
        <p>군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. 제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여 국회재적의원 과반수의 찬성이 있어야 한다.</p>
        <p>국가원로자문회의의 의장은 직전대통령이 된다. 다만, 직전대통령이 없을 때에는 대통령이 지명한다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.</p>`],
        otherDocuments : [{
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
    }
    render(){
        const {classes} = this.props;
        const{title, subjects, content,category,otherDocuments} = this.state;    
        
        return(
            <div className={classes.root}>
                <div className={classes.titleComponent}>
                    <div className={classes.titleWrapper}>
                        <Typography className={classes.titleField} variant="h4">
                            <b>{title}</b>
                        </Typography>  <br/>
                        <div className={classes.titleField}>
                            {category.map((data,index)=>{
                                return(
                                    <i key={"category"+index}>{data}{index!==category.length-1 && "/"  }</i>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={classes.contentsContainer}>
                    <div className={classes.contentsWrapper}>
                    {subjects.map((data, index)=>{
                        return (
                            <ExpansionPanel key={"content"+index} className={classes.contentsComponent} expanded={true}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{data}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                    {content[index]}
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        );
                    })} 
                    </div>
                </div><br/><br/><br/>
                <div className={classes.otherDocuments}>
                    <Typography variant="h5">
                            <b>다른 문서</b>
                    </Typography><br/><br/>
                {otherDocuments.map((obj,index)=>{
                    return(
                        <ListItem key={"doc"+index} className={classes.listItem}>
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
                                    {obj.category.map((data,index2)=>{
                                        return(
                                            <i key={`doc${index}_${index2}`}>{data}{index2 !== obj.category.length-1 && "/"  }</i>
                                        )
                                    })}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                    );
                })}
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(DocumentView);