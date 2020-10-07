import React from "react";
import AceEditor from "react-ace";

import { Navbar } from 'react-bootstrap'

import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/theme-dracula";

import Grid from '@material-ui/core/Grid';

import "./io.css"

class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.inputValue,
            onInputChange: this.props.onInputChange,
        }
    }

    onInputChange = (change) => {
        this.setState({ ...this.state, inputValue: change });
        this.state.onInputChange(change);
    }

    render() {
        return (
            <div className="input">
                <Navbar className="io-nav" expand="sm" variant="dark">
                    <Navbar.Brand>Input</Navbar.Brand>
                </Navbar>
                <AceEditor
                    width={'100%'}
                    height={'25vh'}

                    placeholder="Enter Input"
                    mode="plain_text"
                    theme="dracula"
                    name="input"
                    value={this.state.inputValue}
                    onLoad={this.onLoad}
                    onChange={this.onInputChange}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={false}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: false,
                        tabSize: 4,
                        highlightGutterLine: true,
                    }} />
            </div>
        );
    }
}

class Output extends React.Component {
    render() {
        return (
            <div className='output'>
                <Navbar className="io-nav" expand="sm" variant="dark">
                    <Navbar.Brand href="#">Output</Navbar.Brand>
                </Navbar>
                <AceEditor
                    width={'100%'}
                    height={'25vh'}

                    value={this.props.outputValue}
                    mode="plain_text"
                    theme="dracula"
                    name="output"
                    onLoad={this.onLoad}
                    onChange={this.props.onOutputChange}
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={false}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: false,
                        tabSize: 4,
                        highlightGutterLine: true,
                        readOnly: true,
                    }} />
            </div>
        );
    }
}

export default class IO extends React.Component {
    render() {
        return (
            <div>
                <Grid container direction="row">
                    <Grid item xs={6}>
                        <Input onInputChange={this.props.onInputChange} inputValue={this.props.inputValue} />
                    </Grid>
                    <Grid item xs={6}>
                        <Output outputValue={this.props.outputValue} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}