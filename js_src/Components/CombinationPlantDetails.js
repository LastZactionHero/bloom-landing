import React from 'react'

class CombinationPlantDetails extends React.Component {
  render(){
    return(
      <div className='row combination-plant-details'>
        <div className='col-md-6'>
          <div className='combination-plant-search-result' style={{backgroundImage: `url(${this.props.plant.image_url})`}}></div>
        </div>
        
        <div className='col-md-6'>
          <h2>{this.props.plant.common_name}</h2>
          <p>{this.props.plant.description}</p>
          <hr/>
          <div className='detail'><strong>Zones:</strong> {this.props.plant.zones.map((f) => {return f.name}).join(', ')}</div>
          <div className='detail'><strong>Size:</strong> {this.props.plant.size.avg_width} in W x {this.props.plant.size.avg_height} in H</div>
          <div className='detail'><strong>Plant Type:</strong> {this.props.plant.plant_type ? this.props.plant.plant_type.name : null}</div>
          <div className='detail'><strong>Leaf Type:</strong> {this.props.plant.leave_type ? this.props.plant.leave_type.name : null}</div>
          <div className='detail'><strong>Flower Color:</strong> {this.props.plant.flower_color ? this.props.plant.flower_color.name : null}</div>
          <div className='detail'><strong>Foliage Color:</strong> {this.props.plant.foliage_color ? this.props.plant.foliage_color.name : null}</div>
        </div>
      </div>
    )
  }
}

export default CombinationPlantDetails;