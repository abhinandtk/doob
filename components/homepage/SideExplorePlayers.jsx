import React from 'react'

function SideExplorePlayers() {
  return (
    
    <section className="side-menu-section ">
        <div className="side-menu__suggestions-section">
        <div className="side-menu__suggestions-header">
            <h2>Explore New Player's</h2>
            
        </div>    
        <div className="side-menu__suggestions-content">
            <div className="side-menu__suggestion">
            <a href="#" className="side-menu__suggestion-avatar">
                <img src="../images/unsplash_Zrh274DQA6s.png" alt="User Picture" />
            </a>
            <div className="side-menu__suggestion-info">
                <a href="#"> David Maxwell</a>
                <span>Followed by Muhammhad Alsalah and 12 more</span>
            </div>
            <button className="side-menu__suggestion-button">Follow</button>
            </div>
            <div className="side-menu__suggestion">
            <a href="#" className="side-menu__suggestion-avatar">
                <img src="../images/unsplash_EqOTqiGQAdk.png" alt="User Picture" />
            </a>
            <div className="side-menu__suggestion-info">
                <a href="#"> Ajmal Ashraf</a>
                <span>Followed by David Maxwell and 9 more</span>
            </div>
            <button className="side-menu__suggestion-button">Follow</button>
            </div>
            <div className="side-menu__suggestion">
            <a href="#" className="side-menu__suggestion-avatar">
                <img src="../images/unsplash_u6eu4uF4JIo.png" alt="User Picture" />
            </a>
            <div className="side-menu__suggestion-info">
                <a href="#">Al Kazim bin Abdulla</a>
                <span>Followed by Ajmal Ashraf and 12 more</span>
            </div>
            <button className="side-menu__suggestion-button">Follow</button>
            </div>
            <div className="side-menu__suggestion">
            <a href="#" className="side-menu__suggestion-avatar">
                <img src="../images/unsplash_r-krWscXjvQ.png" alt="User Picture" />
            </a>
            <div className="side-menu__suggestion-info">
                <a href="#">
                Dilshad Muhammad</a>
                <span>Followed by Ajmal Ashraf and 12 more</span>
            </div>
            <button className="side-menu__suggestion-button">Follow</button>
            </div>
            <div className="side-menu__suggestion">
            <a href="#" className="side-menu__suggestion-avatar">
                <img src="../images/unsplash_bXUydgWzpnQ.png" alt="User Picture" />
            </a>
            <div className="side-menu__suggestion-info">
                <a href="#">
                Al Marvan bin Hussain</a>
                <span>Followed by David Maxwell and 12 more
                </span>
            </div>
            <button className="side-menu__suggestion-button">Follow</button>
            </div>
        </div>
        <img src="../images/Group 1000003423.png"></img>
        </div>
    </section>
  )
}

export default SideExplorePlayers