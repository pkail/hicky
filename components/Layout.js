import Head from 'next/head';


const Layout = (props) => {
return
(
<div>
    <Head>
        <title>{props.title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="utf-8" />
		<meta name="description" content={props.description} />
    </Head>
{props.children}
</div>
)
}
export default Layout;
