"use strict";

var Networks = {};

/**
 * BASIC DEFAULTS
 */

Networks.width = 1600;
Networks.height = 900;
Networks.color = d3.scale.category20();
Networks.domName = "d3"; // Name of the DOM element enclosing the visualization




/**
 * SVG specific defaults
 */

// function to determine the width of lines (Override if necessary)
Networks.strokeWidth = function(width) {
  return Math.sqrt(width.value);
}

//function to determine the fill color of nodes (Override if necessary)
Networks.fillColor = function(c) {
  return Networks.color(c.group);
}

//determine the radius of circular nodes (WIP)
Networks.radius = 5;



/**
 * Force-layout specific configurations
 */

Networks.forceConfig = {
  charge: -120,
  linkDistance: 30
};

// Link the layout with the workspace
Networks.forceTick = function() {
  Networks.links
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  Networks.nodes
    .attr("cx", function(d) {
      return d.x;
    })
    .attr("cy", function(d) {
      return d.y;
    });
}

/**
 * Drawing Functions
 */

// initialize the workspace
Networks.initialize = function() {
  this.workspace = d3.select("#" + this.domName)
    .append("svg")
    .attr("width", Networks.width)
    .attr("height", Networks.height);
}

// clear the layout and the workspace
Networks.clear = function() {
  this.layout = {};
  this.workspace.selectAll("*").remove();
}

// Create the default force layout for the given graph
Networks.loadDefaultLayout = function(graph) {
  this.layout = d3.layout.force()
    .charge(this.forceConfig.charge)
    .linkDistance(this.forceConfig.linkDistance)
    .size([this.width, this.height]);

  this.layout
    .nodes(graph.nodes)
    .links(graph.links)
    .start();
}

// draw edges on svg
Networks.drawLinks = function(graph) {
  this.links = this.workspace.selectAll(".link")
    .data(graph.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", Networks.strokeWidth);
}

// draw nodes on svg
Networks.drawNodes = function(graph) {
  this.nodes = this.workspace.selectAll(".node")
    .data(graph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", this.radius)
    .style("fill", this.fillColor)
    .call(this.layout.drag);
}

// draw the given graph on svg
Networks.drawGraph = function(graph) {
  this.clear();
  this.loadDefaultLayout(graph);
  this.drawLinks(graph);
  this.drawNodes(graph);
  this.layout.on("tick", this.forceTick);
}
