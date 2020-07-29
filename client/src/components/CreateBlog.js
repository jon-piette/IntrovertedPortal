import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}&nbsp;{new Date().getUTCDate()}&nbsp; |&nbsp; &nbsp; {new Date().getMonth() + 1}&nbsp; |&nbsp; &nbsp; {new Date().getFullYear()}<br />
            <Link color="inherit" href="http://patreon.com/introverted_portal">
                Introverted Portal
            </Link>{' '}
        </Typography>
    );
}



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const CreateBlog = props => {
    const classes = useStyles();
    const { action } = props;
    const [newBlog, setNewBlog] = useState({
        title: "",
        description: "",
        post: ""
    })
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        post: ""
    })

    useEffect(() => {
        if (action === "edit") {
            axios.get(`http://localhost:8000/api/blogs/${props.id}`)
                .then(response => {
                    if (response.data.message === "success")
                        setNewBlog(response.data.results)
                    else
                        navigate("/blogs/wall");
                })
        }
    }, [action, props.id])

    const submitHandler = e => {
        e.preventDefault();
        console.log(newBlog);
        if (validate(newBlog)) {
            if (action === "edit") {
                axios.patch(`http://localhost:8000/api/blogs/${props.id}`, newBlog)
                    .then(response => {
                        console.log(response);
                        if (response.data.message === "success") {
                            navigate("/");
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                console.log("This is in the submit handler")
                axios.post(`http://localhost:8000/api/blogs`, newBlog)
                    .then(response => {
                        console.log(response);
                        if (response.data.message === "success") {
                            navigate("/blogs/wall");
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    const changeHandler = e => {
        const curBlog = {
            ...newBlog,
            [e.target.name]: e.target.value
        }

        validate(curBlog);
        setNewBlog(curBlog);
    }

    const validate = blog => {
        let valid = false;
        const { ...curErrors } = errors;
        if (blog.title.length === 0) {
            curErrors.title = "This is a required field";
        } else {
            curErrors.title = "";
            valid = true;
        }
        if (blog.description.length === 0) {
            curErrors.description = "This is a required field";
        } else {
            curErrors.description = "";
            valid = true;
        }
        if (blog.post.length === 0) {
            curErrors.post = "This is a required field";
        } else {
            curErrors.post = "";
            valid = true;
        }
        setErrors(curErrors);

        return valid;
    }




    return (
        <div>
            <div className="row">
                <form className={classes.form} onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {
                                errors.title ?
                                    <p className="col-sm-6 offset-sm-4 text-danger">{errors.title}</p>
                                    :
                                    ""
                            }
                            <TextField
                                autoComplete="title"
                                name="title"
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Title"
                                autoFocus
                                onChange={changeHandler}
                                value={newBlog.title}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {
                                errors.description ?
                                    <p className="col-sm-6 offset-sm-4 text-danger">{errors.description}</p>
                                    :
                                    ""
                            }
                            <TextField
                                autoComplete="description"
                                name="description"
                                variant="outlined"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                autoFocus
                                onChange={changeHandler}
                                value={newBlog.description}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                errors.post ?
                                    <p className="col-sm-6 offset-sm-4 text-danger">{errors.post}</p>
                                    :
                                    ""
                            }
                            <TextField
                                autoComplete="post"
                                name="post"
                                variant="outlined"
                                required
                                fullWidth
                                id="post"
                                label="Post"
                                autoFocus
                                onChange={changeHandler}
                                value={newBlog.post}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="caution"
                        className={classes.submit}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </div>
    );

}

export default CreateBlog;