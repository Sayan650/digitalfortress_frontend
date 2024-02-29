import React, { useState } from "react"
import {
  Card,
  CardHeader,
  CardContent,
  div,
  CardActions,
  Button,
  TextField,
  makeStyles,
  useTheme
} from "@material-ui/core"
import AudioHint from "./AudioHint"

const useStyles = makeStyles(theme => ({
  spacing: {
    padding: "20px"
  },
  buttons: {
    float: "right"
  },
  cardColor: {
    backgroundColor: "rgba(252, 238, 202,0.6)",
    backdropFilter: "blur(5px)",
    textAlign: "center",
    color: "#fff",
    maxWidth: "900px",
    // maxHeight: "600px",
    width: "95%",
    margin: "10px auto",
    borderRadius: "12px",
    // borderBottom: "8px solid rgba(248, 113, 171, 255)",
    // border: "2px solid rgba(248, 113, 171, 255)",
    // borderLeft: "2px solid rgba(248, 113, 171, 255)",
  },
  textstyle: {
    padding: "20px",
    fontSize: "16px",
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#6e1f4b",
    textAlign: "left"
  },
  input: {
    fontFamily: "monospace",
    fontSize: "16px",
    backgroundColor: "rgba(0,0,0,0)",
    border: "none",
    borderBottom: "2px solid rgba(110, 31, 75, 255)",
    width: "90%",
    maxWidth: "400px",
    outline: "none",
    color: "rgba(64, 8, 40, 0.7)",
    textAlign: "center"
  },
  btn: {
    backgroundColor: "rgba(177,61,108,255)",
    color: "rgba(64, 8, 40, 1)",
    outline: "none",
    fontFamily: "monospace",
  },
  img: {
    width: "90%",
    maxWidth: "500px",
    margin: "10px auto",
    borderRadius: "15px"
  },
  terminalHeader: {
    position: "relative",
    backgroundColor: "#282c34", 
    color: "#fff", 
    padding: "8px",
    // paddingTop: "5px",
    borderRadius: "12px 12px 0 0", 
    borderBottom: "2px solid rgba(248, 113, 171, 255)", 
    textAlign: "center",
    fontFamily: "monospace",
  },
  dotContainer: {
    display: "flex",
    paddingBottom: "5px"
  },

  dot: {
    height: "12px",
    width: "12px",
    borderRadius: "50%",
    margin: "0 5px",
  },
}));

export default function Question(props) {
  const [answer, setAnswer] = useState("")
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.cardColor}>
      {console.log(props.question.image)}
      <div className={classes.terminalHeader}>
        <span>{props.question.headerText || "ScreenCast@Mukti_GLUG"}</span>
        {/* Dots */}
        <div className={classes.dotContainer}>
          <div className={`${classes.dot} ${classes.redDot}`} style={{ backgroundColor: "red" }}></div>
          <div className={`${classes.dot} ${classes.yellowDot}`} style={{ backgroundColor: "yellow" }}></div>
          <div className={`${classes.dot} ${classes.greenDot}`} style={{ backgroundColor: "green" }}></div>
        </div>
      </div>
      <div>{props.question.image ? <div><img alt="." src={'${process.env.GATSBY_API_URL}' + props.question.image.substring(1)} className={classes.img} /></div> : <div></div>}</div>
      <div color="white" className={classes.textstyle}>{props.question.question}</div>
      <div>{props.question.audio ? <div><AudioHint audioUrl={'${process.env.GATSBY_API_URL}' + props.question.audio.substring(1)} /></div> : <div></div>}</div>
      <input
        variant="outlined"
        className={classes.input}
        placeholder="Enter your answer"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
      ></input>
      <div className={classes.spacing}>
        <Button
          className={classes.btn}
          variant="contained"
          onClick={e => {
            setAnswer("")
            props.submitRound(answer)

          }}
        >

          Submit
        </Button>
      </div>

    </div>
  )
}
