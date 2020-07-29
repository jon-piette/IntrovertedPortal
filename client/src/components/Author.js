import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}{new Date().getUTCDate()}|&nbsp; &nbsp; {new Date().getMonth()+1} |&nbsp; &nbsp; {new Date().getFullYear()}<br/>
            <Link href="http://patreon.com/introverted_portal">
                Introverted Portal
            </Link>{' '}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
const Author = props => {
    const [user, setUser] = useState({
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        post: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/users/${props.id}`)
            .then(response => {
                if (response.data.message === "success") {
                    setUser(response.data.results);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [props.id]);

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/blogs/users/${props.id}`)
            .then(response => {
                if (response.data.message === "success") {
                    navigate("/blogs/users/list")
                }
            })
            .catch(err => console.log(err));
    }

    const classes = useStyles();
    return (
        <div>
            <List className={classes.root} align="center">
                <ListItem>
                    <ListItemText
                        primary={user.firstName}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {user.email}
                                </Typography>
                                {user.firstName}&nbsp;{user.lastName}
                                <List>
                                    Post:
                                    <ListItem>
                                        {user.post}
                                    </ListItem>
                                </List>
                            </React.Fragment>
                        }
                        /> 
                </ListItem>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteHandler(user._id)}
                >
                Delete
                </Button>
            </List>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </div>
    );
}
export default Author;