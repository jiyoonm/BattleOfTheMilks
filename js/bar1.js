var dataSet =[
  {
     title:"Dairy",
     value:3.2
  },
  {
     title:"Rice",
     value:1.2
  },
  {
     title:"Soy",
     value:1.0
  },
  {
     title:"Oat",
     value:0.9
  },
  {
     title:"Almond",
     value:0.7
  }
 ]

  var emissions = [],
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
var txt='2';
  for (var i = 0; i<dataSet.length; i++) {
    emissions.push(dataSet[i].value);
 titles.push(dataSet[i].title);

  }


    yScale = d3.scaleLinear()
      .domain([0, d3.max(emissions)])
      .range([0,height]);

    yAxisValues = d3.scaleLinear()
      .domain([0, d3.max(emissions)])
      .range([height,0]);

    yAxisTicks = d3.axisLeft(yAxisValues)
    .ticks(10)

    xScale = d3.scaleBand()
    .domain(emissions)
    // .domain(dataSet.map(function(d){
    //   return d.title;
    // }))
    .paddingInner(.1)
    .paddingOuter(.1)
    .range([0, width])

    xAxisValues = d3.scaleBand()
          .domain(dataSet.map(function(d){
            return d.title;
          }))
        .range([0, width])


    xAxisTicks = d3.axisBottom(xAxisValues).tickSizeOuter(0)

    colors = d3.scaleLinear()
      .domain([.7, 2, d3.max(emissions)])
      .range(["#68aad6","#d67d71"])

    tooltip = d3.select('body') .append('div')
      .attr("class", "tool-tip")
      .style('opacity', 0);

      myChart = d3.select('#viz1').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform',
          'translate(' + margin.left + ',' + margin.right + ')')
    .selectAll('rect').data(emissions)
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
          tooltip.html(d + 'kg CO'+txt.sup())
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

    yGuide = d3.select('#viz1 svg').append('g')
            .attr('transform', 'translate(' + margin.left + ', 0)')
              .call(yAxisTicks)
              .style("opacity", .75)
                  .style("font-size", "20px")

  xGuide = d3.select('#viz1 svg').append('g')
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
