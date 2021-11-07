import Image from 'next/image';

const ProjectGallery = ({ images }) => {

  let divStyle = {
    background: `rgba(100,0,100,0.2)`,
    padding: `1em`
  }

  console.log(images)

  return (
    <div className="p-3 bg-gray-100">
      <h3>Project image gallery</h3>
      {images && images.map(i => (
        <div key={i.id} className="mb-2">
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
    </div>
  )
}

export default ProjectGallery;