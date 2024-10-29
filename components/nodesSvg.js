import React, { useEffect, useRef } from "react";
import {
	select,
	selectAll,
	scaleOrdinal,
	forceManyBody,
	forceCenter,
	forceRadial,
	force,
	forceLink,
	forceSimulation,
	forceTick,
	csvParse,
	csv
} from "d3";
import useResizeObserver from "use-resize-observer/polyfilled";

function NodesSvg(props) {
  const svgRef = useRef();
  const  { ref, width=1, height=1 } = useResizeObserver();

  const { nodes, links } = props;
	console.log('links in nodessvg >>>', links)
	console.log('nodes in nodessvg>>>', nodes)

links.forEach(link => link.source = parseInt(link.source));
links.forEach(link => link.target = parseInt(link.target));
nodes.forEach(node => node.id = parseInt(node.id)+1);
nodes.forEach(node => node.count >= 200 ? node.count = 200 : node.count = node.count);
	console.log('nodes after conversion>>>', nodes)
	console.log('links after conversion>>>', links)

  useEffect(() => {

  const svg = select(svgRef.current)

const linkForce = forceLink();
const simulation = forceSimulation()
				.force("charge", forceManyBody().strength(-500))
				.force("center", forceCenter().x(700).y(500))
				.force("radial", forceRadial(5).strength(0.8))
				.force("link", linkForce)
				.nodes(nodes)
				.on("tick", forceTick);

simulation.force("link").links(links);

select("svg").selectAll("line.link")
				.data(links, d => `$(d.source.id) - $(d.target.id)`)
				.enter().append("line")
				.attr("class", "link")
				.transition()
				.delay((d,i) => i*20)
				.style("stroke-width", d => d.count < 300 ? 3 : 12)
				.style("stroke", "black");

const nodeEnter = select("svg").selectAll("g.node")
				.data(nodes, d => d.id)
				.enter()
				.append("g")
				.attr("class", "node");

nodeEnter.append("circle")
				.transition()
				.delay((d,i) => i*20)
				.attr("r", d => 2*Math.sqrt(d.count))
				.style("fill", d => parseInt(d.id) < 53  ? "#A91D36" : "#F8A350")
				.style("opacity", (d,i) => i == 0 ? 0 : 1)


nodeEnter.append("text")
				.transition()
				.delay((d,i) => i*20)
				.style("text-anchor", "middle")
				.attr("y", d => 2*Math.sqrt(d.count)+15)
				.text((d,i) => i < 53 ? i : i-52)
				.style("opacity", (d,i) => i == 0 ? 0 : 1);

function forceTick() {
			selectAll("line.link")
				.attr("x1", d => d.source.x)
				.attr("x2", d => d.target.x)
				.attr("y1", d => d.source.y)
				.attr("y2", d => d.target.y);

			selectAll("g.node")
				.attr("transform", d => `translate(${d.x},${d.y})`)

}
  },  [props]);

  return (
      <div className="graph">
        <svg ref={svgRef}
		width={1400}
		height={1100}>
        </svg>
      </div>
  );
}

export default NodesSvg;
