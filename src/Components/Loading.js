import React from 'react';

class Loading extends React.Component {
  render() {
    return(
      <div className='text-center loading'>
        <i className='fa fa-spin fa-circle-o-notch' />&nbsp;&nbsp;
        {this.props.message ? this.props.message : 'Loading'}
      </div>
    )
  }
}

export default Loading;