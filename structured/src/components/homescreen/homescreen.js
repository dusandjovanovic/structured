import React, {Component} from 'react';
import neuralNet from '../../utils/neuralNet';

class Homescreen extends Component {
    componentDidMount() {
        neuralNet(this.intro.current);
    }

    constructor(props) {
        super(props);
        this.intro = React.createRef();
    }

    render () {
        return (
            <canvas style={{margin: '-72px 0px'}} ref={this.intro}></canvas>
        );
    }
};

export default Homescreen;