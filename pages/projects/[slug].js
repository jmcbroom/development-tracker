import { useRouter } from 'next/router'
import Airtable from "airtable"
import Link from 'next/link'
import Layout from '../../components/layout';
import ProjectHeader from './ProjectHeader';
import ProjectParcel from './ProjectParcel';
import ProjectMap from './ProjectMap';
import ProjectGallery from './ProjectGallery';


// getStaticPaths returns an array of URL paths
// these represent individual projects
export async function getStaticPaths(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
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

// for each staticPath/project, we now fetch the props
// with another call to Airtable, using the project slug
export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
    .select({
      // fields: ['Name', 'Status', 'Address', 'Link', 'the_geom'],
      filterByFormula: `Slug="${context.params.slug}"`
    })
    .all();

    const projects = records.map((proj) => {
      return {
        id: proj.id,

        // ProjectHeader fields
        name: proj.get('Name'),
        synopsis: proj.get('Synopsis'),
        status: proj.get('Status') || null,
        link: proj.get('Link') || null,
        buildType: proj.get('Build type') || null,
        uses: proj.get('Uses') || null,

        // ProjectParcel fields
        parcelId: proj.get('Parcel ID') || null,

        // ProjectMap fields
        the_geom: proj.get('the_geom') || null,

        // ProjectGallery fields
        images: proj.get('Images') || null
      };
    });

    return {
      props: {
        proj: projects[0],
      },
    };
}

const ProjectPage = (props) => {
  let {proj} = props;
  console.log(proj)
  return (
    <Layout>

    <div>
      <ProjectHeader name={proj.name} synopsis={proj.synopsis} status={proj.status} uses={proj.uses} />
      <ProjectParcel parcelId={proj.parcelId} />
      <ProjectMap id={proj.id} geom={proj.the_geom} />
      {proj.images && <ProjectGallery images={proj.images} />}
    </div>
    </Layout>
  )
}

export default ProjectPage;
