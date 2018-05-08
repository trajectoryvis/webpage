var realdata;

d3.json("data/data.json", function(d){
  doSomething(d);
});

function doSomething(jsondata){
  realdata = jsondata;
  //nested function, reading both data, since the rest of the script is run otherwise.
  var simdata;
  var realtrajectories = overviewChart();
  var myslider = frameSeriesChart();
  var simtrajectories = overviewChart();

  d3.json("data/datasim.json", function(datasim){
  simdata = datasim;

  //create slider
    d3.select("#frameline")
      .datum(realdata)
      .call(myslider);

  // //create simulated trajectories
  //   d3.select("#simtraj")
  //     .datum(simdata)
  //     .call(simtrajectories);

  //create real trajectories
    d3.select("#realtraj")
      .datum(realdata)
      .call(realtrajectories);

  myslider.onbrushed(function(selected){  //I think this is called everytime a brush-event occurs?
       var mini = selected[0];
       var maxi = selected[1];

       var newrealdata = [];
       var newsimdata = [];

       //only select trajectories within the brushed selection:

       //for real data
       for(i = 0; i < realdata.length; i++){
         if(realdata[i].frame >= mini && realdata[i].frame <= maxi ){
           newrealdata.push(realdata[i]);
         }
       }
       //for simulated data
       for(i = 0; i < simdata.length; i++){
         if(simdata[i].frame >= mini && simdata[i].frame <= maxi ){
           newsimdata.push(simdata[i]);
         }
       }

      update(newrealdata,newsimdata);
  });//selected onbrushed

  // console.log(csData.frames.all())
//---------------------

  function update(newrealdata,newsimdata){
    // console.log("update");


    //In search for a better way (crossfilter?) I remove the entire div and then just remake it
    d3.select("#realtraj").remove();
    d3.select("#rtraj").append("div").attr("id", "realtraj");

    // d3.select("#simtraj").remove();
    // d3.select("#straj").append("div").attr("id", "simtraj");

    // // create simulated trajectories
    // d3.select("#simtraj")
    //   .datum(newsimdata)
    //   .call(simtrajectories);

    //create real trajectories
    d3.select("#realtraj")
      .datum(newrealdata)
      .call(realtrajectories);
  }//update


});
}//doSomething
// });//d3.json
