import Airtable from "airtable";
import ProjectGallery from './ProjectGallery';
import ProjectHeader from './ProjectHeader';
import ProjectMap from './ProjectMap';
import ProjectMapEditor from './ProjectMapEditor';
import ProjectMeetings from './ProjectMeetings';
import ProjectParcel from './ProjectParcel';
import ProjectReport from "./ProjectReport";
import Head from "next/head";
import PageSection from "../../components/PageSection";
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown';

import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// getStaticPaths returns an array of URL paths
// these represent individual projects
export async function getStaticPaths(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  // get all the records in the Projects table
  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
    .select({ filterByFormula: process.env.NODE_ENV === 'production' ? process.env.RECORD_FILTER : process.env.DEV_RECORD_FILTER })
    .all();

  // generate an array of Projects
  // fetching only the fields we need to fetch more data in the next step
  const projects = records.map((proj) => {
    return {
      params: {
        id: proj.id,
        name: proj.get("Name"),
        slug: proj.get("Slug") || null,
        meetings: proj.get("Meetings") || null
      }
    }
  });

  return {
    paths: projects,
    fallback: false
  };
}

// for each staticPath/project, we now fetch the props
// with another call to Airtable, using the project slug
export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  // get the particular Project whose slug matches
  // the [slug] parameter
  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
    .select({
      filterByFormula: `Slug="${context.params.slug}"`
    })
    .all();

  // we fetch just the first record from .all()
  // there should be only one!
  let record = records[0]
  if (records.length > 1) {
    console.log(records)
    console.log("Found too many records!")
  }

  // get the Meetings which are related in Airtable
  // to the current Project. We check for the existence of the 
  // Project's Slug value in the ProjectSlug string.
  // solution from: https://community.airtable.com/t/filterbyformula-api-not-working-for-linked-record-fields-with-multiple-records/30222/2
  const meetings = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Meetings')
    .select({
      // fields: ['Name', 'Status', 'Address', 'Link', 'the_geom'],
      filterByFormula: `FIND("${context.params.slug}", ProjectSlug & '')`
    })
    .all();

  // turn the Meeting records we fetched into normal,
  // JSON-serializable objects
  let projectMeetings = meetings.map(mtg => {
    return {
      name: mtg.get('Name'),
      date: mtg.get('Date'),
      slug: mtg.get('Slug')
    }
  })

  // create another object we can return
  let project = {
    id: record.id,
    lastModified: record.get('Last Modified'),

    // ProjectHeader fields
    name: record.get('Name'),
    slug: record.get('Slug'),
    synopsis: record.get('Synopsis') || null,
    status: record.get('Status') || null,
    link: record.get('Link') || null,
    buildType: record.get('Build type') || null,
    uses: record.get('Uses') || null,
    address: record.get('Address') || null,
    notes: record.get('Notes') || null,

    // ProjectParcel fields
    parcelId: record.get('Parcel ID') || null,

    // ProjectMap fields
    the_geom: record.get('the_geom') || null,

    // ProjectGallery fields
    images: record.get('Images') || null,

    // linked Meetings
    meetings: projectMeetings
  };

  return {
    props: {
      proj: project,
    },
  };
}

const ProjectPage = (props) => {
  let { proj, editor } = props;
  console.log(proj.images)
  return (
    <>

      <Head>
        <title>{`Detroit Development Tracker: ${proj.name}`}</title>
        <meta property="og:url" content={`https://developmenttracker.detourdetroit.com/projects/${proj.slug}`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`Detroit Development Tracker: ${proj.name}`} />
        <meta property="og:description" content={proj.synopsis} />
        {proj.images && proj.images.length > 0 && <meta property="og:image" content={proj.images[0].thumbnails.large.url} />}
      </Head>

      {editor && (
        <section className="bg-red-100">
          <span className="mr-4 font-bold text-sm">Editor panel</span>
          <a
            href={`https://airtable.com/apptXJJeHse3v7SAS/tbl9qrMmBcdgrquUI/viwpFI0hBW7WISpJ1/${proj.id}?blocks=hide`}
            target="_blank"
            rel="noreferrer"
          >
            Link to Airtable record
          </a>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

        <ProjectHeader {...proj} className='col-span-2' />

        <PageSection title="Project info">
          <p className="mb-2 pt-1">This <strong>{proj.uses && proj.uses.join(", ")}</strong> project is <strong>{proj.status}</strong>.</p>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {proj.synopsis}
          </ReactMarkdown>
        </PageSection>

        {
          editor ?
          <ProjectMapEditor id={proj.id} geom={proj.the_geom} /> :
          <ProjectMap id={proj.id} geom={proj.the_geom} project={proj} />
        }
        <ProjectParcel parcelId={proj.parcelId} />
        {proj.images && <ProjectGallery images={proj.images} />}
        {proj.meetings.length > 0 && <ProjectMeetings meetings={proj.meetings} />}
      </div>
      <hr style={{height: 2}} className="max-w-5xl mx-auto my-14 border-1 border-seafoam"/>
      <ProjectReport id={proj.id} />
      <div className="font-dmmono text-sm font-normal mt-20 mx-auto max-w-xl">
        Lorem ipsum this page was last updated {dayjs(proj.lastModified).fromNow()}.
      </div>
    </>
  )
}

export default ProjectPage;
