import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import Airtable from "airtable"
import Link from 'next/link';
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat'


export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Meetings')
    .select({
      fields: ['Name', 'Slug', 'Body', 'Projects', 'Date', 'Duration'],
      sort: [{field: 'Date', direction: 'desc'}]
    })
    .all();

  const projects = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
    .select({
      fields: ['Name', 'Slug']
    })
    .all();
    
  const meetings = records.map((record) => {

    let meetingProjects = []

    if (record.get('Projects') !== undefined) {
      let filteredProjects = projects.filter(p => record.get('Projects').indexOf(p.id) > -1)
      meetingProjects = filteredProjects.map(proj => {
        return {
          name: proj.get('Name'),
          slug: proj.get('Slug')
        }
      })
    }

    return {
      name: record.get('Name'),
      slug: record.get('Slug'),
      body: record.get('Body') || null,
      date: record.get('Date'),
      duration: record.get('Duration') || null,
      projects: meetingProjects,
    };
  });

  return {
    props: {
      meetings,
    },
  };
}

const MeetingEntry = ({ meeting }) => {

  dayjs.extend(LocalizedFormat)
  let formattedDate = dayjs(meeting.date).format('LLL')
  let endDate = dayjs(meeting.date).add(meeting.duration, 'second').format('LT')

  return (
    <div className="bg-white py-5 px-8">
      <div className="flex items-center justify-between">
        {meeting.body}
        <FontAwesomeIcon icon={faCalendarAlt} className="h-6 text-calblue" />
      </div>
      <p className="my-3 font-dmmono">{formattedDate}{meeting.duration ? ` to ${endDate}` : ``}</p>
      {
        meeting.projects.length > 0 && 
        <p>
          Associated Projects: 
          {meeting.projects.map(proj => 
            <Link key={proj.slug} href={`/projects/${proj.slug}`}>
              <span className="mx-2">
                {proj.name}
              </span>
            </Link>)
          }
        </p>
      }
    </div>
  )
}

export default function ListPage({ meetings }) {
  return (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl leading-9 pb-6">Upcoming public meetings about Detroit development projects</h3>
      <div className="flex flex-col gap-4">
        {meetings.map(meeting => <MeetingEntry key={meeting.name} {...{ meeting }} />)}
      </div>
    </div>
  )
}