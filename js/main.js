var nodeRadius = 10;

var paperWidth = $("#top_background").width() - nodeRadius;
var paperHeight = $("#top_background").height() - nodeRadius;

var nodeAreaWidth = 100;
var nodeAreaHeight = 100;
var nodesCount = Math.floor((paperWidth / nodeAreaWidth) * (paperHeight / nodeAreaHeight));
var paper = Raphael("top_background", $("#top_background").width(), $("#top_background").height());

var nodes = [];

for (var i = 0; i < nodesCount; i++) {
  var newX = getRandomInt(nodeRadius, paperWidth);
  var newY = getRandomInt(nodeRadius, paperHeight);

  var circle = paper.circle(newX, newY, 5, 5);
  circle.attr("fill", "#05f");
  circle.attr("stroke", "#fff");
  circle.attr("stroke-width", 1);
  circle.attr("cursor", "pointer");
  nodes.push(circle);
}

console.log(nodes);
var pathString = "";
for (var i = 0; i < nodes.length; i++) {

  if (i == 0) {
    pathString += "M " + nodes[i].attr("cx") + " " + nodes[i].attr("cy") + " ";
  } else {
    pathString += "L " + nodes[i].attr("cx") + " " + nodes[i].attr("cy") + " ";
  }

  if (i == nodes.length - 1) {
    pathString += "Z";
  }

  var path = paper.path(pathString);
  path.attr("stroke", "#fff");
  path.attr("stroke-width", 0.5);
}

console.log(pathString);


