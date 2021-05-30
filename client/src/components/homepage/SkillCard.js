import React, { useState } from 'react';
import {
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import GradeIcon from '@material-ui/icons/Grade';
import IconButton from '@material-ui/core/IconButton';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Tooltip from '@material-ui/core/Tooltip'
import Cookies from 'js-cookie';
import axios from 'axios';

const muiBaseTheme = createMuiTheme();
const theme = {
  overrides: {
    MuiCard: {
      root: {
        '&.MuiEngagementCard--01': {
          transition: '0.3s',
          maxWidth: 300,
          margin: 'auto',
          boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
          '&:hover': {
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
          },
          '& .MuiCardMedia-root': {
            paddingTop: '56.25%'
          },
          '& .MuiCardContent-root': {
            textAlign: 'left',
            padding: muiBaseTheme.spacing(3)
          },
          '& .MuiDivider-root': {
            margin: `${muiBaseTheme.spacing(3)}px 0`
          },
          '& .MuiTypography--heading': {
            fontWeight: 'bold'
          },
          '& .MuiTypography--subheading': {
            lineHeight: 1.8
          },
          '& .MuiAvatar-root': {
            display: 'inline-block',
            border: '2px solid white',
            '&:not(:first-of-type)': {
              marginLeft: -muiBaseTheme.spacing(1)
            }
          },
          '& .MuiCardStars': {
            display: 'flex', 
            flexDirection: 'row'
          },
        }
      }
    }
  }
};

export const SkillCard = (props) => {
    const {
        id,
        title,
        level,
        name,
    } = props;

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState('');

    const handleBestPersonToAsk = () => {
        axios.get(`/bestPersonToAsk`, {
          params: { skillId: id },
          headers: { 'Authorization': `Bearer ${Cookies.get('jwt')}` }
        })
        .then((res) => { 
          setTooltipTitle(`Doubts? Please refer to: ${res.data.name}`);
          setTooltipOpen(true);
          console.log(res.data) 
        })
        .catch((error) => { console.error(error) });
    };

    return (
        <MuiThemeProvider theme={createMuiTheme(theme)}>
        <>
            <Card className={'MuiEngagementCard--01'}>
                <CardMedia
                    className={'MuiCardMedia-root'}
                    image={
                        'https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg'
                    }
                />
                <CardContent className={'MuiCardContent-root'}>
                    <Typography
                        className={'MuiTypography--heading'}
                        variant={'h6'}
                        gutterBottom
                    >
                        {`Skill: ${title}`}
                    </Typography>
                    <Typography
                        className={'MuiTypography--subheading'}
                        variant={'caption'}
                    >
                        {`Subject: ${name}`}
                    </Typography>

                    <Divider className={'MuiDivider-root'} light />

                    <div className={'MuiCardStars'}>
                      {[...Array(level)].map(() => <GradeIcon/>)}
                    </div>
                    {`Your skill level: ${level}/4`}

                    <Tooltip onOpen={handleBestPersonToAsk} title={tooltipTitle}>
                      <IconButton>
                          <LiveHelpIcon />
                      </IconButton>
                    </Tooltip>
                </CardContent>
            </Card>
        </>
        </MuiThemeProvider>
    );
};
