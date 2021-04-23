
import React, { useRef} from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import theme from '../themes/createTheme';
import { Box, Button, ThemeProvider } from '@material-ui/core';


const Message = (props) => {
    const classes = props.classes;
    // const [message, setMessage] = useState('');
    const myRef = useRef(null);
    // const handleChange = (event) => {
    //     setMessage(event.target.value);
    // };


    
    return (
        <ThemeProvider theme={theme}>
            <main className={classes.content}>
                <div className={classes.toolbar, classes.messageToolbar}>
                    <ul className={classes.messages}>
                        {props.messageData.map(data => (
                            <div>
                                {(props.username === data.name) ? (
                                    <Box display='flex' flexDirection="row-reverse" marginRight={2}>
                                        <li className={classes.self} ref={myRef}>
                                            <div className={classes.pos}>  {data.message}</div>
                                        </li>
                                    </Box>
                                ) : (
                                        <div>
                                            <li className={classes.other}  ref={myRef}>
                                                <div>  {data.message}</div>
                                            </li>
                                            <Typography variant="subtitle2">{data.name}</Typography>
                                        </div>
                                    )}
                            </div>
                        ))}
                    </ul>
                    <Divider className={classes.divider}/>
                    <form className={classes.form} >
                    <TextField id="outlined-basic" variant="outlined" onChange={props.handleChange} value={props.inputMessage} className={classes.field} placeholder='Type your message here'/>
                    <Button color="secondary" size="large" id="sendBtn" className={classes.margin} onClick={() => props.sendMessage(props.inputMessage,myRef)}>Send</Button>
                </form>
                </div>
            </main>
        </ThemeProvider>
    )
}

export default Message;