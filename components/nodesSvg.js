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
	console.log('links >>>', links)
	console.log('nodes >>>', nodes)

links.forEach(link => link.source = +link.sourceString);
links.forEach(link => link.target = +link.targetString);
nodes.forEach(node => node.count >= 1000 ? node.count = 1000 : node.count = node.count);
	console.log('links after converstion >>>', links)

  useEffect(() => {
  const svg = select(svgRef.current)
			.attr("width", 1600)
			.attr("height", 1000)

const linkForce = forceLink();
const simulation = forceSimulation()
				.force("charge", forceManyBody().strength(-10000))
				.force("center", forceCenter().x(500).y(500))
				.force("radial", forceRadial(500).strength(0.999))
				.force("link", linkForce)
				.nodes(nodes)
				.on("tick", forceTick);

simulation.force("link").links(links);

select("svg").selectAll("line.link")
				.data(links, d => `$(d.source.id) - $(d.target.id)`)
				.enter().append("line")
				.attr("class", "link")
				.transition()
				.delay((d,i) => i*10)
				.style("stroke-width", 3)
				.style("stroke", "black");

const nodeEnter = select("svg").selectAll("g.node")
				.data(nodes, d => d.id)
				.enter()
				.append("g")
				.attr("class", "node");

nodeEnter.append("circle")
				.transition()
				.delay((d,i) => i*10)
				.attr("r", d => Math.sqrt(d.count))
				.style("fill", d => d.group == "system" ? "blue" : "red");

nodeEnter.append("text")
				.transition()
				.delay((d,i) => i*10)
				.style("text-anchor", "middle")
				.attr("y", 35)
				.text(d => d.id);

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
		width={800}
		height={500}>
        </svg>
      </div>
  );
}

export default NodesSvg;
