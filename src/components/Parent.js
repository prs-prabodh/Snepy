import React, { Fragment } from 'react';
import Menubar from './Menubar/Menubar';
import Editor from './Editor/Editor';
import IO from './io/io';

export default class Parent extends React.Component {

    BACKEND_URL = 'https://polar-garden-96772.herokuapp.com/';

    componentDidMount() {
        this.getEditorValue();
    }

    constructor(props) {
        super(props);
        this.state = {
            inputView: true,
            editorHeight: '60vh',
            inputValue: '',
            outputValue: '',
            language: 'CPP_14',
            runButtonDisabled: false,
            snackbar: false,
            snackbarText: '',
            snackbarTimeout: 1000,
            autoComplete: false,
            editorValue: '#include<bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout<<"Hello, Snipper!"<<endl;\n\treturn 0;\n}',
            editorSnippets: {
                "CPP_14": '#include<bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\tcout<<"Hello, Snipper!"<<endl;\n\treturn 0;\n}',
                "C": "#include <stdio.h>\nint main() {\n    printf(\"Hello World!\");\n}\n",
                "JAVA": "public class Main {\n    public static void main(String args[]) {\n        System.out.println(\"Hello World!\");\n    }\n}",
                'PYTHON_3': 'print("Hello World!")',
                'GO_LANG': 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello World!")\n}\n',
                'C_SHARP': 'using System;\nnamespace HelloWorld\n{\n    class Hello\n    {\n        static void Main()\n        {\n            Console.WriteLine("Hello World!");\n        }\n    }\n}\n',
                'RUBY': 'puts "Hello World!";',
                'RUST': 'fn main() {\n  println!("Hello, world!");\n}\n',
                'PYTHON_2_7': 'print("Hello World!")',
                'KOTLIN': 'fun main(args: Array<String>) {\n  println("Hello World")\n}\n',
                'NODE_JS': 'console.log("Hello World");'
            },
            availModes: {
                "CPP_14": "c_cpp",
                "JAVA": "java",
                "C": "c_cpp",
                "PYTHON_3": "python",
                "GO_LANG": "golang",
                "C_SHARP": "csharp",
                "RUBY": "ruby",
                "RUST": "rust",
                "PYTHON_2_7": "python",
                "KOTLIN": "kotlin",
                "NODE_JS": "javascript"
            },
            fileExtensions: {
                "CPP_14": "cpp",
                "JAVA": "java",
                "C": "c",
                "PYTHON_3": "py",
                "GO_LANG": "go",
                "C_SHARP": "cs",
                "RUBY": "rb",
                "RUST": "rs",
                "PYTHON_2_7": "py",
                "KOTLIN": "kt",
                "NODE_JS": "js"
            }
        }
        this.runButtonDisabled = false;
        this.runButtonText = 'RUN';
    }

    toggleAutocomplete = (value) => {
        this.setState({ ...this.state, autoComplete: value });
    }

    getEditorValue = () => {
        if (this.props.match != null && this.props.match.params != null && this.props.match.params.snippetId != null) {
            this.getSnippet(this.props.match.params.snippetId);
        }
    }

    getSnippet = (snippetId) => {
        this.toggleButtonDisable(true);
        this.toggleSnackbar(true, "Fetching...");
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
        fetch(this.BACKEND_URL + "snippet/" + snippetId, options)
            .then(res => res.json())
            .then(res => {
                this.setState({ ...this.state, editorValue: res.data.snippet, language: res.data.language });
                this.toggleButtonDisable(false);
                this.onSwitchChange(true);
                this.toggleSnackbar(false);
            })
            .catch(err => {
                this.toggleButtonDisable(false)
                this.toggleSnackbar(false);
                this.toggleSnackbar(true, "Error 404! Snippet not found.", 8000, false);
                console.log("err: ", err);
            })
    }

    toggleButtonDisable = (value) => {
        this.runButtonDisabled = value;
        this.runButtonText = (value ? 'RUNNING' : 'RUN');
    }

    toggleSnackbar = (showSnackbar, snackbarText, timeout = 10000000, showSpinner = true) => {
        if (this.state == null) {
            return;
        }
        this.setState({ ...this.state, snackbar: showSnackbar, snackbarText: snackbarText, snackbarTimeout: timeout, showSpinner: showSpinner });
    }

