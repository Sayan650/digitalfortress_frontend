/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import GoogleSignIn from "../components/GoogleSignIn"
import logo from "../images/logodf.png"
import { Link } from "gatsby"
import FacebookSignIn from "./FacebookSignIn"
import { navigate } from "gatsby"
import Rules from "../components/Rules"
import AnswerAlert from "../components/AnswerAlert"
import {
  AppBar,
  Toolbar,
  IconButton,
  div,
  withStyles,
  Button,
  Hidden,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core"
import {
  Menu,
  Home,
  Inbox,
  Mail,
  ChevronLeft,
  ChevronRight,
  Facebook,
  YoutubeSearchedFor,
  YouTube,
} from "@material-ui/icons"
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify"
import DashboardIcon from "@material-ui/icons/Dashboard"
import Logout from "./Logout"
import Dashboard from "../pages/dashboard"
import GoogleLogin from "react-google-login"
import store from "../store/index"
import Axios from "axios"

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  gfont:{
    fontFamily: "monospace",
    fontSize: "x-large",
    color: "#6e333d",
    fontWeight: "bold"
  },
  BackdropProps: {
    background: "transparent",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    float: "right",
  },
  appBar: {
    zIndex:999,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#ed9c61",
    backdropFilter: "blur(3px)",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: -1,
  },
  drawerPaper: {
    zIndex:9999,
    width: drawerWidth,
    background: "rgba(0,0,0, 0.2)",
    backdropFilter: "blur(3px)",
    color: "white",
    opacity: 0.75,
    zIndex: -1,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: "",
      name: "",
      isOpen: false,
      score: -17,
      rank: -17,
    }
    this.setProfile = this.setProfile.bind(this)
    this.getScore = this.getScore.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.closeNavbar = this.closeNavbar.bind(this)
  }

  componentDidMount() {
    this.setProfile()
    this.getScore()
  }

  setProfile() {
    if (localStorage.email) {
      this.setState({
        profileImage: localStorage.image,
        name: localStorage.name,
      })
    }
  }

  getScore() {
    var self = this
    Axios.get(`${process.env.GATSBY_API_URL}quiz/user?format=json`, {
      headers: {
        Authorization: `Token ${localStorage.token}`,
      },
    })
    .then(function(response) {
      //console.log(response)
      self.setState({
        score: response.data.score,
        rank: response.data.rank
      })
    })
    .catch(function(error) {
      //console.log(error)
      //AnswerAlert(-1)
    })
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
      
    })
  }

  closeNavbar() {
    if(this.state.collapsed !== true){
      this.toggleNavbar();
    }
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={e => this.toggleNavbar()}
            >
              <Menu color="#6e333d" />
            </IconButton>

            {/* <img
              src={logo}
              height={35}
              className="d-inline-block align-top"
              alt="Logo"
            /> */}
            <div className={`d-inline-block align-top text-4xl !text-[#6e333d] ${classes.gfont}`}>ScreenCast</div>
            <div className={classes.grow} />
            <Hidden smDown >
              <Link to="/" style={{ color: "#6e333d" }}>
                <Button className={classes.gfont} color="inherit">Home</Button>
              </Link>
              <Button
                color="#6e333d"
                className={classes.gfont}
                onClick={e => store.dispatch({ type: "OPEN" })}
              >
                Rules
              </Button>
              <Link to="/leaderboard/" style={{ color: "#6e333d" }}>
                <Button className={classes.gfont} color="inherit">LeaderBoard</Button>
              </Link>
            </Hidden>
            <Logout />
          </Toolbar>
        </AppBar>
        {/* hide from 960px */}
        <SwipeableDrawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={this.state.isOpen}
          onClose={e => this.setState({ isOpen: false })}
          onOpen={e => this.setState({ isOpen: true })}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.toggleNavbar}>
              <ChevronLeft style={{ color: "white" }} />
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/" onClick={e => this.closeNavbar()}>
              <ListItem button key="Home">
                <ListItemIcon>
                  <Home style={{ color: "white" }} />
                </ListItemIcon>

                <div className={classes.gfont} style={{color:"#fff"}}>Home</div>
              </ListItem>
            </Link>
            <ListItem button key="Rules">
              <ListItemIcon>
                <FormatAlignJustifyIcon style={{ color: "white" }} />
              </ListItemIcon>

              <div className={classes.gfont} onClick={e => store.dispatch({ type: "OPEN" })} style={{color:"#fff"}}>Rules</div>
                
              
            </ListItem>

            <Link to="/leaderboard/"  onClick={e => this.closeNavbar()} >
              <ListItem button key="Leaderboard">
                <ListItemIcon>
                  <DashboardIcon style={{ color: "white" }} />
                </ListItemIcon>
                <div className={classes.gfont} style={{color:"#fff"}}>Leaderboard</div>
              </ListItem>
            </Link>
            <ListItem>
              {this.state.score != -17 ? <div className={classes.gfont} style={{color:"#fff"}}>Your Score - {this.state.score}</div> : <div></div>}
            </ListItem>
            <ListItem>
            {this.state.score != -17 ? <div className={classes.gfont} style={{color:"#fff"}}>Your Rank - {this.state.rank}</div> : <div></div>}
            </ListItem>
          </List>
        </SwipeableDrawer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(NavBar)
