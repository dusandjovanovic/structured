import React from "react";
import PropTypes from "prop-types";

const withDraggable = WrappedComponent => {
    class WithDraggable extends React.Component {
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

        handleMouseDown = event => {
            event.stopPropagation();
            const { clientX, clientY } = event;
            window.addEventListener("mousemove", this.handleMouseMove);
            window.addEventListener("mouseup", this.handleMouseUp);
            if (this.props.onDragStart) this.props.onDragStart();

            this.setState(() => ({
                originalX: clientX,
                originalY: clientY,
                dragging: true
            }));
        };

        handleMouseMove = event => {
            const { clientX, clientY } = event;
            if (!this.state.dragging) return;
            this.setState(
                prevState => ({
                    translateX:
                        clientX -
                        prevState.originalX +
                        prevState.lastTranslateX,
                    translateY:
                        clientY - prevState.originalY + prevState.lastTranslateY
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
            if (!this.state.dragging && this.props.onDrag) this.props.onDrag();
        };

        handleMouseUp = () => {
            window.removeEventListener("mousemove", this.handleMouseMove);
            window.removeEventListener("mouseup", this.handleMouseUp);

            this.setState(
                () => ({
                    originalX: 0,
                    originalY: 0,
                    lastTranslateX: this.state.translateX,
                    lastTranslateY: this.state.translateY,
                    dragging: false
                }),
                () => {
                    if (this.props.onDragEnd) this.props.onDragEnd();
                }
            );
        };

        render() {
            return (
                <WrappedComponent
                    translateX={this.state.translateX}
                    translateY={this.state.translateY}
                    onMouseDown={event => this.handleMouseDown(event)}
                    dragging={this.state.dragging}
                    {...this.props}
                />
            );
        }
    }

    WithDraggable.propTypes = {
        onDrag: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func
    };

    return WithDraggable;
};

export default withDraggable;
