'use strict';

function readSingleFile(evt) {
  //Retrieve the first (and only!) File from the FileList object
  var f = evt.target.files[0];
  var txt = "";
  var graph = null;

  if (f) {
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      txt += contents;
      document.getElementById("demo").innerHTML = txt ;
      graph = JSON.parse(txt);
      console.log(graph.nodes.length)
      var text = "No. of nodes = " + graph.nodes.length +"\n"+ "No. of edges = "+graph.edgess.length;

      if(graph != null){
        console.log("Drawing");
        var s = new sigma({
          graph: graph,
          container: 'sigma-container',
          settings: {
              defaultNodeColor: '#ec5148'
          }
        });
      }
    }
    r.readAsText(f);

  } else {
    txt +="Failed to load file";
    return;
  }

  //document.getElementById("demo").innerHTML = txt;

}

sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
      neighbors[k] = this.nodesIndex[k];

    return neighbors;
  });

sigma.parsers.json('/javascripts/datasets/triangle.json', {
    container: 'sigma-container',
    settings: {
        minNodeSize: 2,
        maxNodeSize: 5
    }
}, function(s) {
    s.startForceAtlas2();

      s.graph.nodes().forEach(function(n) {
        n.originalColor = n.color;
      });
      s.graph.edges().forEach(function(e) {
        e.originalColor = e.color;
      });


      s.bind('clickNode', function(e) {
        var nodeId = e.data.node.id,
            toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        s.graph.nodes().forEach(function(n) {
          if (toKeep[n.id])
            n.color = n.originalColor;
          else
            n.color = '#eee';
        });

        s.graph.edges().forEach(function(e) {
          if (toKeep[e.source] && toKeep[e.target])
            e.color = e.originalColor;
          else
            e.color = '#eee';
        });


        s.refresh();
      });

      s.bind('clickStage', function(e) {
        s.graph.nodes().forEach(function(n) {
          n.color = n.originalColor;
        });

        s.graph.edges().forEach(function(e) {
          e.color = e.originalColor;
        });

        s.refresh();
      });
});
