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
import CircularProgress from '@material-ui/core/CircularProgress';

import "./Menubar.css";
import FileUploader from '../fileUploader/fileUploader';
import FileDownloader from '../fileDownloader/fileDownloader';


export default class Menubar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            language: this.props.language,
            onLanguageChange: this.props.onLanguageChange,
            onSwitchChange: this.props.onSwitchChange,
            onRun: this.props.onRun,
            onSave: this.props.onSave,
            dropDownLanguages: {
                "CPP_14": "C++",
                "C": "C",
                "JAVA": "Java",
                "PYTHON_3": "Python 3",
                "GO_LANG": "Go",
                "C_SHARP": "C#",
                "RUBY": "Ruby",
                "RUST": "Rust",
                "PYTHON_2_7": "Python 2.7",
                "KOTLIN": "Kotlin",
                "NODE_JS": "Javascript"
            }
        }
    }

    onRun = () => {
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

    onSnackbarCloseClick = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.props.toggleSnackbar(false);
    }

    onSaveClick = () => {
        this.state.onSave();
    }

    onAutoCompleteChange = (event) => {
        this.props.toggleAutocomplete(event.target.checked);
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
                            horizontal: 'right',
                        }}
                        open={this.props.snackbar}
                        onClose={this.onSnackbarCloseClick}
                        message={this.props.snackbarText}
                        autoHideDuration={this.props.snackbarTimeout}
                        action={
                            <React.Fragment>
                                {
                                    this.props.showSpinner ?
                                        (
                                            <CircularProgress id='snackbar-spinner' size={20} color="secondary" />
                                        )
                                        : null
                                }
                                <IconButton size="small" aria-label="close" color="inherit" onClick={this.onSnackbarCloseClick}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" >
                        <Nav.Item>
                            <Button id='extra-btn' variant="outlined" color="secondary" onClick={this.onSaveClick} >
                                <div id='extra-btn-text'>Save</div>
                            </Button>
                        </Nav.Item>
                        <Nav.Item>
                            <Button id='extra-btn' variant="outlined" color="secondary" onClick={this.toggleDialog} >
                                <div id='extra-btn-text'>Options</div>
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
                                    <div id="dialog-ele" >
                                        <FormControlLabel
                                            value="end"
                                            control={< Switch id="drop-down" checked={this.props.autoComplete} onChange={this.onAutoCompleteChange} />}
                                            label="Code Autocomplete"
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
                                            {
                                                Object.keys(this.state.dropDownLanguages).map(key => (
                                                    <MenuItem value={key}> <b>{this.state.dropDownLanguages[key]}</b></MenuItem >
                                                ))
                                            }
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
                        <Nav.Item>
                            <FileUploader
                                id='extra-btn'
                                btnTextId='extra-btn-text'
                                title='Upload'
                                handleFileContents={this.props.onEditorValueChange}
                            />
                        </Nav.Item>
                        <Nav.Item>
                            <FileDownloader
                                id='extra-btn'
                                btnTextId='extra-btn-text'
                                title='Download'
                                fileName={this.props.getFileName()}
                                editorValue={this.props.editorValue}
                            />
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}