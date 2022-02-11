import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto">

      <div className="border-b-2 border-b-seafoam pb-6">
        <h2 className="my-6">About the Detroit Development Tracker</h2>
        <p className="my-6">
          The Detroit Development Tracker is built and maintained by local independent media organization Detour Detroit and civic engineer Jimmy McBroom. The open-source tool launched in February 2022 and is currently in beta.
        </p>
        <p className="my-6">
          We started building the Detroit Development Tracker in 2021 with the goal to empower Detroiters to better understand the forces shaping their own neighborhoods. As development activity skyrockets in the city, we believe residents deserve more information about what is being built, and who is building it.
        </p>
        <p className="my-6">
          We hope that tracking larger scale residential and commercial development projects will give Detroiters another layer of understanding about land use and ownership in their neighborhoods. The Detroit Development Tracker takes this information out of the domain of developers, funders and city bureaucracy, making it more accessible — and actionable — for those most impacted by it.
        </p>
      </div>

      <div className="border-b-2 border-b-seafoam py-6">
        <h2 className="my-6">What you will find in the Detroit Development Tracker </h2>
        <p className="my-6">
          This site allows you to see a birds eye view of development at the city or neighborhood level on <Link href="/map">the map</Link>, or browse <Link href="/projects">all development projects</Link> underway. Each development project page includes more information about the land owner, what is being built, the status of the project, zoning and more details when available like cost, timelines and site photos.
        </p>
        <p className="my-6">
          The Detroit Development Tracker is a work in progress, with more data being added all the time. In the future, we plan to incorporate additional information about each development, like which projects are receiving tax incentives, and more functions for the site, like looking up projects by developer or district. The tracker is meant to be a participatory project, relying on users like you to <Link href="/submit-a-tip">share information about developments you see around you</Link>. All submissions are verified by journalists.
        </p>
      </div>

      <div className="border-b-2 border-b-seafoam py-6">
        <h2 className="my-6">How can you use the Detroit Development Tracker?</h2>
        <p className="my-6">
          Well, we hope you&apos;ll tell us how it is – or could be – helpful to you. You might want to see all the new developments happening near where you live, or stumble across construction while you&apos;re out and about and look up the address to find out what&apos;s being built.
        </p>
        <p className="my-6">
          If you are a Detroit resident who wants to know more about development; a developers who is interested in democratizing the development landscape and building relationships with the people their projects serve; a member of a neighborhood group or other organization that serves Detroiters; or just have an idea for how the tracker could serve our city better, <Link href='/contact-us'>we want to hear from you</Link>.
        </p>
      </div>

      <div className="border-b-2 border-b-seafoam py-6">
        <h2 className="my-6">Under the hood</h2>

        <p className="my-6">
          The Tracker is an open-source tool, and you can view our <Link href="https://github.com/jmcbroom/development-tracker">GitHub repository</Link> to see the site&apos;s code. The site uses a custom base in <Link href="https://airtable.com">Airtable</Link>, a database-spreadsheet hybrid platform, as a content management system and was built with <Link href="https://nextjs.org">Next.js</Link>, a development framework which uses <Link href="https://reactjs.org">React</Link>.
        </p>
        <p className="my-6">
          Other tools we used to build the site, all free or with freemium models, include <Link href="https://mapbox.com">Mapbox</Link>, <Link href="https://www.netlify.com">Netlify</Link> and <Link href="https://supabase.com/">Supabase</Link>. See more details about implementation at <Link href="https://github.com/jmcbroom/development-tracker">GitHub</Link>.
        </p>
        <p className="my-6">
          Development project information is sourced through a combination of crowdsourcing, public meeting agendas, local news outlets, independent research and scraping open data from sources including the <Link href="https://data.detroitmi.gov">Detroit Open Data Portal</Link>, the city’s <Link href="https://cityofdetroit.github.io/parcel-viewer/">Parcel Viewer</Link>Parcel Viewer and <Link href="https://detroit.documenters.org/">Detroit Documenters</Link>.
        </p>
      </div>

      <div className="border-b-2 border-b-seafoam py-6">
        <h2 className="my-6">Creators, collaborators and funders</h2>
        <p className="my-6">
          <strong>Kate Abbey-Lambertz</strong>, editorial director of <Link href="https://detourdetroiter.com/">Detour Detroit</Link>, manages the tracker and built it with <strong>Jimmy McBroom</strong>, lead developer. (Disclosure: Jimmy is a data engineer with the City of Detroit, where his team manages the Open Data Portal. He works on the tracker in his personal capacity; the City of Detroit has no role in its operation or maintenance.)
        </p>
        <p className="my-6">
          Kate and Jimmy started collaborating on the project in 2020. Jimmy, a Detour reader and member, responded to an audience survey and suggested creating it, based on a prototype he built at the City in 2017 with research intern <strong>Ivy Tran</strong> and developer <strong>Jessica McInchak</strong>. In 2021, Kate and Detour were awarded a fellowship from the <Link href="https://www.rjionline.org/">Reynolds Journalism Institute</Link> fellowship at the Missouri School of Journalism to build and launch the Detroit Development Tracker.
        </p>
        <p className="my-6">
          <strong>Lindsay Farris</strong> designed the website. <strong>Rasha Almulaiki</strong>, <strong>Rukiya Colvin</strong> and <strong>Paul Warner</strong> contributed research assistance. <strong>Lauren Ann Davies</strong>, <strong>Nina Ignaczak</strong>, <strong>Noah Kincade</strong> and <strong>Ashley Woods Branch</strong> provided strategic support.
        </p>
        <p className="my-6">
          The Detroit Development Tracker project was funded by the Reynolds Journalism Institute, with support from RJI Executive Director <strong>Randy Picht</strong> and Director of Innovation <strong>Kat Duncan</strong>. It has received funding from the <Link href="https://sites.google.com/view/detroitequity/stories/reporting-initiative?authuser=0">Detroit Equity Action Lab – Race and Justice Reporting Initiative</Link>, a program of The Damon J. Keith Center for Civil Rights, with support from DEAL Race and Justice Journalism Fellow <strong>Martina Guzmán</strong>. It has also received critical support from Detour Detroit members and individual donors.
        </p>
      </div>

      <div className="pt-6">
        <h2 className="my-6">Contact us</h2>
        <p className="my-6">
          Have questions or want to contribute? <Link href="/submit-a-tip">Get in touch</Link>.
        </p>
      </div>

    </div>
  )
}

export default AboutPage;