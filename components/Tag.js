const Tag = ({ type, value, gray=false }) => {

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
      'Industrial': 'rgba(207, 251, 240, 1)',
      'Commercial': 'rgba(255, 243, 181, 1)',
      'Parking': `rgba(228, 232, 243, 1)`,
      'Education': `rgba(255, 227, 156, 1)`,
      'Religious': `rgba(235, 228, 255, 1)`,
      'Social services': `rgba(255, 236, 232, 1)`,
    },
    status: {
      'Unclear': `rgba(223, 255, 247, 1)`,
      'Speculative': `rgba(250, 193, 255, 1)`,
      'For sale': `rgba(182, 255, 211, 1)`,
      'Proposed': `rgba(194, 211, 255, 1)`,
      'Under construction': `rgba(255, 173, 127, 1)`,
      'Stalled': `rgba(236, 236, 236, 1)`,
      'Complete': `rgba(181, 255, 146, 1)`
    },
    type: {
      'New': `rgba(162, 237, 225, 1)`,
      'Rehab': `rgba(255, 211, 144, 1)`
    }
  }

  return (
    <span 
      className="text-xs leading-7 px-4 font-dmmono h-7.5 inline-block" 
      style={{ backgroundColor: gray ? 'rgba(255, 255, 255, 1)' : colors[type][value] }}>
        {value}
    </span>
  )

}

export default Tag;