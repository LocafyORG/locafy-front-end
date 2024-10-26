import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Productions() {

  return (
    
    <div>
      <h1>Productions</h1>
      <Link to="/productions/create">Create Production</Link>
    </div>
  );
}

export default Productions;