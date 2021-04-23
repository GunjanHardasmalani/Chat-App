import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../themes/createTheme';
import { ThemeProvider, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";

const Header = (props) => {
    const classes = props.classes;
    const users = props.selectedRoom.users;


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.action}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={classes.container}>
                        <Typography variant="h4" noWrap className={classes.heading}>{props.selectedRoom.name}</Typography>
                        {(users) && (<Typography noWrap className={classes.heading}>{users.join(", ")}</Typography>)}
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header;