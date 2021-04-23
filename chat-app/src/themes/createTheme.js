import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#e33371',
            main: '#dc004e',
            dark: '#9a0036',
            contrastText: '#fff',
           
        },

        secondary: {
            light: '#5393ff',
            main: '#2979ff',
            dark: '#1c54b2',
            contrastText: '#fff',
          },
     
    },
});

export default theme;
