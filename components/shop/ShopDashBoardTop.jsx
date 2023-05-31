import React from "react";
import { Card } from "react-bootstrap";

function ShopDashBoardTop() {
  return (
    <div className="carl">
      <div className="document  ">
        <Card className="doc-card">
          <Card.Body>
            <Card.Title className=" mt-2">
              <svg
                width="31"
                height="28"
                viewBox="0 0 31 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.99 27.0783C13.4788 25.8524 17.2505 17.0104 24.9144 15.3166C24.9288 15.3166 24.9427 15.311 24.9528 15.301C24.963 15.291 24.9688 15.2775 24.9688 15.2633C24.9688 15.2492 24.963 15.2356 24.9528 15.2256C24.9427 15.2156 24.9288 15.21 24.9144 15.21C23.623 14.7007 15.7298 11.3191 13.2194 3.2115C13.2194 3.19737 13.2136 3.18381 13.2034 3.17381C13.1933 3.16382 13.1794 3.1582 13.165 3.1582C13.1506 3.1582 13.1368 3.16382 13.1266 3.17381C13.1165 3.18381 13.1107 3.19737 13.1107 3.2115C12.803 4.55586 10.7331 11.7573 1.0415 15.0561C1.02943 15.06 1.01892 15.0675 1.01147 15.0776C1.00401 15.0877 1 15.0998 1 15.1123C1 15.1248 1.00401 15.1369 1.01147 15.147C1.01892 15.1571 1.02943 15.1647 1.0415 15.1686C2.39326 15.3936 9.17616 17.0282 12.8814 27.102C12.8883 27.1115 12.8979 27.1188 12.909 27.123C12.92 27.1272 12.9322 27.1281 12.9438 27.1255C12.9554 27.123 12.9659 27.1172 12.9742 27.1088C12.9824 27.1004 12.9879 27.0898 12.99 27.0783Z"
                  stroke="#17A803"
                  stroke-width="1.52528"
                />
                <path
                  d="M24.9915 11.2321C25.1783 10.706 26.6147 6.91601 29.5391 6.19073V6.14096C29.0495 5.92764 26.0414 4.47708 25.0817 1H25.0366C24.9206 1.58307 24.1348 4.66907 20.4375 6.06985V6.11963C20.9528 6.21918 23.5358 6.91602 24.9464 11.2393L24.9915 11.2321Z"
                  stroke="#17A803"
                  stroke-width="1.59277"
                />
              </svg>
              <span>
                
                <Card.Subtitle
                  style={{
                    float: "right",
                    fontWeight: "500",
                    fontSize: "19px",
                  }}
                  className="mt-2  "
                >
                   <h4 className="management-number1">5</h4>
                </Card.Subtitle>
              </span>
            </Card.Title>

            <div
              className="mt-4"
              style={{ float: "right", fontSize: "14px" }}
            >
              <h5 className="ml-5 new-orders">New Orders</h5>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="document ">
        <Card className="doc-card">
          <Card.Body>
            <Card.Title className=" mt-2">
              <svg
                width="29"
                height="28"
                viewBox="0 0 29 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.43807 14.0173C3.43794 12.4942 3.74507 10.9868 4.34111 9.58513C4.93714 8.18348 5.80983 6.91645 6.90695 5.85983C8.00407 4.80322 9.30309 3.97873 10.7263 3.43569C12.1495 2.89266 13.6676 2.64223 15.1898 2.69941C15.3613 2.7057 15.5324 2.67815 15.6933 2.61834C15.8541 2.55853 16.0017 2.46762 16.1274 2.35081C16.2531 2.234 16.3546 2.09358 16.426 1.93755C16.4975 1.78153 16.5375 1.61296 16.5438 1.44148C16.5501 1.26999 16.5225 1.09895 16.4627 0.938105C16.4029 0.777265 16.312 0.629781 16.1952 0.504073C16.0783 0.378365 15.9379 0.276896 15.7818 0.205458C15.6258 0.13402 15.4572 0.094013 15.2857 0.087721C12.752 -0.00631883 10.2407 0.592288 8.02202 1.81911C5.80332 3.04593 3.96126 4.85452 2.6941 7.0502C1.42694 9.24588 0.782662 11.7455 0.83062 14.2801C0.878577 16.8146 1.61695 19.2881 2.96627 21.4343C4.31558 23.5805 6.22474 25.3181 8.48826 26.4601C10.7518 27.6022 13.284 28.1054 15.8122 27.9156C18.3405 27.7258 20.7691 26.8502 22.8367 25.383C24.9043 23.9159 26.5326 21.9127 27.5463 19.5891C27.6849 19.2714 27.6917 18.9117 27.565 18.589C27.4384 18.2664 27.1888 18.0072 26.871 17.8686C26.5533 17.73 26.1935 17.7232 25.8708 17.8499C25.5481 17.9765 25.2889 18.2261 25.1503 18.5438C25.0324 18.8115 24.9045 19.0748 24.7669 19.333C23.5809 21.5648 21.6823 23.3358 19.3733 24.3641C17.0644 25.3924 14.4778 25.6189 12.0252 25.0077C9.57256 24.3964 7.39493 22.9825 5.83885 20.9909C4.28277 18.9993 3.43768 16.5446 3.43807 14.0173ZM19.5148 2.23596C19.677 1.93 19.954 1.7009 20.285 1.59897C20.6159 1.49705 20.9738 1.53064 21.2801 1.69237C21.5885 1.85614 21.8899 2.03037 22.1827 2.21505C22.328 2.30646 22.4539 2.42559 22.5532 2.56563C22.6524 2.70568 22.7231 2.8639 22.7612 3.03127C22.7993 3.19864 22.8041 3.37187 22.7752 3.54108C22.7464 3.71029 22.6845 3.87216 22.5931 4.01745C22.5016 4.16274 22.3825 4.2886 22.2424 4.38785C22.1024 4.4871 21.9441 4.55779 21.7767 4.59589C21.6093 4.63399 21.4361 4.63875 21.2668 4.6099C21.0976 4.58106 20.9357 4.51916 20.7904 4.42776C20.5518 4.277 20.3077 4.13519 20.0585 4.00264C19.9068 3.92236 19.7723 3.81298 19.6629 3.68073C19.5534 3.54849 19.4711 3.39598 19.4206 3.23192C19.3701 3.06786 19.3525 2.89546 19.3686 2.72457C19.3848 2.55368 19.4345 2.38765 19.5148 2.23596ZM24.7669 6.19095C25.0602 6.00644 25.4147 5.94593 25.7526 6.0227C26.0904 6.09948 26.384 6.30727 26.5687 6.60039C26.7534 6.89309 26.9277 7.19276 27.0915 7.50289C27.1718 7.65459 27.2214 7.82061 27.2376 7.99149C27.2537 8.16237 27.2361 8.33476 27.1856 8.49881C27.1351 8.66286 27.0528 8.81537 26.9433 8.94761C26.8339 9.07986 26.6995 9.18926 26.5478 9.26957C26.3961 9.34988 26.23 9.39952 26.0591 9.41567C25.8882 9.43181 25.7158 9.41414 25.5517 9.36366C25.3876 9.31319 25.2351 9.23089 25.1028 9.12148C24.9706 9.01206 24.8612 8.87767 24.7808 8.72597C24.649 8.47624 24.5077 8.23157 24.3574 7.99247C24.1729 7.69925 24.1123 7.34477 24.1891 7.00695C24.2659 6.66912 24.4737 6.37562 24.7669 6.19095ZM27.3406 12.2384C27.5122 12.2321 27.6832 12.2597 27.8441 12.3195C28.005 12.3793 28.1525 12.4702 28.2782 12.587C28.4039 12.7038 28.5054 12.8443 28.5769 13.0003C28.6483 13.1563 28.6883 13.3249 28.6946 13.4964C28.7068 13.8168 28.708 14.1376 28.6981 14.4581C28.6872 14.8047 28.5391 15.1327 28.2864 15.3701C28.0336 15.6075 27.6968 15.7347 27.3502 15.7239C27.0036 15.713 26.6755 15.5649 26.4381 15.3122C26.2007 15.0595 26.0734 14.7228 26.0843 14.3762C26.093 14.1149 26.093 13.8534 26.0843 13.5922C26.0715 13.2461 26.1967 12.9092 26.4323 12.6554C26.6679 12.4015 26.9946 12.2516 27.3406 12.2384Z"
                  fill="#17A803"
                />
                <path
                  d="M13.7503 5.88281C14.0964 5.88281 14.4284 6.01388 14.6731 6.24718C14.9178 6.48048 15.0553 6.7969 15.0553 7.12684V13.4067L18.6833 15.1367C18.838 15.2089 18.9761 15.3096 19.0898 15.4329C19.2035 15.5563 19.2904 15.6998 19.3456 15.8553C19.4008 16.0109 19.4232 16.1753 19.4114 16.3391C19.3996 16.5029 19.354 16.6628 19.277 16.8097C19.2001 16.9566 19.0934 17.0875 18.9632 17.1949C18.8329 17.3023 18.6816 17.3841 18.518 17.4355C18.3545 17.4869 18.1819 17.5069 18.0101 17.4944C17.8384 17.4819 17.671 17.4372 17.5175 17.3627L13.1674 15.2893C12.9505 15.1861 12.768 15.0272 12.6404 14.8306C12.5129 14.6341 12.4453 14.4075 12.4453 14.1763V7.12684C12.4453 6.7969 12.5828 6.48048 12.8275 6.24718C13.0723 6.01388 13.4042 5.88281 13.7503 5.88281Z"
                  fill="#17A803"
                />
              </svg>
              <span>
                
                <Card.Subtitle
                  style={{
                    float: "right",
                    fontWeight: "500",
                    fontSize: "19px",
                  }}
                  className="mt-2   "
                >
                 <h4 className="management-number1">5</h4>
                </Card.Subtitle>
              </span>
            </Card.Title>

            <div
              className="mt-4"
              style={{ float: "right", fontSize: "14px" }}
            >
              <h5 className="ml-5 process-order ">Processing Orders</h5>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="document ">
        <Card className="doc-card">
          <Card.Body>
            <Card.Title className=" mt-2">
              <svg 
                width="26"
                height="29"
                viewBox="0 0 26 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5974 7.26021H23.8456C24.1026 7.26046 24.3503 7.35608 24.5408 7.52854C24.7312 7.70099 24.8509 7.93801 24.8766 8.19366L25.5093 14.5204H23.4225L22.9039 9.33455H19.5974V12.4461C19.5974 12.7211 19.4881 12.985 19.2936 13.1795C19.0991 13.374 18.8353 13.4832 18.5602 13.4832C18.2851 13.4832 18.0213 13.374 17.8268 13.1795C17.6323 12.985 17.523 12.7211 17.523 12.4461V9.33455H9.22566V12.4461C9.22566 12.7211 9.11639 12.985 8.92188 13.1795C8.72738 13.374 8.46357 13.4832 8.18849 13.4832C7.91342 13.4832 7.64961 13.374 7.4551 13.1795C7.26059 12.985 7.15132 12.7211 7.15132 12.4461V9.33455H3.84274L2.18326 25.9293H13.3744V28.0037H1.03615C0.891285 28.0035 0.748057 27.973 0.615693 27.9142C0.48333 27.8553 0.364766 27.7693 0.267642 27.6619C0.170517 27.5544 0.0969847 27.4277 0.0517831 27.2901C0.00658145 27.1525 -0.00928748 27.0069 0.00519901 26.8628L1.87211 8.19366C1.8978 7.93801 2.01748 7.70099 2.20795 7.52854C2.39842 7.35608 2.64612 7.26046 2.90306 7.26021H7.15132V6.53626C7.15132 2.93935 9.92264 0 13.3744 0C16.8261 0 19.5974 2.93935 19.5974 6.53626V7.26228V7.26021ZM17.523 7.26021V6.53626C17.523 4.05949 15.652 2.07435 13.3744 2.07435C11.0967 2.07435 9.22566 4.05949 9.22566 6.53626V7.26228H17.523V7.26021ZM24.051 22.6933C24.1456 22.5904 24.2601 22.5076 24.3875 22.4501C24.5149 22.3925 24.6526 22.3612 24.7924 22.3583C24.9322 22.3553 25.0712 22.3806 25.2009 22.4326C25.3307 22.4847 25.4486 22.5625 25.5475 22.6613C25.6465 22.7601 25.7244 22.8779 25.7766 23.0075C25.8289 23.1372 25.8544 23.2761 25.8516 23.4159C25.8488 23.5557 25.8178 23.6935 25.7604 23.821C25.703 23.9485 25.6204 24.0631 25.5176 24.1578L21.3689 28.3065C21.1744 28.501 20.9106 28.6102 20.6356 28.6102C20.3606 28.6102 20.0968 28.501 19.9023 28.3065L15.7536 24.1578C15.6546 24.0621 15.5756 23.9477 15.5212 23.8212C15.4668 23.6946 15.4382 23.5585 15.437 23.4208C15.4358 23.2831 15.4621 23.1465 15.5142 23.0191C15.5664 22.8916 15.6434 22.7758 15.7408 22.6784C15.8382 22.581 15.954 22.504 16.0814 22.4519C16.2089 22.3997 16.3455 22.3735 16.4832 22.3747C16.6209 22.3759 16.757 22.4045 16.8835 22.4588C17.0101 22.5132 17.1245 22.5922 17.2202 22.6913L19.5974 25.0705V17.6319C19.5974 17.3569 19.7067 17.093 19.9012 16.8985C20.0957 16.704 20.3595 16.5948 20.6346 16.5948C20.9096 16.5948 21.1734 16.704 21.368 16.8985C21.5625 17.093 21.6717 17.3569 21.6717 17.6319V25.0705L24.051 22.6913V22.6933Z"
                  fill="#17A803"
                />
              </svg>
              <span>
                
                <Card.Subtitle
                  style={{
                    float: "right",
                    fontWeight: "500",
                    fontSize: "19px",
                  }}
                  className="mt-2 "
                >
                  <h4 className="management-number1">5</h4>
                </Card.Subtitle>
              </span>
            </Card.Title>

            <div
              className="mt-4"
              style={{ float: "right", fontSize: "14px" }}
            >
              <h5 className="ml-5 dispatch-order">Dispatched Orders</h5>
            </div>
          </Card.Body>
        </Card>
      </div>

    </div>



  );
}

export default ShopDashBoardTop;
