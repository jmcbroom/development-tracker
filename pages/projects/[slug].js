import { useRouter } from 'next/router'
import Airtable from "airtable"
import Link from 'next/link'
import Layout from '../../components/layout';
import RecordGeom from '../../components/RecordGeom';

export async function getStaticPaths(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      fields: ['Name', 'Slug'],
    })
    .all();

    const projects = records.map((proj) => {
      return {
        params: {
          name: proj.get("Name"),
          slug: proj.get("Slug") || null,
        }
      }
    });

    return {
      paths: projects,
      fallback: false
    };
}

export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base('apptXJJeHse3v7SAS')('Projects')
    .select({
      // fields: ['Name', 'Status', 'Address', 'Link', 'the_geom'],
      filterByFormula: `Slug="${context.params.slug}"`
    })
    .all();

    const projects = records.map((proj) => {
      return {
        id: proj.id,
        name: proj.get('Name'),
        status: proj.get('Status') || null,
        link: proj.get('Link') || null,
        the_geom: proj.get('the_geom') || null,
      };
    });

    console.log('getStaticProps', projects[0])

    return {
      props: {
        proj: projects[0],
      },
    };
}

const ProjectPage = (props) => {
  console.log(props)
  let {proj} = props;
  console.log(proj)
  return (
    <Layout>

    <div>
      <p>Record ID: {proj.id}</p>
      <p>Project: {proj.name}</p>
      {proj.link && <p><Link href={proj.link}>Website</Link></p>}
      <RecordGeom id={proj.id} geom={proj.the_geom} />
    </div>
    </Layout>
  )
}

export default ProjectPage;
