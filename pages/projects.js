import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Airtable from "airtable";
import Link from 'next/link';
import { useState } from "react";
import ProjectList from "../components/ProjectList";
import { getProjectObject } from "../utils/getProject";
import Head from 'next/head'
import { siteTitle } from '../toolkit.config'

export async function getStaticProps(context) {

  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  });

  const records = await airtable
    .base(process.env.AIRTABLE_BASE_ID)('Projects')
    .select({
      sort: [{field: 'Last Modified', direction: 'desc'}],
      filterByFormula: process.env.RECORD_FILTER
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

  let [value, setValue] = useState('')
  let [searchValue, setSearchValue] = useState('')

  return (
    <>
          <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{`Detroit Development Tracker: List of all projects`}</title>
      <meta
        name="description"
        content="Tracking development in Detroit, Michigan."
        key="description"
      />
      <meta property="og:title" content={siteTitle} key="title"/>
      <meta property="og:description" content="Use the Detroit Development Tracker to look up information about real estate development in the city."/>
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <div className="max-w-xl mx-auto">
      <h2>List of Detroit development projects</h2>
      <p className="pt-4 md:pt-6 pb-2">
        Search for developments or browse the list, then click on any project for more details. 
      </p>
      <span className="leading-7 font-light bg-highlight mb-4 text-sm"> See something missing? <Link href={`/submit-a-tip`}>Send a tip</Link> to help track Detroit development.</span>
      <div className="border-1 border-black flex items-center justify-around bg-white mt-4">
        <FontAwesomeIcon icon={faSearch} className="text-xl h-4 ml-4 mr-3 bg-white text-searchblue" />
        <input type="text" className="w-full p-2" id="search" value={value} placeholder="Search for a project" onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && setSearchValue(value) } />
        <button className="border-l-1 border-black bg-seafoam h-10 w-28 flex items-center justify-around" onClick={() => setSearchValue(value)} >
          <FontAwesomeIcon icon={faArrowRight} className="h-4" />
        </button>
      </div>
      <p className="mt-4 italic text-sm text-gray-500 leading-5 font-light">
        Try searching for a street, developer, use (like “residential” or “hotel”), status (like “under construction” or “proposed”) or whatever is on your mind.
      </p>
      <ProjectList projects={projects} search={searchValue}/>
    </div>
</>
  )
}