function starteditor(){
  var nodes = [ { name: "Ambient intelligence"    }, { name: "User Groups" },
          { name: "Methodology Developement stages"    }, { name: "Intervention Levels"   },
          { name: "elderly persons"   }, { name: "dementia people"    },{ name: "smart home" }, { name: "health care systems"   },
          { name: "requirements elicitation" }, { name: "study the symptom"   },{ name: "prototype implementation" }, { name: "prototype evalution"   },{ name: "scenario refining and initial evalution"   },
          { name: "inviting awareness"   }, { name: "suggesting"    },{ name: "urging" }, { name: "prompting"   }, { name: "performing"   }]

  var edges = [  { source : 0  , target: 1 } , { source : 0  , target: 2 } ,
           { source : 0  , target: 3 } , { source : 1  , target: 4 } ,
           { source : 1  , target: 5 } , { source : 1  , target: 6 },
           { source : 1  , target: 7 } , { source : 2  , target: 8 } ,
           { source : 2  , target: 9 } , { source : 2  , target: 10 } , 
           { source : 2  , target: 11 } , { source : 2  , target: 12 } , 
           { source : 3  , target: 13 } , { source : 3  , target: 14 } ,
           { source : 3  , target: 15 } , { source : 3  , target: 16 } ,
           { source : 3  , target: 17 }];

  var width = 1300;
  var height = 638;

  // mouse event vars
var selected_node = null,
    selected_link = null,
    mousedown_link = null,
    mousedown_node = null,
    mouseup_node = null;

  var svg = d3.select("body")
        .append("svg:svg")
        .attr("width",width)
        .attr("height",height);

  var vis = svg.append("svg:g")
        .call(d3.behavior.zoom().on("zoom", redraw))
        .on("dblclick.zoom", null)
        .append("svg:g");
        //.on("mousemove", mousemove)
        //.on("mousedown", mousedown)
        //.on("mouseup", mouseup);

  var force = d3.layout.force()
      .nodes(nodes)
      .links(edges)
      .size([width,height])
      .linkDistance(60)
      .gravity(.127)
      .charge(-3500)
      .on("tick", tick);

  /*var drag_line = vis.append("line")
      .attr("class", "drag_line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0);*/

  // add keyboard callback
  /*d3.select(window)
    .on("keydown", keydown);*/

  force.start();

  var svg_edges = vis.selectAll("line")
            .data(edges)
            .enter()
            .append("g")
            .attr("class", "link")
            .append("line")
            .style("stroke","#374973")
            .style("stroke-width",2)
            .on("mouseover", function() {
                d3.select(this)
                .style("stroke-opacity", "0.3");})
            .on("mouseout", function() {
                d3.select(this)
                .style("stroke-opacity", "1")});

  var color = d3.scale.category20();


  var nodes_all = vis.selectAll("g.node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(force.drag);

  var svg_nodes =  nodes_all.append("circle")
            .attr("r",17)
            .attr("id",function(d){
              return d.name;
            })
            .style("fill","#374973")
            .call(force.drag)
            .on("mouseover", function() {
                d3.select(this)
                .style("fill", "#0babea");})
            .on("mouseout", function() {
                d3.select(this)
                .style("fill", "#374973")});


  var svg_texts = nodes_all.append("text")
            .style("fill", "#374973")
            .style("font-family","Open Sans Condensed")
            .style("letter-spacing","2px")
            .style("opacity",".7")
            .attr("dx", 30)
            .attr("dy", 18)
            .text(function(d){
              return d.name;
            })
            .on("mouseover", function() {
                d3.select(this)
                .style("opacity","1")
                .style("font-size","1.4rem")})
            .on("mouseout", function() {
                d3.select(this)
                .style("opacity",".7")
                .style("font-size","1rem")});

      vis.selectAll("#Ambient intelligence")
         .attr("r",25)
         .style("animation","mainIdea 5s infinite ease-in-out");


  var nodes = force.nodes(),
      links = force.links(),
      node = vis.selectAll(".node"),
      link = vis.selectAll(".link");

  // mouse event vars
  var selected_node = null,
      selected_link = null,
      mousedown_link = null,
      mousedown_node = null,
      mouseup_node = null;

  function resetMouseVars() {
      mousedown_node = null;
      mouseup_node = null;
      mousedown_link = null;
    }

  function tick(){
     svg_edges.attr("x1",function(d){ return d.source.x; })
        .attr("y1",function(d){ return d.source.y; })
        .attr("x2",function(d){ return d.target.x; })
        .attr("y2",function(d){ return d.target.y; });

     svg_nodes.attr("cx",function(d){ return d.x; })
        .attr("cy",function(d){ return d.y; });

     svg_texts.attr("x", function(d){ return d.x; })
      .attr("y", function(d){ return d.y; });
  }

  function redraw(){
    trans=d3.event.translate;
    scale=d3.event.scale;

    vis.attr("transform",
    "translate(" + trans + ")"
    + " scale(" + scale + ")");
    }

  /*function mousedown() {
    if (!mousedown_node && !mousedown_link) {
      vis.call(d3.behavior.zoom().on("zoom"), redraw);
      return;
    }
  }

  function mousemove() {
  if (!mousedown_node) return;

  // update drag line
  drag_line
      .attr("x1", mousedown_node.x)
      .attr("y1", mousedown_node.y)
      .attr("x2", d3.svg.mouse(this)[0])
      .attr("y2", d3.svg.mouse(this)[1]);

  }

  function mouseup() {
  if (mousedown_node) {
    // hide drag line
    drag_line
      .attr("class", "drag_line_hidden")

    if (!mouseup_node) {
      // add node
      var point = d3.mouse(this),
        node = {x: point[0], y: point[1]},
        n = nodes.push(node);

      // select new node
      selected_node = node;
      selected_link = null;

      // add link to mousedown node
      links.push({source: mousedown_node, target: node});
    }

    restart();
  }
  // clear mouse event vars
  resetMouseVars();
}

  function restart(){
        link = link.data(links);
        link.enter().append("g")
        .attr("class", "link")
        .append("line")
        .style("stroke","#374973")
        .style("stroke-width",2)
        .on("mouseover", function() {
            d3.select(this)
            .style("stroke-opacity", "0.3");})
        .on("mouseout", function() {
            d3.select(this)
            .style("stroke-opacity", "1")})
        .on("mousedown",function(d){
                  mousedown_link = d;
                  if (mousedown_link == selected_link) selected_link = null;
                  else selected_link = mousedown_link;
                  selected_node = null;
                  restart();
            });
        link.exit().remove();
        link.classed("link_selected", function(d) { return d === selected_link; });

        node = node.data(nodes);

        node.enter().append("g")
            .attr("class", "node")
            .call(force.drag)
            .append("circle")
            .attr("r",17)
            .attr("id",function(d){
              return d.name;
            })
            .style("fill","#374973")
            .call(force.drag)
            .on("mouseover", function() {
                d3.select(this)
                .style("fill", "#fd79ab");})
            .on("mouseout", function() {
                d3.select(this)
                .style("fill", "#374973")})
            .on("mousedown",
            function(d) {
              // disable zoom
              vis.call(d3.behavior.zoom().on("zoom"), null);

              mousedown_node = d;
              if (mousedown_node == selected_node) selected_node = null;
              else selected_node = mousedown_node;
              selected_link = null;

              // reposition drag line
              drag_line
                  .attr("class", "link")
                  .attr("x1", mousedown_node.x)
                  .attr("y1", mousedown_node.y)
                  .attr("x2", mousedown_node.x)
                  .attr("y2", mousedown_node.y);

              restart();
            })
          .on("mousedrag",
            function(d) {
              // redraw();
            })
          .on("mouseup",
            function(d) {
              if (mousedown_node) {
                mouseup_node = d;
                if (mouseup_node == mousedown_node) { resetMouseVars(); return; }

                // add link
                var link = {source: mousedown_node, target: mouseup_node};
                links.push(link);

                // select new link
                selected_link = link;
                selected_node = null;

                // enable zoom
                vis.call(d3.behavior.zoom().on("zoom"), redraw);
                restart();
              }
            })
        .transition()
          .duration(750)
          .ease("elastic")
          .attr("r", 17);

      node.exit().transition()
          .attr("r", 0)
        .remove();

      node
        .classed("node_selected", function(d) { return d === selected_node; });



      if (d3.event) {
        // prevent browser's default behavior
        d3.event.preventDefault();
      }

      force.start();

  }

  function spliceLinksForNode(node) {
  toSplice = links.filter(
    function(l) {
      return (l.source === node) || (l.target === node); });
  toSplice.map(
    function(l) {
      links.splice(links.indexOf(l), 1); });
}

function keydown() {
  if (!selected_node && !selected_link) return;
  switch (d3.event.keyCode) {
    case 8: // backspace
    case 46: { // delete
      if (selected_node) {
        nodes.splice(nodes.indexOf(selected_node), 1);
        spliceLinksForNode(selected_node);
      }
      else if (selected_link) {
        links.splice(links.indexOf(selected_link), 1);
      }
      selected_link = null;
      selected_node = null;
      redraw();
      break;
    }
  }
}*/

  $('button').click(function(){
      var input = $('input').value;
      console.log($('input').value);
    })

}
