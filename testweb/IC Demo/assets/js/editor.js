function starteditor(){
  var nodes = [ { name: "Drama"    }, { name: "Romance" },
          { name: "Comedy"    }, { name: "Tragedy"   },
          { name: "Revue"   }, { name: "Farce"    },
          { name: "Carl"    } ];

  var edges = [  { source : 0  , target: 1 } , { source : 0  , target: 2 } ,
           { source : 0  , target: 3 } , { source : 0  , target: 4 } ,
           { source : 0  , target: 5 } , { source : 0  , target: 6 }  ];

  var width = 1330;
  var height = 620;
  var centered;


  var svg = d3.select("body")
        .append("svg")
        .attr("width",width)
        .attr("height",height);



  var force = d3.layout.force()
      .nodes(nodes)
      .links(edges)
      .size([width,height])
      .linkDistance(200)
      .charge(-1800);

  force.start();

  console.log(nodes);
  console.log(edges);


  var svg_edges = svg.selectAll("line")
            .data(edges)
            .enter()
            .append("line")
            .style("stroke","#fc2173")
            .style("stroke-width",3);

  var color = d3.scale.category20();


  var svg_nodes = svg.selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r",20)
            .attr("id", "node")
            .style("fill","#fc2173")
            .call(force.drag);


  var svg_texts = svg.selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .style("fill", "#fc2173")
            .style("font-family","Open Sans Condensed")
            .style("letter-spacing","2px")
            .style("opacity",".7")
            .attr("dx", 30)
            .attr("dy", 18)
            .text(function(d){
              return d.name;
            });


  force.on("tick", function(){

     svg_edges.attr("x1",function(d){ return d.source.x; })
        .attr("y1",function(d){ return d.source.y; })
        .attr("x2",function(d){ return d.target.x; })
        .attr("y2",function(d){ return d.target.y; });

     svg_nodes.attr("cx",function(d){ return d.x; })
        .attr("cy",function(d){ return d.y; });

     svg_texts.attr("x", function(d){ return d.x; })
      .attr("y", function(d){ return d.y; });
  });



}
