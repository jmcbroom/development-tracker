import { faChevronCircleRight, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AnimateHeight from "react-animate-height";

const SiteSection = ({ title = 'Site section', open = true, closes = true, children }) => {

  let [showChildren, setShowChildren] = useState(open)

  return (
    <section>
      <div className="flex items-center justify-between py-1">
        <h1 className="m-0">{title}</h1>
        {closes && <FontAwesomeIcon 
          icon={showChildren ? faChevronCircleDown : faChevronCircleRight} 
          onClick={() => setShowChildren(!showChildren)} className="text-lg max-h-4" 
        />}
      </div>
      <AnimateHeight
        duration={250}
        height={showChildren ? 'auto' : 0}>
        <div className="mt-2">
          {children}
        </div>
      </AnimateHeight>
    </section>
  )
}

export default SiteSection;