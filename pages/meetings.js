import Layout from "../components/layout"
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

export default function ListPage({ meetings }) {
  return (
    <div className="mx-2 md:mx-4">
      <h2 className="bg-gray-200 p-4">Meeting list</h2>
      <section className="p-2">
        <p>There are {meetings.length} meetings:</p>
        {meetings.map(mtg => (
          <div key={mtg.slug}>
            <Link href={`/meetings/${mtg.slug}`}>
              {mtg.name}
              </Link></div>
        ))}
      </section>
    </div>
  )
}