import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import PageSection from '../PageSection';

const ProjectGallery = ({ images }) => {

  let [index, setIndex] = useState(0)

  let maxHeight = images.map(i => i.thumbnails.large.height).sort().reverse()[0]

  return (
    <PageSection title={`What does it look like?`} className='row-span-2 col-span-1 md:col-span-2 pb-15' padding={false} divClassName='h-full px-8 flex items-center justify-between'>
      <>
        {
          images.length > 1 &&
          <FontAwesomeIcon
            className={index > 0 ? "mr-4 h-6 bg-calblue rounded-full w-6 text-white p-1.5" : "mr-4 h-6 opacity-40 bg-calblue rounded-full w-6 text-white p-1.5"}
            icon={faArrowLeft}
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1)
              }
              else {
                return;
              }
            }} />
        }

        <div className={images.length > 1 ? 'w-4/5 flex items-center' : 'w-full flex items-center'} style={{height: maxHeight * .7}}>
          <Image
            src={images[index].thumbnails.large.url}
            width={images[index].thumbnails.large.width * .8}
            height={images[index].thumbnails.large.height * .8}
            alt={images[index].filename.replace(".png", "")}
          />
        </div>
        {
          images.length > 1 &&
          <FontAwesomeIcon
            className={index + 1 < images.length ? "ml-4 h-6 bg-calblue rounded-full w-6 text-white p-1.5" : "ml-4 h-6 bg-calblue opacity-40 rounded-full w-6 text-white p-1.5"}
            icon={faArrowRight}
            onClick={() => {
              if (index + 1 < images.length) {
                setIndex(index + 1)
              }
              else {
                return;
              }
            }} />
        }      
      </>
    </PageSection>
  )
}

export default ProjectGallery;