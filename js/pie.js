var group1 = [{
  title: "Non-Food",
  value: 74,
  all: 100,
  caption: "% of greenhouse gases are caused by food."
},
{
  title: "Food",
  value: 26,
  all: 100,
  caption: "% of greenhouse gases are not food-related."
}
];

var group2 = [{
  title: "Non-Food",
  value: 50,
  all: 100,
  caption: "% of habitable land consists of forests, urban area, and freshwater."
},
{
  title: "Food",
  value: 50,
  all: 100,
  caption: "% of habitable land consists of agriculture."
}
];


var group3 = [{
  title: "Non-Food",
  value: 30,
  all: 100,
  caption: "% of freshwater is used for industry and households."
},
{
  title: "Food",
  value: 70,
  all: 100,
  caption: "% of freshwater is used for agriculture."
}
];

var group4 = [{
  title: "Non-Food",
  value: 22,
  all: 100,
  caption: "% of water pollution is caused by non-food related sources."
},
{
  title: "Food",
  value: 78,
  all: 100,
  caption: "% water pollution is caused by agriculture."
}
];
var group4 = [{
  title: "Non-Food",
  value: 22,
  all: 100,
  caption: "% of habitable land consists of agriculture."
},
{
  title: "Food",
  value: 78,
  all: 100,
  caption: "% of habitable land consists of agriculture."
}
];
var width = 400,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(["#68aad6","#ff6a00"]);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })(group1);
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var donutTip = d3.select("body").append("div")
        .attr("class", "donut-tip")
        .style("opacity", 0);
var svg = d3.select("#pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")

    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');


    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');

    })
    .attr('transform', 'translate(0, 0)');


var path = svg.selectAll('path')
g.append("path")
    .attr("d", arc)
    .attr("stroke", "#fff")
    .style("stroke-width", "5px")
    .style("opacity", 1)
     .each(function(d) { this._current = d; })
    .style("fill", function (d) {
        return color(d.data.title);
    })
    .on('mouseover', function (d, i) {

            donutTip.transition()
                .duration(50)
                .style("opacity", .8);

            // Edit tooltip here
            let num = (Math.round((d.value / d.data.all) * 100)).toString() + d.data.caption;
            //let num = d.caption;
            donutTip.html(num)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 15) + "px");
    })
    .on('mouseout', function (d, i) {
      donutTip.transition()
          .duration('50')
          .style("opacity", 0);
    });



    function arcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arc(i(t));
      };
    }

    function labelarcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return "translate(" + labelArc.centroid(i(t)) + ")";
      };
    }
function changeData(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })(data);

    path = d3.select("#pie")
        .selectAll("path")
        .data(pie); // Compute the new angles
      path.transition().duration(500).attrTween("d", arcTween);  // redrawing the path
}

d3.select("button#group1")
    .on("click", function () {
        changeData(group1);
    })
d3.select("button#group2")
    .on("click", function () {
        changeData(group2);
    })
d3.select("button#group3")
    .on("click", function () {
        changeData(group3)
    })
d3.select("button#group4")
    .on("click", function () {
        changeData(group4)
    })
