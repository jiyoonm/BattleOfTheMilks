var controller = new ScrollMagic.Controller();
var group =[
   {
      title:"Dairy",
      value:628
   },
   {
      title:"Rice",
      value:270
   },
   {
      title:"Soy",
      value:28
   },
   {
      title:"Oat",
      value:48
   },
   {
      title:"Almond",
      value:371
   }
 ];
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
			 var waterUse = [],
			 titles = [];
			 for (var i = 0; i<group.length; i++) {
				waterUse.push(group[i].value);
			 }
	   	var margin = { top: 0, right:0, bottom: 30, left:45}
			 height = 300 - margin.top - margin.bottom,
			 width = 500 - margin.left - margin.right;

 tooltip = d3.select('body') .append('div')
	 .attr("class", "tool-tip")
	 .style('opacity', 0);

				let svg1 = d3.selectAll('#growingRect')
				.attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform','translate(' + margin.left + ',' + margin.right + ')');

				xScale = d3.scaleBand()
		    .domain(waterUse)
		    .paddingInner(.1)
		    .paddingOuter(.1)
		    .range([0, width])

				yScale = d3.scaleLinear()
					.domain([0, d3.max(waterUse)])
					.range([0,height]);
					yAxisValues = d3.scaleLinear()
						.domain([0, d3.max(waterUse)])
						.range([height,0]);

					yAxisTicks = d3.axisLeft(yAxisValues)
			    .ticks(8)
		    xAxisValues = d3.scaleBand()
		          .domain(group.map(function(d){
		            return d.title;
		          }))
		        .range([0, width])

		    xAxisTicks = d3.axisBottom(xAxisValues)
				.tickSizeOuter(0)
		    colors = d3.scaleLinear()
		      .domain([30, 330, d3.max(waterUse)])
		      .range(["#68aad6","#d67d71"])

				svg1.selectAll("#rectid")
				.data(waterUse)
				.enter()
				.append('rect')
				.attr('x', function(d) {return xScale(d);})
				.attr('y', function(d) { return height - yScale(d);})
				.attr('width', function(d) {return xScale.bandwidth(d);})
				 .attr("height" , function(d){return yScale(d)*0;})
				  .attr('fill', colors)
				 .attr('id' , 'rectid')
				 .attr('visibility' , 'none')
				 .on('mouseover', function(d) {
           tooltip.transition().duration(200)
             .style('opacity', 1)
           tooltip.html(d + 'L')
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

				var sectionTwoScene = new ScrollMagic.Scene({
					triggerElement:'#rectid',
					})
					.setClassToggle('#rectid' , 'rectclass')
						.on('enter' , (e)=>{
									svg1.selectAll("#rectid").transition()
                   .duration(1500)
							    .attr('height', function(d) {
							      return yScale(d);
							    })




				})
				.triggerHook(2.5)
				.addTo(controller);


				yGuide = d3.select('#growingRect').append('g')
	              .attr('transform', 'translate(' + margin.left + ', 0)')
	                .call(yAxisTicks)
	                .style("opacity", .75)
	                    .style("font-size", "20px");

	    xGuide = d3.select('#growingRect').append('g')
	               .attr('transform', 'translate(' + margin.left + ', ' + height + ')')
	            .style("opacity", .75)
	            .style("font-size", "20px")
	                .call(xAxisTicks);


// d3.select("#growingRect")
// 		.selectAll("rect").transition()
//     .attr('height', function(d) {
//       return yScale(d);
//     })
//     .attr('y', function(d) {
//       return height - yScale(d);
//     })
//     .delay(function(d, i) {
//       return i * 20;
//     })
//     .duration(1000)
//     .ease(d3.easeBounceOut)
