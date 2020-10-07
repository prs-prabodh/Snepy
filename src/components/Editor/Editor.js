import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

export default class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onEditorValueChange: this.props.onEditorValueChange,
            value: this.props.value,
            availModes: this.props.availModes,
        }
        console.log("change detected: ", this.state);
    }

    onEditorValueChange = (change) => {
        this.setState({ ...this.state.value, value: change });
        this.state.onEditorValueChange(change);
    }

    render() {
        return (
            <AceEditor
                width={'100%'}
                height={this.props.height}

                placeholder="Placeholder Text"
                mode={this.state.availModes[this.props.language]}
                theme="dracula"
                name="editor"
                onLoad={this.onLoad}
                onChange={this.onEditorValueChange}
                fontSize={14}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.value}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4,
                }} />
        );
    }
}