import React from "react";
import Provider from './Provider';
import Results from './Results';
import Filters from './Filters';

const VersionContext = () => {
  return (
    <Provider>
      <Filters />
      <Results />
    </Provider>
  );
};

export default VersionContext;