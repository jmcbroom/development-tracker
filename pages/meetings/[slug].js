import Airtable from "airtable";
import MeetingHeader from '../../components/Meeting/MeetingHeader';
import MeetingProjects from '../../components/Meeting/MeetingProjects';

// getStaticPaths returns an array of URL paths
// these represent individual projects
export async function getStaticPaths(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Meetings')
    .select()
    .all();

  const meetings = records.map((mtg) => {
    return {
      params: {
        id: mtg.id,
        name: mtg.get("Name"),
        slug: mtg.get("Slug") || null,
        projects: mtg.get("Projects") || null
      }
    }
  });

  return {
    paths: meetings,
    fallback: false
  };
}

// for each staticPath/project, we now fetch the props
// with another call to Airtable, using the project slug
export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Meetings')
    .select({
      // fields: ['Name', 'Status', 'Address', 'Link', 'the_geom'],
      filterByFormula: `Slug="${context.params.slug}"`
    })
    .all();

  const projects = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
    .select({
      filterByFormula: `FIND("${context.params.slug}", MeetingSlug & '')`
    })
    .all();

  let meetingProjects = projects.map(prj => {
    return {
      name: prj.get('Name'),
      slug: prj.get('Slug')
    }
  })

  let mtg = records[0]
  
  let meeting = {
      id: mtg.id,
      slug: mtg.get('Slug'),
  
      // MeetingHeader fields
      name: mtg.get('Name'),
      date: mtg.get('Date'),
      duration: mtg.get('Duration') || null,

      projects: meetingProjects
  };

  return {
    props: {
      meeting: meeting,
    },
  };
}

const MeetingPage = (props) => {
  let { meeting } = props;

  return (
    <>

      <div>
        {/* Header for the meeting */}
        <MeetingHeader name={meeting.name} date={meeting.date} duration={meeting.duration} />
        {meeting.projects && <MeetingProjects projects={meeting.projects} />}
        {/* Recap of the meeting */}
        {/* <MeetingRecap /> */}
      </div>

    </>
  )
}

export default MeetingPage;
