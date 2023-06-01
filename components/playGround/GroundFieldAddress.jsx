import React from "react";
import { Fragment } from "react";

function  GroundFieldAddress({ address }) {
  return (
    <Fragment>
      <div className="col-md-6">
        <h5>Field Address</h5>
        {/* {address && address.map((item, index) => ( */}
        {address && address[0]&&
          <div  className="card carts">
            <div className="card-body cart-info p-4">
              <div className="cart-location">
                <svg
                  width="30"
                  height="19"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.75781 11C7.10665 11 5.75781 9.65718 5.75781 7.99612C5.75781 6.33506 7.10665 5 8.75781 5C10.409 5 11.7578 6.34282 11.7578 8.00388C11.7578 9.66494 10.409 11 8.75781 11ZM8.75781 6.16429C7.75006 6.16429 6.9206 6.98706 6.9206 8.00388C6.9206 9.0207 7.74231 9.84347 8.75781 9.84347C9.77332 9.84347 10.595 9.0207 10.595 8.00388C10.595 6.98706 9.76556 6.16429 8.75781 6.16429Z"
                    fill="black"
                  />
                  <path
                    d="M8.75518 19C7.49288 19 6.22206 18.5053 5.23269 17.5249C2.71662 15.0163 -0.0638392 11.0149 0.985232 6.25384C1.93195 1.93445 5.57385 0 8.75518 0C8.75518 0 8.75518 0 8.76371 0C11.945 0 15.5869 1.93445 16.5337 6.26267C17.5742 11.0237 14.7937 15.0163 12.2777 17.5249C11.2883 18.5053 10.0175 19 8.75518 19ZM8.75518 1.32497C6.27323 1.32497 3.08337 2.6941 2.239 6.54533C1.31786 10.7057 3.84246 14.292 6.12824 16.5621C7.60376 18.0372 9.91513 18.0372 11.3906 16.5621C13.6679 14.292 16.1925 10.7057 15.2884 6.54533C14.4355 2.6941 11.2371 1.32497 8.75518 1.32497Z"
                    fill="black"
                  />
                </svg>

                <h5 className="mx-4 text-cart">
                  {address[0].stadium_name[0].stadium_name}
                </h5>
                <img src="/images/edit.png" className="mt-2 edits"></img>
              </div>

              <p className="cart-place">{address[0].stadium_name[0].location}, Kuwait</p>
            </div>
          </div>}
        {/* ))} */}
      </div>
    </Fragment>
  );
}

export default GroundFieldAddress;
