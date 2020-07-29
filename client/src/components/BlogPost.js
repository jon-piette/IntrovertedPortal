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
import UserList from './UserList';


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
    paper: {
        marginTop: theme.spacing(8),
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const BlogPost = props => {
    const [blog, setBlog] = useState({
        _id: "",
        title: "",
        description: "",
        post: ""
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/blogs/${props.id}`)
            .then(response => {
                if (response.data.message === "success") {
                    setBlog(response.data.results);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [props.id]);

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/blogs/${props.id}`)
            .then(response => {
                if (response.data.message === "success") {
                    navigate("/blogs/wall")
                }
            })
            .catch(err => console.log(err));
    }

    const classes = useStyles();
    return (
        <div>
            <List className={classes.form} align="center">
                <ListItem>
                    <ListItemText
                        primary={blog.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {blog.description}
                                </Typography>
                                {UserList.firstName}
                                <List>
                                    Post:
                                    <ListItem>
                                        {blog.post}
                                    </ListItem>
                                </List>
                            </React.Fragment>
                        }
                        />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteHandler(blog._id)}
                    >
                        Delete
                    </Button>
                </ListItem>
            </List>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </div>
    );
}
export default BlogPost;