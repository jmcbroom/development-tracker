import Image from 'next/image';

const ProjectGallery = ({ images }) => {

  let divStyle = {
    background: `rgba(100,0,100,0.2)`,
    padding: `1em`
  }

  return (
    <div style={divStyle}>
      <h3>Project image gallery</h3>
      {images && images.map(i => (
        <div key={i.id}>
          <Image 
            src={i.thumbnails.large.url} 
            width={i.thumbnails.large.width}
            height={i.thumbnails.large.height}
            alt={i.filename.replace(".png", "")} 
            />
            <p>
              {i.filename.replace(".png", "")}
            </p>
        </div>
      ))}
    </div>
  )
}

export default ProjectGallery;