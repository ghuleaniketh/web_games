import Register from './register/page';
import Head from 'next.head';


export default function Home() {
  return (
    <>
    <Head>
        <title>My Awesome Page</title>
        <meta name="description" content="This is my awesome Next.js page!" />
      </Head>
    <head>
        <Register/>
    </head>
    </>
  );
}
