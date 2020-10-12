import React from "react";
import Button from '@material-ui/core/Button';

export default class FileUploader extends React.Component {

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    onButtonClick = () => {
        this.inputRef.current.click();
    }

    handleFileContents = (event) => {
        const contents = event.target.result;
        this.props.handleFileContents(contents);
    }

    handleFileChosen = (file) => {
        let reader = new FileReader();
        reader.onload = this.handleFileContents;
        reader.readAsText(file);
    };

    render() {
        return (
            <div>
                <input
                    hidden
                    type='file'
                    id='file'
                    className='input-file'
                    onChange={e => this.handleFileChosen(e.target.files[0])}
                    ref={this.inputRef}
                />
                <Button id={this.props.id} onClick={this.onButtonClick} variant="outlined" color="secondary" size={this.props.btnSize}>
                    <div id={this.props.btnTextId}>
                        {this.props.title}
                    </div>
                </Button>
            </div>
        );
    }
}