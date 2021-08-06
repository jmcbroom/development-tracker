import Layout from "../components/layout"
import Airtable from "airtable"
import Link from 'next/link';

export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'Slug'],
    })
    .all();

    const projects = records.map((person) => {
      return {
        name: person.get('Name'),
        slug: person.get('Slug')
      };
    });

    return {
      props: {
        projects,
      },
    };
}

export default function ListPage({ projects }) {
  return (
    <Layout>
      <h1>Project list</h1>
      <h2>There are {projects.length} projects.</h2>
      {projects.map(proj => (
        <div key={proj.slug}>
          <Link href={`/projects/${proj.slug}`}>
            {proj.name}
            </Link></div>
      ))}
    </Layout>
  )
}