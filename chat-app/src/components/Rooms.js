import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import { ThemeProvider, Typography, Button } from '@material-ui/core';
import theme from '../themes/createTheme';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import history from '../History'

const Rooms = (props) => {
    const classes = props.classes;
    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;
    const [count, setCount] = useState(0);
    var minutes = 0;

    useEffect(() => {
        const interval = setInterval(() => {
            minutes = minutes + 1;
            setCount(minutes);
        }, 60000);
        return () => clearInterval(interval);

    }, []);

    const handleLogout=() => {
        history.push({ pathname:'/' });
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <div className={classes.drawerHeading}>
                <Typography variant="h4" >{props.username}</Typography>
                <Typography variant="subtitle2">Online for {count} minutes</Typography>
            </div>
            <List >
                {props.rooms.map(room => (

                    <ListItem button key={room.id} data-id={room.id} onClick={() => props.handleClick(room.id)} selected={props.selectedIndex === room.id}>
                        <ListItemText primary={room.name} />
                    </ListItem>

                ))}
            </List>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                    className={classes.logout}
                    onClick={handleLogout}
            >
               Logout
                    </Button>
        </div>
    );



    return (

        <ThemeProvider theme={theme}>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={props.mobileOpen}
                        onClose={props.action}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </ThemeProvider>
    )
}

export default Rooms;