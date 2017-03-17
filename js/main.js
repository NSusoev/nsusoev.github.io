var nodeRadius = 10;

var paperWidth = $("#top_background").width() - nodeRadius;
var paperHeight = $("#top_background").height() - nodeRadius;

var nodeAreaWidth = 100;
var nodeAreaHeight = 100;
var nodesCount = Math.floor((paperWidth / nodeAreaWidth) * (paperHeight / nodeAreaHeight));
var paper = Raphael("top_background", $("#top_background").width(), $("#top_background").height());

var points = [];
var nodes = [];

for (var i = 0; i < nodesCount; i++) {
  var newX = getRandomInt(nodeRadius, paperWidth);
  var newY = getRandomInt(nodeRadius, paperHeight);
  points.push({newX: newX , newY: newY});
}

points.sort(function(a, b) {
  if (a.newX < b.newX) {
    return -1;
  } else {
    return 1;
  }

  return 0;
});

// draw
var pathString = "";
for (var i = 0; i < points.length; i++) {

  if (i == 0) {
    pathString += "M " + points[i].newX + " " + points[i].newY + " ";
  } else {
    pathString += "L " + points[i].newX + " " + points[i].newY + " ";
  }

  var path = paper.path(pathString);
  path.attr("stroke", "#fff");
  path.attr("stroke-width", 1);
}

for (var i = 0; i < points.length; i++) {
  var circle = paper.circle(points[i].newX, points[i].newY, 7, 7);
  circle.attr("fill", "#05f");
  circle.attr("stroke", "#fff");
  circle.attr("stroke-width", 2);
  nodes.push(circle);
}

var circle1 = paper.circle(points[0].newX, points[0].newY, 5, 5);
circle1.attr("fill", "red");
circle1.attr("stroke-width", 1);

var nextNodeIndex = 0;
var animated = false;
var reverseDirection = false;

setInterval(function() {
  if (circle1.attr("cx") != points[nextNodeIndex].newX && circle1.attr("cy") != points[nextNodeIndex].newY) {

  } else if (circle1.attr("cx") == points[nextNodeIndex].newX && circle1.attr("cy") == points[nextNodeIndex].newY) {
    if (reverseDirection) {
      nextNodeIndex--;
    } else {
      nextNodeIndex++;
    }

    circle1.animate({cx: points[nextNodeIndex].newX, cy: points[nextNodeIndex].newY}, 2000);

    if (nextNodeIndex == nodes.length - 1 || nextNodeIndex == 0) {
      reverseDirection = !reverseDirection;
    }
  }
});
