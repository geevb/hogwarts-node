import React from "react";
import {
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import GradeIcon from '@material-ui/icons/Grade';

const muiBaseTheme = createMuiTheme();
const theme = {
  overrides: {
    MuiCard: {
      root: {
        "&.MuiEngagementCard--01": {
          transition: "0.3s",
          maxWidth: 300,
          margin: "auto",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
          },
          "& .MuiCardMedia-root": {
            paddingTop: "56.25%"
          },
          "& .MuiCardContent-root": {
            textAlign: "left",
            padding: muiBaseTheme.spacing.unit * 3
          },
          "& .MuiDivider-root": {
            margin: `${muiBaseTheme.spacing.unit * 3}px 0`
          },
          "& .MuiTypography--heading": {
            fontWeight: "bold"
          },
          "& .MuiTypography--subheading": {
            lineHeight: 1.8
          },
          "& .MuiAvatar-root": {
            display: "inline-block",
            border: "2px solid white",
            "&:not(:first-of-type)": {
              marginLeft: -muiBaseTheme.spacing.unit
            }
          }
        }
      }
    }
  }
};

export const SkillCard = (props) => {
    const {
        title,
        level,
        name,
    } = props;

    return (
        <MuiThemeProvider theme={createMuiTheme(theme)}>
        <>
            <Card className={"MuiEngagementCard--01"}>
                <CardMedia
                    className={"MuiCardMedia-root"}
                    image={
                        "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                    }
                />
                <CardContent className={"MuiCardContent-root"}>
                    <Typography
                        className={"MuiTypography--heading"}
                        variant={"h6"}
                        gutterBottom
                    >
                        {`Skill: ${title || 'DEFAULT SKILL TITLE'}`}
                    </Typography>
                    <Typography
                        className={"MuiTypography--subheading"}
                        variant={"caption"}
                    >
                        {`Subject: ${name || 'DEFAULT SUBJECT NAME'}`}
                    </Typography>

                    <Divider className={"MuiDivider-root"} light />
                    
                    {[...Array(level)].map(() => <GradeIcon/>)}
                    {`Skill level: ${level || 0}/5`}
                </CardContent>
            </Card>
        </>
        </MuiThemeProvider>
    );
};
