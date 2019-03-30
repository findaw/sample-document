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
    link:{
        textDecoration:'none',
    },
})



class DocumentView extends React.Component{
    state={
        title:"",
        category :[],
        subjects:[],
        content:[],
        otherDocuments : [],
    }
    callApi = async(url)=>{
        const resp = await fetch(url);
        const datas = await resp.json();
        return datas;
    }
    componentDidMount(){
        let url = new URL(window.location.href);
        
        this.callApi("/api"+url.pathname)
        .then(({title, doctype, category, date, content, subjects})=>{
            this.setState({title, doctype, category, date, content, subjects});
        })
        .catch(err=>console.log(err));
        this.callApi('/api/document-list')
        .then(({lists})=>{
            this.setState({otherDocuments : lists});
        })
        .catch(err=>console.log(err));
    }
    render(){
        const {classes} = this.props;
        const{doctype, title, subjects, content,category,otherDocuments} = this.state;  
        return(
            <div className={classes.root}>
                <div className={classes.titleComponent}>
                    <div className={classes.titleWrapper}>
                        <Typography className={classes.titleField} variant="h6"> 
                            <b>{doctype}</b>
                        </Typography>  <br/>
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
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon  />}>
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
                                    <Button>
                                    <a href={`/view/${obj.document_id}`} className={classes.link} >
                                        <Typography className={classes.listTitle}>
                                                {obj.title}
                                        </Typography>
                                    </a>
                                    </Button>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {obj.date}
                                        </Typography>
                                    <Typography>
                                    {obj.category.map((data,index2)=>{
                                        return(
                                            <i key={index2}>{data}{index2 !== obj.category.length-1 && "/"  }</i>
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