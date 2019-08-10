import React from "react";
import PropTypes from "prop-types";

class Draggable extends React.Component {
    state = {
        dragging: false,
        originalX: 0,
        originalY: 0,
        translateX: 0,
        translateY: 0,
        lastTranslateX: 0,
        lastTranslateY: 0
    };

    componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleInit = (translateX, translateY) => {
        this.setState(() => ({
            originalX: 0,
            originalY: 0,
            lastTranslateX: translateX,
            lastTranslateY: translateY,
            translateX: translateX,
            translateY: translateY
        }));
    };

    handleMouseDown = ({ clientX, clientY }) => {
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
        if (this.props.onDragStart)
            this.props.onDragStart({
                translateX: this.state.lastTranslateX,
                translateY: this.state.lastTranslateY
            });

        this.setState(() => ({
            originalX: clientX,
            originalY: clientY,
            dragging: true
        }));
    };

    handleMouseMove = ({ clientX, clientY }) => {
        if (!this.state.dragging) return;

        this.setState(
            state => ({
                translateX:
                    clientX - state.originalX + state.lastTranslateX <
                    this.props.barrierLeft
                        ? this.props.barrierLeft
                        : clientX - state.originalX + state.lastTranslateX >
                          this.props.barrierRight
                        ? this.props.barrierRight
                        : clientX - state.originalX + state.lastTranslateX,
                translateY: clientY - state.originalY + state.lastTranslateY
            }),
            () => {
                if (this.props.onDrag) {
                    this.props.onDrag({
                        translateX: this.state.translateX,
                        translateY: this.state.translateY
                    });
                }
            }
        );
    };

    handleMouseUp = () => {
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);

        this.setState(
            state => ({
                originalX: 0,
                originalY: 0,
                lastTranslateX: state.translateX,
                lastTranslateY: state.translateY,
                dragging: false
            }),
            () => {
                if (this.props.onDragEnd) {
                    this.props.onDragEnd({
                        translateX: this.state.translateX,
                        translateY: this.state.translateY
                    });
                }
            }
        );
    };

    render() {
        return (
            <div onMouseDown={this.handleMouseDown}>{this.props.children}</div>
        );
    }
}

Draggable.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onDrag: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    barrierLeft: PropTypes.number.isRequired,
    barrierRight: PropTypes.number.isRequired
};

export default Draggable;
