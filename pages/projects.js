import Airtable from "airtable"
import ProjectList from "../components/ProjectList";
import ProjectListEntry from "../components/ProjectListEntry";

export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'Slug', 'Last Modified', 'Publish'],
      sort: [{field: 'Last Modified', direction: 'desc'}],
      filterByFormula: "{Publish} = 1"
    })
    .all();
  
  console.log(records[0])

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
      <ProjectList projects={projects} />
    </>
  )
}