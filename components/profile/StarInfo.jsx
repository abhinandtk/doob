import { Modal } from "antd";
import React, { useState } from "react";
import { Fragment } from "react";

function StarInfo() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Fragment>
      <Modal
        title="Star User"
        open={showTooltip}
        onCancel={() => setShowTooltip(false)}
        closable
        maskClosable
        centered
        footer={null}
      >
        <div className="star-info-content">
          <p>To become a Star User, unlock special recognition!</p>
          <ul>
            <li>
              Shine Bright: Your profile will be highlighted as a Star User,
              setting you apart from others.
            </li>
            <li>
              Exclusive Access: Gain early access to new features, updates, and
              exciting opportunities.
            </li>
            <li>
              Priority Support: Receive top-notch assistance with any questions
              or issues you may encounter.
            </li>
            <li>
              Community Recognition: Be recognized and celebrated for your
              valuable contributions within our community.
            </li>
          </ul>
          <p>
            Become a Star User today and experience the perks of standing out!
          </p>
        </div>
      </Modal>

      <span className="mx-1" onClick={() => setShowTooltip(true)}>
        <img
          src="/images/accounts/iconoir_help-circles.png"
          className=" mb-1"
        ></img>
      </span>
    </Fragment>
  );
}

export default StarInfo;
