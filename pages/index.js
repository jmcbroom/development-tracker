import Link from 'next/link'
import { siteTitle } from "../components/layout";
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{`Detroit Development Tracker`}</title>
        <meta
          name="description"
          content="Tracking development in Detroit, Michigan."
          key="description"
        />
        <meta property="og:title" content={siteTitle} key="title" />
        <meta property="og:description" content="Use the Detroit Development Tracker to look up information about real estate development in the city." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div>
        <h2 className="text-xl leading-9 md:text-4xl md:leading-12 max-w-3xl mx-auto font-normal">
          Use the Detroit Development Tracker to look up information about real estate development in the city.
        </h2>
        <p className="text-lg leading-7.5 md:text-3xl md:leading-11 pt-6 md:pt-6 max-w-3xl mx-auto" >
          You can explore projects on the <Link href={`/map`}>map</Link>,
          see a list of <Link href={`/projects`}>all projects</Link> and
          help us add developments to the tracker by <Link href={`/submit-a-tip`}>submitting a tip</Link>.
        </p>

        <p className="text-normal leading-6 md:text-xl md:leading-9 pt-6 md:pt-6 max-w-3xl mx-auto">
          This community-powered tool, published by Detour Detroit, is currently in beta – and we need your help.
          If you know about a development and don’t see it in the tracker, <Link href={`/submit-a-tip`}>tell us about it</Link>.
          If you have ideas to improve this site or want to work together, <Link href={`/contact-us`}>get in touch</Link>, and read more about the project <Link href={`/about`}>here</Link>.
        </p>
      </div>
    </>
  )
}
