import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core"
import store from "../store/index";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  gfont:{
    fontFamily: "monospace",
    color:"rgba(248, 113, 171, 255)",
    outline:"none",
  },
  btn2:{
    margin:"10px auto",
    color:"rgba(248, 113, 171, 255)",
    outline:"none",
    border:"2px solid rgba(248, 113, 171, 255)",
    fontFamily: "monospace",
  },
  dialog:{
    backgroundColor: "rgba(53, 33, 90, 0.6)",
    textAlign:"center",
  },
  diaIn: {
    backgroundColor: "rgba(21, 31, 69, 0.82)",
    textAlign: "left", 
    color: "#fff",
    borderBottom: "8px solid rgba(248, 113, 171, 255)",
    border: "1px solid rgba(248, 113, 171, 255)",
    borderLeft: "1px solid rgba(248, 113, 171, 255)",
    margin: "0 auto",
    maxWidth: "500px",
    padding: "25px",
    fontFamily: "monospace"
  },
})

class Rules extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    var self = this
    store.subscribe(() => {
      self.setState({
        modal: store.getState()
      })
    })
  }

  render() {
    return (
      <Dialog
        open={this.state.modal}
        onClose={e => store.dispatch({ type: 'CLOSE' })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={this.props.classes.dialog}
      >
        <div className={this.props.classes.diaIn}>
        <div style={{fontSize:"18px"}} className={this.props.classes.gfont}>RULES OF THE QUIZ</div>
        
          
          <ol style={{margin:"10px auto", textAlign:"left"}}>
              <li>Solving each round rewards you 10 points.</li>
              <li>Each Round is based on a technical theme which you need to figure out.</li>
              <li>The leaderboard will be inactive during sample rounds.</li>
            </ol>
          
        
        
          <Button onClick={e => this.toggle()} className={this.props.classes.btn2} >
            Close
          </Button>
        </div>
      </Dialog>
    );
  }

}

export default withStyles(styles)(Rules)