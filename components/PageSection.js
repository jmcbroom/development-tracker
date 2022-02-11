import React from "react";

const PageSection = ({ children, className='', divClassName='', title="test", padding=true }) => {
  return (
    <section className={className}>
      <h2 className="px-4 md:px-7.5">{title}</h2>
      <div className={padding ? "py-4 px-4 md:px-7.5 " + divClassName : 'p-0 ' + divClassName}>
        {children}
      </div>
    </section>
  )
}

export default PageSection;