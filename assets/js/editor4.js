function starteditor(){
  /*var nodes = [ { name: "Statistics Midterm"    }, { name: "Probability" },
          { name: "Sampling"    }, { name: "Interval Estimation"   },
          { name: "Exponential Probability"   }, { name: "Joint Probability"    },
          { name: "Point Estimation" }, { name: "p bar"   },
          { name: "σ known"   }, { name: "σ unknown"    } ];

  var edges = [  { source : 0  , target: 1 } , { source : 0  , target: 2 } ,
           { source : 0  , target: 3 } , { source : 1  , target: 4 } ,
           { source : 1  , target: 5 } , { source : 2  , target: 6 },
           { source : 2  , target: 7 } , { source : 3  , target: 8 } ,
           { source : 3  , target: 9 } ];*/

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
      //.nodes(nodes)
      //.links(edges)
      .size([width,height])
      .linkDistance(100)
      .gravity(.127)
      .charge(-3000)
      .on("tick", tick);
	  
	  
  /*var nodes = force.nodes(),
      links = force.links(),*/
    var node = vis.selectAll(".node"),
		link = vis.selectAll(".link");
	  
  d3.json("graph1.json", function(error, graph) {//the function d3.json() is asynchronous
	  if (error) throw error;
	  
		force.nodes(graph1.nodes)
			.links(graph.links)
			.start();
		   
		link = link.data(graph1.links)
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
				
		node = node.data(graph1.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .call(force.drag);
	});

  // add keyboard callback
  /*d3.select(window)
    .on("keydown", keydown);*/

  force.start();

  var color = d3.scale.category20();


  var svg_nodes =  node.append("circle")
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


  var svg_texts = node.append("text")
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

      vis.selectAll("#Statistics Midterm")
         .attr("r",25)
         .style("animation","mainIdea 5s infinite ease-in-out");


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

  $('button').click(function(){
      var input = $('input').value;
      console.log($('input').value);
    })

}
