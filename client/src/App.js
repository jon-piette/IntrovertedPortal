import React from 'react';
import Typography from '@material-ui/core/Typography';
import LaptopChromebookTwoToneIcon from '@material-ui/icons/LaptopChromebookTwoTone';
// import io from 'socket.io-client';
import { Router, Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import BlogWall from './components/BlogWall';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import BlogPost from './components/BlogPost';
import Author from './components/Author';
import './App.css';
import { green, blue } from '@material-ui/core/colors';
import { Fab } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ChatApp from './components/ChatApp';


const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));


export default function App() {

  const classes = useStyles();

  return (
    <div className="App">
      <Typography component="h1" variant="h3" style={{ color: blue[700]}}>
        <LaptopChromebookTwoToneIcon fontSize="large" style={{ color:green[600]}}/>
          Introverted Portal
        <LaptopChromebookTwoToneIcon fontSize="large" style={{ color:green[600]}}/>
      </Typography>
      <nav className="text-center">
        <Link to="/">Home</Link> |&nbsp;
        <Link to="/blogs/new">Make a new post!</Link> |&nbsp;
        <Link to="/blogs/users/list">See all our Authors</Link> |&nbsp;
        <Link to="/blogs/wall">See our newest blog posts</Link> |&nbsp;
      </nav>
      <Router>
        <Login path="/" default action="edit"/>
        <Register path="/blogs/users/register" action="create"/>
        <CreateBlog path="/blogs/new" action="create"/>
        <UserList path="/blogs/users/list"/>
        <BlogWall path="/blogs/wall"/>
        <BlogPost path ="/blogs/:id"/>
        <Author path = "/blogs/users/:id"/>
      </Router>
      <PopupState variant="popover" popupId="chatter">
        {(PopupState) => (
          <div>
      <Tooltip title="Chatter" aria-label="chatter" {...bindTrigger(PopupState)}>
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
          </Fab>
      </Tooltip>
      <Popover
        {...bindPopover(PopupState)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal:"center",
        }}
        >
          <Box p={5}>
            <ChatApp/>
          </Box>
        </Popover>
          </div>
        )}
      </PopupState>
    </div>
  );
}


