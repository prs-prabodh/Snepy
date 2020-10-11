import React from "react";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveSharpIcon from '@material-ui/icons/SaveSharp';

export default class FileDownloader extends React.Component {

    handleSaveToPC = (fileData) => {
        const blob = new Blob([fileData], { type: "text/plain" });
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