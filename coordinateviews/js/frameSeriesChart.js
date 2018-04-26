function frameSeriesChart(selection){

  var frameScale = d3.scaleLinear();
  var svg;
  onbrushed = function(){};

  function my(selection){

    selection.each(function(data){
      var margin = {top: 20, right: 60, bottom: 20, left: 20},
          width = 1400 - margin.left - margin.right,
          height = 100 - margin.top - margin.bottom;


      var frameMin = d3.min(data, function(d) {return d.frame}),
          frameMax=  d3.max(data, function(d) {return d.frame});

      frameScale = d3.scaleLinear()
          .domain([frameMin, frameMax])
          .rangeRound([0, width]);

     svg = d3.select(this).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "axis axis--grid")
        .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(frameScale)
              .ticks(40)
              .tickSize(-height));
              //.tickFormat(function() { return null; }));

    svg.append("g")
        .attr("class", "brush")
          .call(d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("brush", brushed));//.on "end" or .on"brush"? I think brush is better


    });
  }
  function brushed() {
    if (!d3.event.sourceEvent) return; // Only transition after input.
    if (!d3.event.selection) return; // Ignore empty selections.
    var selected = d3.event.selection.map(frameScale.invert);
    // console.log(selected);

    onbrushed(selected);
  }


  my.svg = function(_) {
    // console.log("hje");
    // console.log(!arguments.length);
      if (!arguments.length) return svg;
      svg = _;
      return my;
  };
  my.onbrushed = function(_) {
    // console.log("hej");
    // console.log(!arguments.length);
    if (!arguments.length) return onbrushed;
    onbrushed = _;
    return my;
  };

  return my;
}
