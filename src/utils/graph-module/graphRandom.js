import { chain, random, range } from "lodash";

function randomData() {
	let nodes = chain(range(15))
		.map(function() {
			var node = {};
			node.key = random(0, 20);
			return node;
		})
		.uniq(function(node) {
			return node.key;
		})
		.value();

	let edges = chain(range(30))
		.map(function() {
			let link = {
				source: { key: null },
				target: { key: null },
				key: null
			};
			link.source.key = random(0, 20);
			link.target.key = random(0, 20);
			while (link.target.key === link.source.key)
				link.target.key = random(0, 20);
			link.key = link.source.key + "->" + link.target.key;
			return link;
		})
		.uniq(link => link.key)
		.value();

	return { nodes, edges };
}

export default randomData;
