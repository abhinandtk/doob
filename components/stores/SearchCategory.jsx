import React, { Fragment } from 'react'

function SearchCategory() {
  return (
    <Fragment>
        <section className='my-2' >
    <h5>Category</h5>
    <div className="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-outline-secondary" style={{padding:'5px 34px'}}>All</button>
    
  </div>
  
    <div className="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-secondary" >Football</button>
    
  </div>
  <div className="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-secondary">Tennis</button>
    
  </div>
  <div className="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-secondary">Volleyball</button>
    
  </div>
  <div className="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-secondary">Basketball</button>
    
  </div>
  <div className="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-secondary">Biliard</button>
    
  </div>
  <div className="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-secondary">Squash</button>
    
  </div>
  
  
  
    </section>
    </Fragment>
  )
}

export default SearchCategory