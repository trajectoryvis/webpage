
//notes:
// lets start with a line, if it looks too choppy, use a curve instead

function overviewChart(selection){
  var colours = ["#003399", "#006699", "#0000ff", "#009999", "#00ccff", "#666699", "#339966", "#6600cc", "#339933", "#00cc66", "#00ff99", "#66ccff", "#cc33ff", "#003300", "#66ff66", "#ff66ff", "#ff9999", "#ffff00", "#999966", "#666633", "#996633", "#cc3300", "#cc0066", "#ff1a1a"];
  function colour(i){
    i = i%colours.length;
    // console.log(i);
    return colours[i];
  }
  function my(selection){
    selection.each(function(data){

      var newData = [];

      // d3.json("data/data.json", function(data){

        var person1 = [];
        var numberOfPeople = 200;

        for(i = 0; i < data.length; i++){
          if(data[i].person <= numberOfPeople-1 ){
            person1.push(data[i]);
          }
        }


        var xMin = d3.min(data, function(d){return d.x}), //max and min
            xMax = d3.max(data, function(d){return d.x}),
            yMin = d3.min(data, function(d){return d.y}),
            yMax = d3.max(data, function(d){return d.y});


        var w = 700,
            h = 500,
            pad = 20,
            left_pad = 20;

        var svg = d3.select(this)
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);


        var xScale = d3.scaleLinear().domain([xMin,xMax]).range([left_pad, w-pad]),
            yScale = d3.scaleLinear().domain([yMax,yMin]).range([pad, h-pad*2]);

        var xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale);

        var cValue = function(d) { return d.person;},
            color = d3.scaleOrdinal(d3.schemeCategory10);

        var line = d3.line()
          .x(function(d){return xScale(d.x);})
          .y(function(d){return yScale(d.y);});


        svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate(0, "+(h-pad)+")")
           .call(xAxis);

        svg.append("g")
           .attr("class", "axis")
           .attr("transform", "translate("+(left_pad-pad)+", 0)")
           .call(yAxis);
        
        // svg.append("g")
        //     .attr("class", "brush")
        //     .call(d3.brushY()
        //     .on("brush",brushed));

        for(i = 0; i < numberOfPeople; i++){
          var tempperson = [];
          for(j = 0; j < person1.length; j++){
            if(person1[j].person == i){
              tempperson.push(person1[j]);
            }
          }

          // console.log(person);
          svg.append("path")
            .datum(tempperson)
            .attr("class", "line")
            .attr("id", "person" + i)
            .attr("fill", "none")
            // .attr("stroke", "steelblue")
            .attr("stroke", function(tt){
              return colour(i);
            })
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr("d", line);
        }
        // console.log(person1);  //remember, it logs everything twice since we have 2 graphs

        var info = d3.select(this).append("p").attr("id","infotext");
        // var dd = data.slice(0,100);
        // console.log(data.length);



        svg.selectAll("circle")
           .data(person1)
           .enter()
           .append("circle")
           .attr("class", "circle")
           .attr("cx", function (d) { return xScale(d.x) })
           .attr("cy", function (d) { return yScale(d.y) })
           .attr("r", 10)
           .style("opacity", 0)
           .style("fill",function(d) { return color(d.person);} )
           .on("mouseover", function(d1){
             // console.log(svg.selectAll("path
             var paths = svg.selectAll("path");
             // var currentpath = paths._groups[0][d1.person];
             // console.log(currentpath);
             // currentpath.setAttribute("stroke", "red");
             var thispath = svg.select("#person" + d1.person);
             thispath.attr("stroke","red");
             // thispath.attr("stroke", function(tt){
             //   // console.log(d1.person);
             //   return colour(d1.person);
             // });
             // console.log(currentpath);
             // console.log(d1.person)
             info.text("Person: " + d1.person);
             // svg.selectAll("circle").attr("r", function(d){
             //   if(d.person == d1.person){
             //     return "10";
             //   }else{
             //     return "10";
             //   }
             // }).style("fill", function(d){
             //   if(d.person == d1.person){
             //     return "red";
             //   }else{
             //     return "gray";
             //   }
             // });
             // console.log(d1);
             // d.attr("r", 10).style("fill", "red");
           }).on("mouseout", function(d){
             for(i = 0; i < numberOfPeople; i++){
               d3.select("#person" + i).attr("stroke",function(d){
                 return colour(i);
               });
             }
           });

          //
          //  //Det här fungerar ju inte
          // function brushstart() {
          //  svg.classed("selecting", true);
          // }


          // filter(function(d,i){
          //   if(yScale(d[0].y) >= miny && yScale(d[0].y) <= maxy ){
          //     // console.log(d[0].y);
          //     return d;
          //   }
          //  }).
           //the function that takes care of what happens on "brush" event
         // function brushed() {
         //   var area = d3.event.selection;
         //   var miny = area[0];
         //   var maxy = area[1];
         //   svg.selectAll(".line").style("stroke",function(d){
         //     // console.log(d.getPointAtLength(0.1));
         //     // console.log("d: " + d);
         //     // console.log("miny: " + miny + " maxy: " + maxy);
         //     if(yScale(d[0].y) >= miny && yScale(d[0].y) <= maxy){
         //       return "red";
         //     }else{
         //       return "steel-blue";
         //     }
         //   });

         // }//brushed
      // });
    });
  }//my

  return my;
}//overviewChart
