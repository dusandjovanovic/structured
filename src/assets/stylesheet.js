export const primaryColor = "#40778c";
export const warningColor = "#de6f33";
export const dangerColor = "#f55a4e";
export const successColor = "#5cb860";
export const infoColor = "#33d1d6";

export const graphColors = {
	node: {
		fill: "#a5a5a5",
		stroke: "#d1d1d1",
		text: "#282c34"
	},
	adjacent: {
		fill: "#d6db59",
		stroke: "#faffc5",
		text: "#5a5e27"
	},
	clicked: {
		fill: "#bf00ff",
		stroke: "#e6b8ff",
		text: "#ea00ff"
	},
	visited: {
		fill: "#5c585e",
		stroke: "#858284",
		text: "#5c585e"
	},
	focused: {
		fill: "#4cbadb",
		stroke: "#bfeeff",
		text: "#005a94"
	},
	selected: {
		fill: "#4cbadb",
		stroke: "#bfeeff",
		text: "#005a94"
	},
	edge: {
		stroke: "#cccccc"
	}
};

export const drawerWidth = 260;

export const horizontalDivider = theme => ({
	divider: {
		width: "100%",
		margin: theme.spacing(2, 0.25)
	}
});

export const transition = {
	transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

export const cardShadow = {
	boxShadow:
		"0 4px 3px -8px rgba(0, 0, 0, 0.22), 0 4px 6px 0px rgba(0, 0, 0, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.1)"
};

export const cardShadowHover = {
	"&:hover": {
		boxShadow:
			"0 6px 6px -6px rgba(0, 0, 0, 0.32), 0 4px 7px 4px rgba(0, 0, 0, 0.12), 0 4px 7px -2px rgba(0, 0, 0, 0.1)"
	}
};

export const boxShadow = {
	boxShadow:
		"0 8px 10px -12px rgba(0, 0, 0, 0.42), 0 4px 12px 0px rgba(0, 0, 0, 0.12), 0 8px 8px -5px rgba(0, 0, 0, 0.2)"
};

export const shallowShadow = {
	boxShadow:
		"0 5px 10px -6px rgba(0, 0, 0, 0.1), 0 4px 5px 0px rgba(0, 0, 0, 0.1), 0 4px 5px -2px rgba(0, 0, 0, 0.1)"
};

export const shallowShadowHover = {
	"&:hover": {
		boxShadow:
			"0 5px 12px -6px rgba(0, 0, 0, 0.2), 0 6px 5px 0px rgba(0, 0, 0, 0.12), 0 6px 5px -2px rgba(0, 0, 0, 0.12)"
	}
};

export const primaryBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(188, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(188, 188, 212, 0.2)"
};

export const primaryBoxShadowHover = {
	"&:hover": {
		boxShadow:
			"0 16px 24px -10px rgba(188, 188, 212, 0.33), 0 6px 22px 0px rgba(0, 0, 0, 0.33), 0 9px 10px -5px rgba(188, 188, 212, 0.33)"
	}
};

export const darkBoxShadow = {
	boxShadow:
		"0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
};

export const whiteBoxShadow = {
	boxShadow:
		"0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
};

export const infoBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(0, 188, 212, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2)"
};

export const successBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
};

export const warningBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)"
};

export const dangerBoxShadow = {
	boxShadow:
		"0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)"
};

export const transitionBoxShadow = {
	transition:
		"box-shadow 500ms linear, transform 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955)"
};

export const transitionOpacity = {
	transition:
		"opacity 500ms linear, transform 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955)"
};

export const transitionTransform = {
	transition: "transform 500ms cubic-bezier(0.455, 0.03, 0.515, 0.955)"
};

export const container = {
	paddingRight: "1rem",
	paddingLeft: "1rem",
	marginRight: "auto",
	marginLeft: "auto"
};
