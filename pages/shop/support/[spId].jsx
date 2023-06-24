import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/shared/MobileFooter";
import MainHeader from "@/components/shared/headers/MainHeader";
import MainSidebarFixed from "@/components/shared/sidebar/MainSidebarFixed";
import ShopPagesSideBar from "@/components/shop/pages/ShopPagesSideBar";
import React from "react";
import Axios from "axios";
import { Fragment } from "react";
import { useEffect } from "react";
import apis from "@/public/data/my-constants/Apis";
import constants from "@/public/data/my-constants/Constants";
import { useRouter } from "next/router";

import SupportMessages from "@/components/shop/support/SupportMessages";
import { useState } from "react";

function SupportDetailsPage() {
  const router = useRouter();
  const { spId } = router.query;
  const [supportDetails,setSupportDetails]=useState([])
  const [success,setSuccess]=useState(false)
  useEffect(() => {
    Axios.post(
      apis.supportDetail,
      { ticket_no: spId },
      {
        headers: {
          Authorization: `Token ${constants.token_id}`,
        },
      }
    ).then((res) => {
      setSupportDetails(res.data.data)
    });
  }, [spId,success]);
  return (
    <Fragment>
      <MainHeader title="Doob" />
      <MobileHeader />
      <MainSidebarFixed />
      <div className="store-container1">
        <div className="Bottom">
          <ShopPagesSideBar currentPage="support" />

          <div className="content-topic  ">
            <div className="bottom">
              <h6
                className="All-order"
                style={{
                  color: "#17a803",
                  fontWeight: "700",
                  marginBottom: "30px",
                }}
              >
                Ticket Details
              </h6>

              <SupportMessages data={supportDetails} setSuccess={setSuccess}/>
            </div>
          </div>
        </div>
      </div>
      <MobileFooter />
    </Fragment>
  );
}

export default SupportDetailsPage;
