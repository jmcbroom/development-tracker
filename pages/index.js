import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <p className="text-xl leading-9 md:text-4xl md:leading-12 max-w-3xl mx-auto font-normal" >
        The Detroit Development Tracker is a community-powered tool that lets 
        you look up information about real estate development in the city. 
        You can explore projects on the <Link href={`/map`}>map</Link>, 
        see a <Link href={`/projects`}>list</Link> of all projects, 
        view upcoming <Link href={`/meetings`}>public meetings</Link> related to 
        developments and <Link href={`/submit-a-top`}>submit info</Link>, 
        questions and photos about development near you.
      </p>

      <p className="text-lg leading-7 md:text-2xl md:leading-10 pt-8 md:pt-15 max-w-3xl mx-auto">
        The tracker, currently in beta, is maintained by Detour Detroit, 
        a local independent media organization, and was built with civic engineer Jimmy McBroom. 
        Have questions or want to contribute? <Link href={`/submit-a-tip`}>Get in touch.</Link>
      </p>
    </div>
  )
}
