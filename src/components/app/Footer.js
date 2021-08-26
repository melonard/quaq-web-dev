import React, { Component } from 'react'
import tweet from './../twitter.png';
import yt from './../yt.png';
import insta from './../insta.png';
import linkedin from './../linkedin.png';
export default class Footer extends Component {

    render() {
        return (
            <div>
                          <div className="footer-clean">
        <footer>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-4 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="https://www.aquaq.co.uk/">AquaQ Analytics</a></li>
                            <li><a href="https://www.aquaq.co.uk/about-kdb/contact/">Contact Us</a></li>
                            <li><a href="https://www.aquaq.co.uk/careers/">Careers</a></li>
                        </ul>
                    </div>
                    <div> 
                    <a href="https://www.instagram.com/aquaq_analytics/" > <img border="0" src={insta} width="40px" height="40px"></img></a>
                    <a href="https://www.linkedin.com/company/aquaq-analytics" > <img border="0" src={linkedin} width="40px" height="40px"></img></a>
                    <a href="https://twitter.com/AquaQAnalytics" > <img border="0" src={tweet} width="40px" height="40px"></img></a>
                    <a href="https://www.youtube.com/channel/UCLoQnTaaOEc2KGFHydLGyzg" > <img border="0" src={yt} width="40px" height="40px"></img></a>

                    {/* <a href="#" class="fa fa-facebook"></a>
                    <a href="#" class="fa fa-twitter"></a>
                      
                      
                      <a href="https://www.youtube.com/channel/UCLoQnTaaOEc2KGFHydLGyzg"><i class="icon ion-social-youtube"></i></a><a href="https://twitter.com/AquaQAnalytics"><i class="icon ion-social-twitter"></i></a><a href="https://www.instagram.com/aquaq_analytics/"><i class="icon ion-social-instagram"></i></a><a href="https://www.linkedin.com/company/aquaq-analytics/mycompany/"><i class="icon ion-social-linkedin"></i></a>
 */}                        <p className="copyright">AquaQ Analytics © 2014-2021</p>
                    </div>
                </div>
            </div>
        </footer>
    </div></div>

        )
    }
}
