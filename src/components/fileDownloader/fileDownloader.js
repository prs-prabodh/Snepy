import React from "react";
import Button from '@material-ui/core/Button';

export default class FileDownloader extends React.Component {

    handleSaveToPC = () => {
        const blob = new Blob([this.props.editorValue], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = this.props.fileName;
        link.href = url;
        link.click();
    }

    render() {
        return (
            <div>
                <Button
                    id={this.props.id}
                    variant="outlined"
                    color="secondary"
                    onClick={this.handleSaveToPC}
                    size={this.props.size}
                >
                    <div id={this.props.btnTextId}>
                        {this.props.title}
                    </div>
                </Button>
            </div>
        );
    }
}