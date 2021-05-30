import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import GradeIcon from '@material-ui/icons/Grade';
import IconButton from '@material-ui/core/IconButton';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Tooltip from '@material-ui/core/Tooltip'
import Cookies from 'js-cookie';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 25
  },
  media: {
    height: 140,
  },
  skillTitle: {
    width: 250
  },
  divider: {
    marginTop: 5,
    marginBottom: 5
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5
  }
});

export function SkillCard(props) {
  const CARD_SKILL_SUBJECT_IMAGE = {
    'Potions': 'potions.jpg',
    'Transfiguration': 'transfiguration.jpg'
  };
  
  const {
    id,
    title,
    level,
    name,
  } = props;

  const [tooltipTitle, setTooltipTitle] = useState('');
  const handleBestPersonToAsk = () => {
      axios.get(`/bestPersonToAsk`, {
        params: { skillId: id },
        headers: { 'Authorization': `Bearer ${Cookies.get('jwt')}` }
      })
      .then((res) => { 
        setTooltipTitle(`Doubts? Please refer to: ${res.data.name}`);
      })
      .catch((error) => { console.error(error) });
  };
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={CARD_SKILL_SUBJECT_IMAGE[name]}
        />
        <CardContent>
          <Typography className={classes.skillTitle} gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {name}
          </Typography>
          <Divider className={classes.divider} light />
          <div className={classes.stars}>
            {[...Array(level)].map(() => <GradeIcon/>)}
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Your skill level: ${level}/4`}
            <Tooltip onOpen={handleBestPersonToAsk} title={tooltipTitle}>
              <IconButton>
                  <LiveHelpIcon />
              </IconButton>
            </Tooltip>
          </Typography>
        </CardContent>
    </Card>
  );
}
