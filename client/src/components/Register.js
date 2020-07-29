import React, {useState, useEffect} from 'react';
import { navigate} from '@reach/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';


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

export default function SignUp(props) {
    const classes = useStyles();
    const { action } = props;
    const [newUser, setNewUser]=useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    useEffect (() => {
        if(action === "edit"){
            axios.get(`http://localhost:8000/api/blogs/users/${props.id}`)
                .then(response => {
                    if(response.data.message === "success")
                        setNewUser(response.data.results)
                    else
                        navigate("/blogs/new")
                })
        }
    }, [action, props.id])

    const submitHandler = e =>{
        e.preventDefault();
        console.log(newUser);
        if(validate(newUser)){
            if(action === "edit"){
                axios.patch(`http://localhost:8000/api/blogs/users/${props.id}`, newUser)
                    .then(response => {
                        console.log(response);
                        if(response.data.message === "success") {
                            navigate("/blogs/new");
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                console.log("This is in the submit handler")
                axios.post(`http://localhost:8000/api/blogs/users/register`, newUser)
                    .then(response => {
                        console.log(response);
                        if(response.data.message === "success"){
                            navigate("/")
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }

    const changeHandler = e => {
        const curUser = {
            ...newUser,
            [e.target.name]: e.target.value
        }
        
        validate(curUser);
        setNewUser(curUser);
    }

    const validate = user => {
        let valid = false;
        const {...curErrors} = errors;
        if(user.firstName.length === 0){
            curErrors.firstName = "This field is required.";
        } else {
            curErrors.firstName = "";
            valid = true;
        }
        if(user.lastName.length === 0){
            curErrors.lastName = "This field is required.";
        } else {
            curErrors.lastName = "";
            valid = true;
        }
        if(user.email.length === 0){
            curErrors.email = "This field is required.";
        } else {
            curErrors.email = "";
            valid = true;
        }
        if(user.password.length === 0){
            curErrors.password = "This field is required.";
        } else {
            curErrors.password = "";
            valid = true;
        }

        setErrors(curErrors);

        return valid;
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form}  onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            {
                                errors.firstName ?
                                <p className = "col-sm-6 offset-sm-4 text-danger">{errors.firstName}</p>
                                :
                                ""
                            }
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={changeHandler}
                                value={newUser.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        {
                                errors.lastName ?
                                <p className = "col-sm-6 offset-sm-4 text-danger">{errors.lastName}</p>
                                :
                                ""
                            }
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoFocus
                                onChange={changeHandler}
                                value={newUser.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        {
                                errors.email ?
                                <p className = "col-sm-6 offset-sm-4 text-danger">{errors.email}</p>
                                :
                                ""
                            }
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                onChange={changeHandler}
                                value={newUser.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        {
                                errors.password ?
                                <p className = "col-sm-6 offset-sm-4 text-danger">{errors.password}</p>
                                :
                                ""
                            }
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoFocus
                                onChange={changeHandler}
                                value={newUser.password}
                            />
                        </Grid>
                        <Grid item xs ={12}>
                        {
                                errors.confirmPassword ?
                                <p className = "col-sm-6 offset-sm-4 text-danger">{errors.confirmPassword}</p>
                                :
                                ""
                            }
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmpassword"
                                autoFocus
                                onChange={changeHandler}
                                value={newUser.confirmPassword}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="http://localhost:3000/">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}