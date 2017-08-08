import React from 'react';
import ReactDOM from 'react-dom';
import SimilarSearch from './Components/SimilarSearch';
import CombinationFinder from './Components/CombinationFinder';

var similarSearchEl = document.getElementById('similar-search');
if(similarSearchEl) {
  ReactDOM.render(
    <div>
      <SimilarSearch />
    </div>,
    similarSearchEl
  );
}

var combinationFinderEl = document.getElementById('combination-finder');
if(combinationFinderEl) {
  ReactDOM.render(
    <div>
      <CombinationFinder />
    </div>,
    combinationFinderEl
  );
}
