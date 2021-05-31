import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SkillCard } from './SkillCard';
import axios from 'axios';
import Cookies from 'js-cookie';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      margin: 15,
    //   width: 'min-content',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
    title: {
      flexGrow: 1,
    },
    cardsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  }));

export function SkillCardContainer() {
    const classes = useStyles();
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        axios.get('/skills', {
            headers: { 'Authorization': `Bearer ${Cookies.get('jwt')}` }
        })
        .then(({data = []}) => {
            setSkills(data);
        });
    }, [])

    return (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h4" color="inherit" noWrap className={classes.title}>
              Skills
            </Typography>
            <Divider className={classes.divider} light />
            <Container className={classes.cardsContainer}>
              {skills.map((skill, i) => 
                <SkillCard id={skill.id} title={skill.title} name={skill.name} level={skill.level} key={i}/>
              )}
            </Container>
          </CardContent>
        </Card>
    )
}