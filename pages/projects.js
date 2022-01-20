import Airtable from "airtable"
import ProjectList from "../components/ProjectList";
import ProjectListEntry from "../components/ProjectListEntry";
import { getProjectObject } from "../utils/getProject";
import Link from 'next/link'

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
  
  const projects = records.map((project) => getProjectObject(project));

  return {
    props: {
      projects,
    },
  };
}

export default function ListPage({ projects }) {

  return (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl leading-6 pb-6">List of Detroit development projects</h3>
      <p className="text-lg leading-7">Click on any project for more details. See something missing? Report it <Link href={`/submit-a-tip`}>here</Link>.</p>
      <ProjectList projects={projects} />
    </div>
  )
}