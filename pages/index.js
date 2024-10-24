import {nodes, links} from "../components/data";
import NodesSvg from "../components/nodesSvg";

const Index = () => {
	return(
<div className="grid grid-cols-1">
	<NodesSvg nodes={nodes} links={links}/>
	  </div>
	)
}

export default Index;
