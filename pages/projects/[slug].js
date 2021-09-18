import { useRouter } from 'next/router'
import Airtable from "airtable"
import Link from 'next/link'
import Layout from '../../components/layout';
import ProjectHeader from './ProjectHeader';
import ProjectParcel from './ProjectParcel';
import ProjectMap from './ProjectMap';
import ProjectGallery from './ProjectGallery';
import ProjectMeetings from './ProjectMeetings';

// getStaticPaths returns an array of URL paths
// these represent individual projects

export async function getStaticPaths(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  // get all the records in the Projects table
  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
    .select()
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

    // ProjectHeader fields
    name: record.get('Name'),
    synopsis: record.get('Synopsis'),
    status: record.get('Status') || null,
    link: record.get('Link') || null,
    buildType: record.get('Build type') || null,
    uses: record.get('Uses') || null,

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
  return (
    <>
      <div>
        <ProjectHeader name={proj.name} synopsis={proj.synopsis} status={proj.status} uses={proj.uses} />
        <ProjectParcel parcelId={proj.parcelId} />
        <ProjectMap id={proj.id} geom={proj.the_geom} editor />
        {proj.images && <ProjectGallery images={proj.images} />}
        {proj.meetings.length > 0 && <ProjectMeetings meetings={proj.meetings} />}
      </div>
    </>
  )
}

export default ProjectPage;
