import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

export default class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onEditorValueChange: this.props.onEditorValueChange,
            availModes: this.props.availModes,
        }
    }

    onEditorValueChange = (change) => {
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
                value={this.props.value}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: this.props.autoComplete,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4,
                }} />
        );
    }
}