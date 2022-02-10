const Tag = ({ type, value }) => {

  let colors = {
    use: {
      'No data': 'rgba(223, 255, 247, 1)',
      'Entertainment': 'rgba(246, 222, 255, 1)',
      'Hotel': 'rgba(245, 255, 181, 1)',
      'Office': 'rgba(223, 251, 255, 1)',
      'Park': 'rgba(212, 255, 192, 1)',
      'Residential': 'rgba(234, 240, 255, 1)',
      'Retail': 'rgba(255, 211, 186, 1)',
      'Transportation': 'rgba(255, 217, 240, 1)',
      'Warehouse': 'rgba(207, 251, 240, 1)',
    },
    status: {
      'Unclear': `rgba(223, 255, 247, 1)`,
      'Speculative': `rgba(181, 255, 146, 1)`,
      'For Sale': `rgba(182, 255, 211, 1)`,
      'Proposed': `rgba(194, 211, 255, 1)`,
      'Under construction': `rgba(255, 173, 127, 1)`,
      'Stalled': `rgba(236, 236, 236, 1)`,
    },
    type: {
      'New': `rgba(162, 237, 225, 1)`,
      'Rehab': `rgba(255, 211, 144, 1)`
    }
  }

  return (
    <span 
      className="text-xs leading-7 px-4 font-dmmono" 
      style={{ backgroundColor: colors[type][value] }}>
        {value}
    </span>
  )

}

export default Tag;