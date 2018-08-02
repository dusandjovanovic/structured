import * as _ from "underscore";

function randomData(previous, width, height) {
    var oldNodes = previous;
    // generate some data randomly
    let nodes = _.chain(_.range(10))
        .map(function() {
            var node = {};
            node.key = _.random(0, 30);
            return node;
        }).uniq(function(node) {
            return node.key;
        }).value();

    if (oldNodes) {
        var add = _.initial(oldNodes, _.random(0, oldNodes.length));
        add = _.rest(add, _.random(0, add.length));

        nodes = _.chain(nodes)
            .union(add).uniq(function(node) {
                return node.key;
            }).value();
    }

    let links = _.chain(_.range(12))
        .map(function() {
            var link = {};
            link.source = _.random(0, nodes.length - 1);
            link.target = _.random(0, nodes.length - 1);
            link.key = link.source + ',' + link.target;
            return link;
        }).uniq((link) => link.key)
        .value();

    maintainNodePositions(oldNodes, nodes, width, height);

    return {nodes, links};
}

function maintainNodePositions(oldNodes, nodes, width, height) {
    var kv = {};
    _.each(oldNodes, function(d) {
        kv[d.key] = d;
    });
    _.each(nodes, function(d) {
        if (kv[d.key]) {
            // if the node already exists, maintain current position
            d.x = kv[d.key].x;
            d.y = kv[d.key].y;
        } else {
            // else assign it a random position near the center
            d.x = width / 2 + _.random(-150, 150);
            d.y = height / 2 + _.random(-25, 25);
        }
    });
}

export default randomData;