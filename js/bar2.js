var dataSet1 =[
   {
      title:"Dairy",
      value:9.0
   },
   {
      title:"Rice",
      value:0.3
   },
   {
      title:"Soy",
      value:0.7
   },
   {
      title:"Oat",
      value:0.8
   },
   {
      title:"Almond",
      value:0.5
   }
 ]

  var landUse = [],
  titles = [],
  margin = { top: 0, right:0, bottom: 30, left:40}
  height = 300 - margin.top - margin.bottom,
  width = 500 - margin.left - margin.right;

  var    tempColor,
        yScale,
        yAxisValues,
        yAxisTicks,
        yGuide,
        label,
        xScale,
        xAxisValues,
        xAxisTicks,
        xGuide,
        colors,
        tooltip,
        myChart;
  var txt = "2";

  for (var i = 0; i<dataSet1.length; i++) {
    landUse.push(dataSet1[i].value);
 titles.push(dataSet1[i].title);

  }


    yScale = d3.scaleLinear()
      .domain([0, d3.max(landUse)])
      .range([0,height]);

    yAxisValues = d3.scaleLinear()
      .domain([0, d3.max(landUse)])
      .range([height,0]);

    yAxisTicks = d3.axisLeft(yAxisValues)
    .ticks(6)

    xScale = d3.scaleBand()
    .domain(landUse)
    // .domain(dataSet1.map(function(d){
    //   return d.title;
    // }))
    .paddingInner(.1)
    .paddingOuter(.1)
    .range([0, width])

    xAxisValues = d3.scaleBand()
          .domain(dataSet1.map(function(d){
            return d.title;
          }))
        .range([0, width])


    xAxisTicks = d3.axisBottom(xAxisValues).tickSizeOuter(0)

    colors = d3.scaleLinear()
      .domain([1, 7, d3.max(landUse)])
      .range(["#68aad6","#ff6a00"])

    tooltip = d3.select('body') .append('div')
      .attr("class", "tool-tip")
      .style('opacity', 0);

      myChart = d3.select('#viz2').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.right + ')')
        .selectAll('rect').data(landUse)
      .enter().append('rect')
        .attr('fill', colors)
        .attr('width', function(d) {
     return xScale.bandwidth(d);
   })
   .attr('height', 0)
   .attr('x', function(d) {
return xScale(d)
   })
   .attr('y', height)

        .on('mouseover', function(d) {
          tooltip.transition().duration(200)
            .style('opacity', .8)
          tooltip.html(d + 'm'+txt.sup())
            .style('left', (d3.event.pageX -35) + 'px')
            .style('top', (d3.event.pageY -30) + 'px')
          d3.select(this)
            .style('opacity', .7)
        })

        .on('mouseout', function(d) {
          tooltip.transition()
              .duration('50')
              .style("opacity", 0);
          d3.select(this).transition()
          .duration('50')
          .style('opacity', 1);
        });

    yGuide = d3.select('#viz2 svg').append('g')
            .attr('transform', 'translate(' + margin.left + ', 0)')
              .call(yAxisTicks)
              .style("opacity", .75)
                  .style("font-size", "20px")

  xGuide = d3.select('#viz2 svg').append('g')
             .attr('transform', 'translate(' + margin.left + ', ' + height + ')')
          .style("opacity", .75)
          .style("font-size", "20px")
              .call(xAxisTicks)


              myChart.transition()
            .attr('height', function(d) {
              return yScale(d);
            })
            .attr('y', function(d) {
              return height - yScale(d);
            })
            .delay(function(d, i) {
              return i * 20;
            })
            .duration(1000)
            .ease(d3.easeBounceOut)
