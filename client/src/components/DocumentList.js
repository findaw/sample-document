import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
    chip: {
        margin: theme.spacing.unit/2,
    },
});


class DocumentList extends React.Component{
    state = {
        dense: false,
        lists : [{
            title : "헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다. ",
            docType : "미해결 사건",
            category : ["서울", "부산", "사건", "범죄","서울", "부산", "사건", "범죄"],
            date : "12:05 2018-08-02",
        },
        {
            title : "군인은 현역을 면한 후가 아니면 국무총리로 임명될 수 없다. ",
            docType : "인물(범인)",
            category : ["미해결사건", "경기도", "수원", "사건", "살인", "대구"],
            date : "12:05 2018-08-02",
        },
        {
            title : "국가는 전통문화의 계승·발전과 민족문화의 창달에 노력하여야 한다. ",
            docType : "해결사건",
            category : ["인물(범인)", "서울", "부산", "사건", "울산"],
            date : "12:05 2018-08-02",
        }]
    };
    handleCategoryClick  = () =>{
        alert("clicked");
    }
    handleClickList= () =>{
        alert("clicked");
    }
    render() {
        const { classes } = this.props;
        const { dense } = this.state;
        const listItems = this.state.lists.map((obj,index) =>{return( 
            <ListItem key={index} className={classes.listItem}>
                <Card className={classes.items}>
                    <CardContent>
                        <Typography className={classes.listTye} color="textSecondary" gutterBottom>
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
                                return   <Chip  key={`${index}_${index2}`} label={data} onClick={this.handleCategoryClick} className={classes.chip} component="a" variant="outlined" color="primary"/>
                            })}
                        </Typography>
                    </CardContent>
                </Card>
            </ListItem>
            )});

        return(
            <div >
                <List className={classes.list} dense={dense}>
                    {listItems}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DocumentList);