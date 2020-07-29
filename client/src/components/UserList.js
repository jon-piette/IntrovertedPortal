import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';


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

const useStyles = makeStyles ({
    table: {
        minWidth: 450,
    },
});


const UserList = props => {
    const [allUsers, setAllUsers] = useState([]);
    
    const getAll = () => {
        axios.get(`http://localhost:8000/api/blogs/users/register`)
        .then(response => {
            console.log(response);
            setAllUsers(response.data.results);
        });
    }
    
    useEffect(() => {
        getAll();
    }, []);
    const classes = useStyles();

            
    return (
        <>
            <TableContainer component = {Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="center">Date Joined</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers.map((user, i)=> (
                            <TableRow key={i}>
                                <TableCell component="th" scope="row">
                                <Link href={`/blogs/users/${user._id}`}>{user.firstName}&nbsp;{user.lastName}</Link>
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="center">{user.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                <Box mt={8}>
                    <Copyright />
                </Box>
        </>
        )
    }

    
export default UserList;