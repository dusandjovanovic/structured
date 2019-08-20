import React from "react";
import HeaderLink from "./header-link/headerLink";
import HeaderMenu from "./header-menu/headerMenu";
import Menu from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import withNavigation from "../../../hoc/with-navigation/withNavigation";

class Header extends React.Component {
	state = {
		mobile: false
	};

	componentDidMount() {
		if (this.props.changeColor)
			window.addEventListener("scroll", this.handleColorTransition);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.changeColor !== this.props.changeColor) {
			if (this.props.changeColor)
				window.addEventListener("scroll", this.handleColorTransition);
			else
				window.removeEventListener(
					"scroll",
					this.handleColorTransition
				);
		}
	}

	componentWillUnmount() {
		if (this.props.changeColor)
			window.removeEventListener("scroll", this.handleColorTransition);
	}

	handleDrawer = () => {
		this.setState({
			mobile: !this.state.mobile
		});
	};

	handleColorTransition = () => {
		const { classes, color, changeColor } = this.props;
		const windowsScrollTop = window.pageYOffset;
		if (windowsScrollTop > changeColor.height) {
			document.body
				.getElementsByTagName("header")[0]
				.classList.remove(classes[color]);
			document.body
				.getElementsByTagName("header")[0]
				.classList.add(classes[changeColor.color]);
		} else {
			document.body
				.getElementsByTagName("header")[0]
				.classList.add(classes[color]);
			document.body
				.getElementsByTagName("header")[0]
				.classList.remove(classes[changeColor.color]);
		}
	};

	render() {
		const { classes, links, fixed, absolute, color } = this.props;

		let appBarClasses = classes.appBar;
		appBarClasses += ` ${classes[color]}`;
		if (absolute) appBarClasses += ` ${classes.absolute}`;
		else if (fixed) appBarClasses += ` ${classes.fixed}`;

		return (
			<AppBar className={appBarClasses}>
				<Toolbar className={classes.container}>
					<div className={classes.flex}>
						<Hidden mdDown implementation="css">
							<Button className={classes.title}>
								structured
							</Button>
						</Hidden>
					</div>
					<Hidden smDown implementation="css">
						<ul className={classes.links}>
							{links.map(element => (
								<HeaderLink
									key={element.label}
									value={element.value}
									label={element.label}
									action={this.props.navigate}
									active={this.props.active === element.value}
									icon={element.icon}
								/>
							))}
						</ul>
					</Hidden>

					{this.props.authenticated ? <HeaderMenu /> : undefined}

					<Hidden mdUp implementation="css">
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={this.handleDrawer}
						>
							<Menu />
						</IconButton>
					</Hidden>

					<Hidden mdUp implementation="css">
						<Drawer
							variant="temporary"
							anchor={"right"}
							open={this.state.mobile}
							classes={{
								paper: classes.drawerPaper
							}}
							onClose={this.handleDrawer}
						>
							<div className={classes.appResponsive}>
								{links.map(element => (
									<HeaderLink
										key={element.label}
										value={element.value}
										label={element.label}
										action={this.props.navigate}
										active={
											this.props.active === element.value
										}
										icon={element.icon}
									/>
								))}
							</div>
						</Drawer>
					</Hidden>
				</Toolbar>
			</AppBar>
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	navigate: PropTypes.func.isRequired,
	active: PropTypes.string.isRequired,
	links: PropTypes.arrayOf(PropTypes.object).isRequired,
	heading: PropTypes.string.isRequired,
	fixed: PropTypes.bool,
	absolute: PropTypes.bool,
	color: PropTypes.oneOf(["primary", "transparent", "white", "dark"])
		.isRequired,
	changeColor: PropTypes.shape({
		height: PropTypes.number.isRequired,
		color: PropTypes.oneOf(["primary", "transparent", "white", "dark"])
			.isRequired
	}),
	menuAction: PropTypes.func
};

export default withStyles(styles)(withNavigation(Header));
