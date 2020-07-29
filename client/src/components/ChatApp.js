import React from 'react';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const moment = require('moment');


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxwidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
        height: '2rem',
    },
}));




function Tester () {
    

    const users = [];

    const userJoin = (_id, firstName, lastName, room) => {
        const user = { _id, firstName, lastName, room };

        users.push(user);

        return user;
    }

    const getCurrentUser = (id) => {
        return users.find(user => user._id === id);
    }

    const userLeave = (id) => {
        const index = users.findIndex(user => user._id === id);

        if(index !== -1) {
            return users.splice(index, 1)[0];
        }
    }

    const getRoomUsers = (room) => {
        return users.filter(user => user.room === room);
    }


    const formatMessage = (firstName, lastName, text) => {
        return{
            firstName,
            lastName,
            text,
            time: moment().format('h:mm a')
        };
    }
    
    const classes = useStyles();
    return(
        <div className={classes.root} align="center">
            <input
                type="textarea"
                placeholder="Enter your message here"
                className={classes.inline}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                <SendRoundedIcon/>
            </Button>
        </div>
    );
}

export default Tester;