import React, { Component } from 'react';
import {ThemeContext} from '../context/ThemeContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    colorChecked: {},
    iOSSwitchBase: {
        '&$iOSChecked': {
            color: theme.palette.common.black,
            '& + $iOSBar': {
                backgroundColor: '#52d869',
            },
        },
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.sharp,
        }),
    },
    iOSChecked: {
        transform: 'translateX(15px)',
        '& + $iOSBar': {
            opacity: 1,
            border: 'none',
        },

    },
    iOSBar: {
        borderRadius: 13,
        width: 42,
        height: 26,
        marginTop: -13,
        marginLeft: -21,
        border: 'solid 1px',
        borderColor: theme.palette.grey[400],
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    iOSIcon: {
        width: 24,
        height: 24,
    },
    iOSIconChecked: {
        boxShadow: theme.shadows[1],
    },
});

class ThemeTogglerButton extends Component{
    state = {
        isLight: true
    };

    handleChange = event => {
        this.setState({ isLight: event.target.checked });
        this.props.context.toggleTheme();
    };

    render() {
        const { classes } = this.props;
        return (
            <FormControlLabel style={{position: 'absolute',marginLeft : '51px'}}
                control={
                    <Switch
                        classes={{
                            switchBase: classes.iOSSwitchBase,
                            bar: classes.iOSBar,
                            icon: classes.iOSIcon,
                            iconChecked: classes.iOSIconChecked,
                            checked: classes.iOSChecked,
                        }}
                        disableRipple
                        checked={this.state.isLight}
                        onChange={this.handleChange}
                    />
                }
                label="Change theme"
            />
        )
    }
}

ThemeTogglerButton.contextType = ThemeContext;

const CustomizedSwitches =  (props) => (
    <ThemeContext.Consumer>
        {(context) => <ThemeTogglerButton {...props} context={context}/>}
    </ThemeContext.Consumer>
)

export default withStyles(styles)(CustomizedSwitches);
