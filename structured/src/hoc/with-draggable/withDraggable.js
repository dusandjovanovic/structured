import React from "react";
import PropTypes from "prop-types";

const withDraggable = WrappedComponent => {
    return class extends React.Component {
        state = {
            dragging: false
        };

        componentWillUnmount() {
            window.removeEventListener("mousemove", this.handleMouseMove);
            window.removeEventListener("mouseup", this.handleMouseUp);
        }

        handleMouseDown = event => {
            event.stopPropagation();
            window.addEventListener("mousemove", this.handleMouseMove);
            window.addEventListener("mouseup", this.handleMouseUp);
            if (this.props.onDragStart) this.props.onDragStart();

            this.setState(() => ({
                dragging: true
            }));
        };

        handleMouseMove = () => {
            if (!this.state.dragging && this.props.onDrag) this.props.onDrag();
        };

        handleMouseUp = () => {
            window.removeEventListener("mousemove", this.handleMouseMove);
            window.removeEventListener("mouseup", this.handleMouseUp);

            this.setState(
                () => ({
                    dragging: false
                }),
                () => {
                    if (this.props.onDragEnd) this.props.onDragEnd();
                }
            );
        };

        render() {
            return (
                <div onMouseDown={event => this.handleMouseDown(event)}>
                    <WrappedComponent dragging={this.state.dragging} {...this.props} />
                </div>
            );
        }
    };
};

withDraggable.propTypes = {
    onDrag: PropTypes.func.isRequired,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func
};

export default withDraggable;
