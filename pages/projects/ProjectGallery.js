import Image from 'next/image';

const ProjectGallery = ({ images }) => {

  return (
    <section>
      <h3>Project image gallery</h3>
      {images && images.map(i => (
        <div key={i.id}>
          <Image 
            src={i.thumbnails.large.url} 
            width={i.thumbnails.large.width / 4}
            height={i.thumbnails.large.height / 4}
            alt={i.filename.replace(".png", "")} 
            />
            <span>
              {i.filename.replace(".png", "")}
            </span>
        </div>
      ))}
    </section>
  )
}

export default ProjectGallery;