    execute = () => {
        this.toggleButtonDisable(true);
        this.toggleSnackbar(true, "Running...");
        let request = {
            script: this.state.editorValue,
            language: this.state.language,
            stdin: this.state.inputValue,
        }
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(request),
        }
        fetch(this.BACKEND_URL + "snippet/execute", options)
            .then(res => res.json())
            .then(res => {
                this.setState({ ...this.state, outputValue: res.data.output });
                this.toggleButtonDisable(false);
                this.onSwitchChange(true);
                this.toggleSnackbar(false);
            })
            .catch(err => {
                this.toggleButtonDisable(false)
                this.toggleSnackbar(false);
                this.toggleSnackbar(true, "Unexpected error happened. Please try after some time.", 8000, false);
                console.log("err: ", err);
            })
    }

    onRun = () => {
        this.execute();
    }

    onEditorChange = (value) => {
        this.setState({ ...this.state, editorValue: value });
    }

    onLanguageChange = (event) => {
        this.setState({ ...this.state, language: event.target.value, editorValue: this.state.editorSnippets[event.target.value] });
    }

    onInputChange = (value) => {
        this.setState({ ...this.state, inputValue: value });
    }

    onSwitchChange = (value) => {
        this.setState({ ...this.state, inputView: value, editorHeight: this.getEditorHeight(value) });
    }

    getEditorHeight = (inputView) => {
        return inputView ? '60vh' : '90vh';
    }

    onSave = () => {
        this.toggleButtonDisable(true);
        this.toggleSnackbar(true, "Saving...");
        let request = {
            snippet: this.state.editorValue,
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
        fetch(this.BACKEND_URL + "snippet/save", options)
            .then(res => res.json())
            .then(res => {
                this.toggleButtonDisable(false);
                this.onSwitchChange(true);
                this.toggleSnackbar(false);
                this.toggleSnackbar(true, "Share by copying URL from address bar", 5000, false)
                let snippetId = res.data.uid;
                this.props.history.push('/s/' + snippetId);
            })
            .catch(err => {
                this.toggleButtonDisable(false)
                this.toggleSnackbar(false);
                this.toggleSnackbar(true, "Unexpected error happened. Please try after some time.", 8000, false);
                console.log("err: ", err);
            })
    }

    getFileExtension = () => {
        return this.state.fileExtensions[this.state.language];
    }

    getFileName = () => {
        let dateUtil = new Date()
        let fileName = 'snepy_' + dateUtil.toISOString() + '.' + this.getFileExtension();
        return fileName.replaceAll(' ', '.');
    }

    copyToClipboard = (event) => {
        navigator.clipboard.writeText(event.currentTarget.name === 'input' ? this.state.inputValue : this.state.outputValue);
    }

    render() {
        return (
            <Fragment>
                <Menubar
                    language={this.state.language}
                    onRun={this.onRun}
                    onLanguageChange={this.onLanguageChange}
                    onSwitchChange={this.onSwitchChange}
                    runButtonDisabled={this.runButtonDisabled}
                    runButtonText={this.runButtonText}
                    checked={this.state.inputView}
                    onSave={this.onSave}
                    snackbar={this.state.snackbar}
                    snackbarText={this.state.snackbarText}
                    snackbarTimeout={this.state.snackbarTimeout}
                    showSpinner={this.state.showSpinner}
                    toggleSnackbar={this.toggleSnackbar}
                    onEditorValueChange={this.onEditorChange}
                    getFileName={this.getFileName}
                    editorValue={this.state.editorValue}
                    toggleAutocomplete={this.toggleAutocomplete}
                    autoComplete={this.state.autoComplete}
                />
                <Editor
                    onEditorValueChange={this.onEditorChange}
                    value={this.state.editorValue}
                    height={this.state.editorHeight}
                    language={this.state.language}
                    availModes={this.state.availModes}
                    autoComplete={this.state.autoComplete}
                />
                {
                    this.state.inputView ?
                        (
                            <IO
                                onInputChange={this.onInputChange}
                                inputValue={this.state.inputValue}
                                outputValue={this.state.outputValue}
                                copyToClipboard={this.copyToClipboard}
                            />
                        )
                        : null
                }
            </Fragment>
        )
    }
}