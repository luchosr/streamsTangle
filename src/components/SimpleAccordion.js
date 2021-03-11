import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    fontSize:'10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  typo:{
    fontSize:'14px',
    height:'100%',
    overflow:'hidden'
  }
}));

export default function SimpleAccordion(props) {
  const { heading, detail, key } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.heading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.typo}>
          {props.detail}
          </Typography>
        </AccordionDetails>
      </Accordion>


    </div>
  );
}
