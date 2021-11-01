import Airtable from "airtable"
import ProjectListEntry from "../components/ProjectListEntry";

export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'Slug', 'Last Modified'],
      sort: [{field: 'Last Modified', direction: 'desc'}]
    })
    .all();

  const projects = records.map((project) => {
    return {
      name: project.get('Name'),
      slug: project.get('Slug'),
      lastModified: project.get('Last Modified')
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
    <>
      <h2>Project list</h2>
      <p>There are {projects.length} projects.</p>
      {projects.map(proj => <ProjectListEntry project={proj} />)}
    </>
  )
}