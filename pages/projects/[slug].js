import Airtable from "airtable";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import Head from "next/head";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageSection from "../../components/PageSection";
import ProjectGallery from '../../components/Project/ProjectGallery';
import ProjectHeader from '../../components/Project/ProjectHeader';
import ProjectMap from '../../components/Project/ProjectMap';
import ProjectMapEditor from '../../components/Project/ProjectMapEditor';
import ProjectMeetings from '../../components/Project/ProjectMeetings';
import ProjectParcel from '../../components/Project/ProjectParcel';
import ProjectReport from "../../components/Project/ProjectReport";

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
    imageCaption: record.get('Image Caption') || null,

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
  return (
    <>

      <Head>
        <title>{`Detroit Development Tracker: ${proj.name}`}</title>
        <meta property="og:url" content={`https://developmenttracker.detourdetroit.com/projects/${proj.slug}`} />
        <meta property="og:type" content={`website`} />
        <meta property="og:title" content={`Detroit Development Tracker: ${proj.name}`} />
        <meta property="og:description" content={
          `This ${proj.uses && proj.uses.map(u => u.toLowerCase()).join(", ")} project is ${proj.status.toLowerCase()}. Learn more about ${proj.name} in the Detroit Development Tracker.`
        } />
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

        <PageSection title="What's happening?" className="col-span-1 md:col-span-2 synopsis">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {proj.synopsis}
          </ReactMarkdown>
        </PageSection>

        <ProjectParcel parcelId={proj.parcelId} />
        {
          editor ?
            <ProjectMapEditor id={proj.id} geom={proj.the_geom} /> :
            <ProjectMap id={proj.id} geom={proj.the_geom} project={proj} />
        }
        {proj.images && proj.images.length > 0 && <ProjectGallery images={proj.images} caption={proj.imageCaption} />}
        {/* {proj.meetings.length > 0 && <ProjectMeetings meetings={proj.meetings} />} */}
      </div>
      <hr style={{ height: 2 }} className="max-w-5xl mx-auto my-14 border-1 border-seafoam" />
      <ProjectReport id={proj.id} />
      <div className="font-dmmono text-sm font-normal mt-24 mx-auto max-w-xl text-center">
        The page was last updated at {dayjs(proj.lastModified).format('h:MMa')} on {dayjs(proj.lastModified).format('M/D/YY')}.
      </div>
    </>
  )
}

export default ProjectPage;
