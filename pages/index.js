// import {nodes, links} from "../components/data";
import {
	csv
} from "d3";
// import {nodes} from "../components/nodes";
import {nodes} from "../components/nodesAsNumbers";
console.log('nodes >>>', nodes)
// import {links} from "../components/links";
import {links} from "../components/linksAsNumbers";
console.log('links >>>', links)
import NodesSvg from "../components/nodesSvg";


const Index = () => {
// const fetchData = async() => {

// const fullData = await csv("linksAsNumbers.csv");
// 	console.log('fullData >>>', fullData)
// }
// fetchData();
	return(
<div className="grid grid-cols-1">
	<NodesSvg links = {links} nodes = {nodes} />
	  </div>
	)
}

export default Index;
