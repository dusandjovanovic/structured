import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Dropdown extends React.Component {
	state = {
		open: false
	};

	handleClick = () => {
		this.setState(state => ({ open: !state.open }));
		if (this.props.action) this.props.action();
	};

	handleClose = param => {
		this.setState({ open: false });
		if (param && param.action) {
			param.action();
		}
	};

	handleCloseAway = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		let icon = (
			<this.props.buttonIcon
				fontSize="default"
				className={classes.buttonIcon}
			/>
		);

		return (
			<div>
				<Button
					aria-label="dropdown"
					aria-owns={this.state.open ? "menu-list" : null}
					aria-haspopup="true"
					buttonRef={node => {
						this.anchorEl = node;
					}}
					onClick={this.handleClick}
					className={classes.buttonText}
				>
					{icon}
					{this.props.buttonText !== undefined
						? this.props.buttonText
						: null}
				</Button>
				<Popover
					open={this.state.open}
					anchorEl={this.anchorEl}
					transition
					className={
						!this.state.open
							? classes.popperClose
							: classes.popperResponsive
					}
				>
					{() => (
						<Paper className={classes.dropdown}>
							<ClickAwayListener
								onClickAway={this.handleCloseAway}
							>
								<MenuList
									role="menu"
									className={classes.menuList}
								>
									{this.props.dropdownHeader !== undefined ? (
										<MenuItem
											onClick={() =>
												this.handleClose(
													this.props.dropdownHeader
												)
											}
											className={classes.dropdownHeader}
										>
											<Typography
												variant="body2"
												color="textSecondary"
												className={classes.label}
											>
												{this.props.dropdownHeader}
											</Typography>
										</MenuItem>
									) : null}
									{this.props.dropdownList.map(
										(prop, key) => {
											return (
												<div key={key}>
													<Divider
														onClick={() =>
															this.handleClose(
																"divider"
															)
														}
														className={
															classes.dropdownDividerItem
														}
													/>
													<MenuItem
														onClick={() =>
															this.handleClose(
																prop
															)
														}
														className={
															classes.dropdownItem
														}
													>
														<Typography
															variant="body2"
															classes={{
																root:
																	classes.label
															}}
														>
															{prop.label}
														</Typography>
														{prop.additional ? (
															<Typography variant="subtitle2">
																{
																	prop.additional
																}
															</Typography>
														) : null}
													</MenuItem>
												</div>
											);
										}
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					)}
				</Popover>
			</div>
		);
	}
}

Dropdown.propTypes = {
	classes: PropTypes.object.isRequired,
	action: PropTypes.func,
	buttonIcon: PropTypes.object,
	buttonText: PropTypes.node,
	dropdownList: PropTypes.array,
	dropdownHeader: PropTypes.node
};

export default withStyles(styles)(Dropdown);
