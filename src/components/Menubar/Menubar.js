import React from 'react'

import { Navbar, Nav } from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import "./Menubar.css";


export default class Menubar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            language: this.props.language,
            onLanguageChange: this.props.onLanguageChange,
            onSwitchChange: this.props.onSwitchChange,
            onRun: this.props.onRun,
            snackbar: false,
        }
        console.log("button text: ", this.props.runButtonText);
    }

    onRun = () => {
        this.setState({ ...this.state, snackbar: true });
        console.log("submit: ", this.state);
        this.state.onRun();
    }

    onSwitchChange = (event) => {
        this.state.onSwitchChange(event.target.checked);
    }

    toggleDialog = () => {
        this.state.open ? this.setState({ ...this.state, open: false }) : this.setState({ ...this.state, open: true });
    }

    onLanguageChange = (event) => {
        this.setState({ ...this.state, language: event.target.value });
        this.state.onLanguageChange(event);
    }

    onSnackbarCloseClick = () => {
        this.setState({ ...this.state, snackbar: false });
    }

    render() {

        return (
            <Navbar expand="lg" className="main-nav" variant="dark" >
                <Navbar.Brand>
                    <Button
                        disabled={this.props.runButtonDisabled}
                        variant="contained"
                        color="secondary"
                        size="medium"
                        onClick={this.onRun}
                        startIcon={< PlayCircleFilledWhiteRoundedIcon />}
                    >
                        <div className="primary-btn-text" > {this.props.runButtonText} </div>
                    </Button>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.snackbar}
                        autoHideDuration={1000}
                        onClose={this.onSnackbarCloseClick}
                        message="Executing"
                        action={
                            <React.Fragment>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={this.onSnackbarCloseClick}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </Navbar.Brand>
                <Nav className="mr-auto" >
                    <Nav.Item>
                        <Button variant="outlined" color="secondary" onClick={this.toggleDialog} >
                            Options
                        </Button>
                        < Dialog open={this.state.open} onClose={this.toggleDialog} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth={true} >
                            <DialogTitle id="form-dialog-title" > Options </DialogTitle>
                            < DialogContent className="mr-auto" >
                                <div id="dialog-ele" >
                                    <FormControlLabel
                                        value="end"
                                        control={< Switch id="drop-down" checked={this.props.checked} onChange={this.onSwitchChange} />}
                                        label="Enter Input"
                                        labelPlacement="end"
                                    />
                                </div>

                                <FormControl id="drop-down" variant="filled" >
                                    <InputLabel size="small" id="drop-down" > Language </InputLabel>
                                    <Select
                                        value={this.state.language}
                                        onChange={this.onLanguageChange}
                                        color="secondary"
                                        labelId="label"
                                        id="drop-down"
                                    >
                                        <MenuItem value={"CPP_14"}> <b>C++ </b></MenuItem >
                                        <MenuItem value={"C"}> <b>C </b></MenuItem >
                                        <MenuItem value={"JAVA"}> <b>Java </b></MenuItem >
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.toggleDialog} color="secondary" >
                                    Close
                                    </Button>
                            </DialogActions>
                        </Dialog>
                    </Nav.Item>
                </Nav>
            </Navbar >
        )
    }
}