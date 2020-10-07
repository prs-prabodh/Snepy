import React, { Fragment } from 'react';
import Menubar from './Menubar/Menubar';
import Editor from './Editor/Editor';
import IO from './io/io';

export default class Parent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputView: true,
            editorHeight: '60vh',
            inputValue: '',
            outputValue: '',
            language: 'CPP_14',
            runButtonDisabled: false,
            runButtonText: 'RUN',
            editorValue: '#include<bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout<<"Hello, Snipper!"<<endl;\n\treturn 0;\n}',
            availModes: {
                "CPP_14": "c_cpp",
                "JAVA": "java",
                "C": "c_cpp",
            }
        }
    }

    toggleButtonDisable = () => {
        this.setState({ ...this.state, runButtonDisabled: !this.state.runButtonDisabled, runButtonText: this.state.runButtonText === 'RUN' ? 'RUNNING' : 'RUN' });
    }

    execute = () => {
        this.toggleButtonDisable();
        let request = {
            script: this.state.editorValue,
            language: this.state.language,
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(request),
        }
        fetch("https://polar-garden-96772.herokuapp.com/snippet/execute", options)
            .then(res => res.json())
            .then(res => {
                console.log("actual data: ", res);
                this.setState({ ...this.state, outputValue: res.data.output });
                console.log(this.state);
                this.toggleButtonDisable();
                this.onSwitchChange(true);
            })
            .catch(err => {
                this.toggleButtonDisable()
                console.log("err: ", err);
            })
    }

    onRun = () => {
        console.log("Execute");
        this.execute();
    }

    onEditorChange = (value) => {
        this.setState({ ...this.state, editorValue: value });
        console.log("Code changed: ", this.state);
    }

    onLanguageChange = (event) => {
        this.setState({ ...this.state, language: event.target.value });
        console.log("Language changed: ", this.state);
    }

    onInputChange = (value) => {
        this.setState({ ...this.state, inputValue: value });
        console.log("Input changed: ", this.state);
    }

    onSwitchChange = (value) => {
        this.setState({ ...this.state, inputView: value, editorHeight: this.getEditorHeight(value) });
        console.log("Input view switched: ", this.state);
    }

    getEditorHeight = (inputView) => {
        return inputView ? '60vh' : '90vh';
    }

    render() {
        return (
            <Fragment>
                <Menubar language={this.state.language} onRun={this.onRun} onLanguageChange={this.onLanguageChange} onSwitchChange={this.onSwitchChange} runButtonDisabled={this.state.runButtonDisabled} runButtonText={this.state.runButtonText} />
                <Editor onEditorValueChange={this.onEditorChange} value={this.state.editorValue} height={this.state.editorHeight} language={this.state.language} availModes={this.state.availModes} />
                {
                    this.state.inputView ?
                        (
                            <IO onInputChange={this.onInputChange} inputValue={this.state.inputValue} outputValue={this.state.outputValue} />
                        )
                        : null
                }
            </Fragment>
        )
    }
}