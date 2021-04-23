import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../themes/createTheme';
import { ThemeProvider } from '@material-ui/core';
import Rooms from './Rooms'
import Header from './Header'
import Message from './Message'

const drawerWidth = 300;
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundColor: '#fff',
            color: '#696969',
            height: 150
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    messageToolbar: {
        height: 700
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 100,
        height: '100%',
        backgroundColor: '#DCDCDC'
    },

    heading: {
        textAlign: 'center',
    },

    container: {
        margin: 'auto',
        paddingTop: 50
    },

    messages: {
        listStyle: 'none',
        fontSize: '20px',
        background: 'none',
        overflowY: 'scroll',
        scrollBehavior: 'smooth',
        marginTop: 60,
        height: '90%',
        minHeight: 300
    },

    messageContent: {
        padding: '20px',
    },

    self: {
        backgroundColor: theme.palette.primary.main,
        padding: '10px',
        borderRadius: '20px',
        marginTop: '10px',
        maxWidth: 'fit-content',
        color: theme.palette.primary.contrastText,
    },

    other: {
        textAlign: 'left',
        backgroundColor: '#fff',
        borderRadius: '20px',
        marginTop: '10px',
        padding: '10px',
        maxWidth: 'fit-content',
    },

    drawerHeading: {
        textAlign: 'center',
        marginBottom: 25,
    },
    form: {
        marginTop: 20,
        position: 'fixed',
        bottom: 10,
        width: '100%',
        maxWidth: 1800
    },

    field: {
        width: '80%',
        maxWidth: 1600
    },

    divider: {
        marginTop: 20,
    },

    margin: {
        margin: theme.spacing(1),
    },

    logout: {
        position: 'absolute',
        bottom: 0
    }

}));

const Dashboard = (props) => {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState([]);
    const [data, setData] = useState([]);
    const [selectedIndex, setselectedIndex] = useState(0);
    const [inputMessage, setInputMessage] = useState("");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClick = async (id) => {
        const response = await fetch('/api/rooms/' + id);
        const result = await response.json();
        setSelectedRoom(result);
        setselectedIndex(id);
        getMessages(id)
        return response;
    };

    const handleChange = (event) => {
        setInputMessage(event.target.value);
    };


    const getRooms = async () => {
        const response = await fetch('/api/rooms');
        const result = await response.json();
        setRooms(result)
        handleClick(result[0].id)
        setselectedIndex(result[0].id)
        return response;
    };

    const getMessages = async (id) => {
        const response = await fetch('/api/rooms/' + id + '/messages')
        const result = await response.json();
        setData(result);
        return response;

    }

    const sendMessage = async (message, myRef) => {

        if (message != null) {
            await fetch('/api/rooms/' + selectedRoom.id + '/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: prop.username, message: message }),
            })
            const response = await getMessages(selectedRoom.id);

            handleClick(selectedRoom.id);
            setInputMessage("");

            if (myRef.current != null) {
                myRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
            }
            return response;
        }
    }
    let prop = {
        classes: classes,
        selectedRoom: selectedRoom,
        action: handleDrawerToggle,
        username: props.location.state.username.username,
        rooms: rooms,
        mobileOpen: mobileOpen,
        handleClick: handleClick,
        handleChange: handleChange,
        messageData: data,
        sendMessage: sendMessage,
        selectedIndex: selectedIndex,
        inputMessage: inputMessage
    }


    useEffect(() => {
        getRooms()
    }, [inputMessage]);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <Header {...prop}></Header>
                <Rooms {...prop} ></Rooms>
                <Message {...prop}></Message>
            </div>
        </ThemeProvider>
    );
}



export default Dashboard;
