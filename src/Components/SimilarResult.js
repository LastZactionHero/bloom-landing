import React from 'react';

class SimilarResult extends React.Component {
  handleClick() {
    this.props.clickCallback(this.props.plant);
  }

  render() {
    return(
      <div className='similar-plant-result'>
        <div className={`plant-search-result` } 
             style={{display: 'block', backgroundImage: `url(${this.props.plant.image_url})`}}
             onClick={this.handleClick.bind(this)}>
        </div>
        <div className='name'>
          {this.props.plant.favorite ? <div className='label label-success' style={{display: 'block'}}><strong>* Staff Pick *</strong></div> : null}
          {this.props.plant.common_name}
        </div>
      </div>
    )
  }
}

export default SimilarResult;