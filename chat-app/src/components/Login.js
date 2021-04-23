import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import theme from '../themes/createTheme';
import { makeStyles } from '@material-ui/core/styles';
import history from '../History'

const useStyles = makeStyles({
    container: {
        position: "absolute",
        top: '40%',
        textAlign: 'center'
    },
  

});

const Login = (props) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');

    const handleLogin = async (event) => {
        if(username!==''){
            event.preventDefault();
            history.push({ pathname:'chat',    state: { username: username } });
        }
       
      
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsername((prevState) => ({
          ...prevState,
          [name]: value
        }));
      };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" >
                <form className={classes.container}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Type your username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                    >
                        Join the Chat!
                    </Button>
                </form>
            </Container>
        </ThemeProvider>

    );
}

export default Login;