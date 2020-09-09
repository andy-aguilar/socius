import React from 'react';
import Avatar from 'react-avatar-edit';


class AvatarEdit extends React.Component {

    constructor(props) {
        super(props)
        const src = ''
        this.state = {
            preview: null,
            src
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }

    onClose() {
        this.setState({preview: null})
        this.props.setSrc('')
    }

    onCrop(preview) {
        this.setState({preview})
        this.props.setSrc(preview)
    }

    onBeforeFileLoad(elem) {
        if(elem.target.files[0].size > 250680){
        alert("File is too big!");
        elem.target.value = "";
        };
    }

    render () {
        return (
        <div style={{backgroundColor: '#ffffffab'}}>
            <Avatar
            width={400}
            height={295}
            onCrop={this.onCrop}
            onClose={this.onClose}
            
            onBeforeFileLoad={this.onBeforeFileLoad}
            src={this.state.src}
            />
        </div>
        )
    }
}

export default AvatarEdit