import React, { Fragment } from "react";

function TimeLineCard({ data }) {
  console.log("timeline", data);
  return (
    <Fragment>
      <div className="contain ">
        {data && data.map((item,index)=>(
          <div key={index} className={`${item.team_B_id ?'timeline-block timeline-block-right':'timeline-block timeline-block-left'}`}>
            <div className="marker"></div>
            <div className="timeline-content">
              <span>{item.text} {item.time}</span>
            </div>
          </div>
        ))}
        {/* <div className="timeline-block timeline-block-left ">
          <div className="marker"></div>
          <div className="timeline-content">
            <span>Goal by Al Imran - 30’</span>
          </div>
        </div>

        <div className="timeline-block timeline-block-right ">
          <div className="marker"></div>
          <div className="timeline-content">
            <span>Goal by Ali Sadath - 38</span>
          </div>
        </div> */}

        {/* <div className="timeline-block timeline-block-left ">
          <div className="marker"></div>
          <div className="timeline-content">
            <span>Goal by Al Imran - 40’</span>
          </div>
        </div> */}

        {/* <div className="timeline-block timeline-block-right ">
          <div className="marker"></div>
          <div className="timeline-content">
            <span>Goal by Ahamed - 66’</span>
          </div>
        </div>

        <div className="timeline-block timeline-block-right ">
          <div className="marker"></div>
          <div className="timeline-content">
            <span>Goal by Ahamed - 66’</span>
          </div>
        </div>

        <div className="timeline-block timeline-block-left ">
          <div className="marker"></div>
          <div className="timeline-content">
            <span>Goal by Al Imran - 40’</span>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
}

export default TimeLineCard;
