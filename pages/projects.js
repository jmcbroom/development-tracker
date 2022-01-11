import Airtable from "airtable"
import ProjectList from "../components/ProjectList";
import ProjectListEntry from "../components/ProjectListEntry";
import { getProjectObject } from "../utils/getProject";

export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'Slug', 'Last Modified', 'Publish', 'Address', 'Uses', 'Status'],
      sort: [{field: 'Last Modified', direction: 'desc'}],
      filterByFormula: "{Publish} = 1"
    })
    .all();
  
  console.log(records[0])

  const projects = records.map((project) => getProjectObject(project));

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