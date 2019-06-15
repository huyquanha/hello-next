import Link from 'next/link';
import Layout from '../comps/MyLayout';
import fetch from 'isomorphic-unfetch';

const ShowLink = ({show}) => (
    <li>
        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
        </Link>
        <style jsx>{
            `li {
                list-style: none;
                margin: 5px 0;
            }
            
            a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
            }
            
            a:hover {
                opacity: 0.6;
            }`}
        </style>
    </li>
);

const Index = props => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {
                props.shows.map(show => (
                    <ShowLink key={show.id} show={show}/>
                ))
            }
        </ul>
        <style jsx>{`
            h1,
            a {
                font-family: 'Arial';
            }
            
            ul {
                padding: 0;
            }
            
            li {
                list-style: none;
                margin: 5px 0;
            }
            
            a {
                text-decoration: none;
                color: blue;
            }
            
            a:hover {
                opacity: 0.6;
            }
        `}</style>
    </Layout>
);

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data.map(entry => entry.show)
    };
};

export default Index;

// const PostLink = (props) => (
//     <li>
//         {/*as is a route masking (show the URl bar as..., which can be different from href)*/}
//         {/*however, with this fake URL, if you refresh the page, it will return 404*/}
//         <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
//             <a>{props.title}</a>
//         </Link>
//     </li>
// );
//
// export default function Blog() {
//     return (
//         <Layout>
//             <h1>My Blog</h1>
//             <ul>
//                 <PostLink id= "hello-nextjs" title="Hello Next.js"/>
//                 <PostLink id="learn-nextjs" title="Learn Next.js is awesome"/>
//                 <PostLink id="deploy-nextjs" title="Deploy apps with Zeit"/>
//             </ul>
//         </Layout>
//     )
// };
