import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Airtable from "airtable"
import Link from 'next/link';

export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Meetings')
    .select({
      fields: ['Name', 'Slug'],
    })
    .all();

    const meetings = records.map((record) => {
      return {
        name: record.get('Name'),
        slug: record.get('Slug')
      };
    });

    return {
      props: {
        meetings,
      },
    };
}

const MeetingEntry = ({ meeting }) => {
  return (
    <div className="bg-white py-5 px-8">
      <div className="flex items-center justify-between">

      {meeting.name}
      <FontAwesomeIcon icon={faCalendar} className="h-6"/>
      </div>
    </div>
  )
}

export default function ListPage({ meetings }) {

  return (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl leading-9 pb-6">Upcoming public meetings about Detroit development projects</h3>
      <div className="flex flex-col gap-4">
        {meetings.map(meeting => <MeetingEntry {...{meeting}} />)}
      </div>
    </div>
  )
}