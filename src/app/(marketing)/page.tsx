
export default function Home() {
  return (
    <>
    <div className="welcome-area" id="welcome">

        <div className="header-text">
            <div className="container">
                <div className="row">
                    <div className="left-text col-lg-6 col-md-6 col-sm-12 col-xs-12" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                        <h1>Art Factory is free <strong>for YOU</strong></h1>
                        <p>This template is available for 100% free of charge on TemplateMo. Download, modify and use this for your business website.</p>
                        <a href="#about" className="main-button-slider">Find Out More</a>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                        <img src="assets/images/slider-icon.png" className="rounded img-fluid d-block mx-auto" alt="First Vector Graphic"/>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <section className="section" id="about">
        <div className="container">
            {/* <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                    <img src="assets/images/left-image.png" className="rounded img-fluid d-block mx-auto" alt="App/>
                </div>
                <div className="right-text col-lg-5 col-md-12 col-sm-12 mobile-top-fix">
                    <div className="left-heading">
                        <h5>Vivamus sodales nisi id ante molestie venenatis</h5>
                    </div>
                    <div className="left-text">
                        <p>This template is <a href="#">last updated on 20 August 2019 </a>for main menu drop-down arrow and sub menu text color. Duis auctor dolor eu scelerisque vestibulum. Vestibulum lacinia, nisl sit amet tristique condimentum. 
                        Sed a consequat velit. Morbi lectus sapien, vestibulum et sapien sit amet, ultrices malesuada odio. Donec non quam euismod, mattis dui a, ultrices nisi.</p>
                        <a href="#about2" className="main-button">Discover More</a>
                    </div>
                    
                </div>
            </div> */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="hr"></div>
                </div>
            </div>
        </div>
    </section>


    <section className="section" id="about2">
        <div className="container">
            <div className="row">
                <div className="left-text col-lg-5 col-md-12 col-sm-12 mobile-bottom-fix">
                    <div className="left-heading">
                        <h5>Curabitur aliquam eget tellus id porta</h5>
                    </div>
                    <p>Proin justo sapien, posuere suscipit tortor in, fermentum mattis elit. Aenean in feugiat purus.</p>
                    <ul>
                        <li>
                            <img src="assets/images/about-icon-01.png" alt=""/>
                            <div className="text">
                                <h6>Nulla ultricies risus quis risus</h6>
                                <p>You can use this website template for commercial or non-commercial purposes.</p>
                            </div>
                        </li>
                        <li>
                            <img src="assets/images/about-icon-02.png" alt=""/>
                            <div className="text">
                                <h6>Donec consequat commodo purus</h6>
                                <p>You have no right to re-distribute this template as a downloadable ZIP file on any website.</p>
                            </div>
                        </li>
                        <li>
                            <img src="assets/images/about-icon-03.png" alt=""/>
                            <div className="text">
                                <h6>Sed placerat sollicitudin mauris</h6>
                                <p>If you have any question or comment, please <a rel="nofollow" href="https://templatemo.com/contact">contact</a> us on TemplateMo.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="right-image col-lg-7 col-md-12 col-sm-12 mobile-bottom-fix-big" data-scroll-reveal="enter right move 30px over 0.6s after 0.4s">
                    <img src="assets/images/right-image.png" className="rounded img-fluid d-block mx-auto" alt="App"/>
                </div>
            </div>
        </div>
    </section>

    <section className="section" id="services">
        <div className="container">
            <div className="row">
                <div className="owl-carousel owl-theme">
                    <div className="item service-item">
                        <div className="icon">
                            <i><img src="assets/images/service-icon-01.png" alt=""/></i>
                        </div>
                        <h5 className="service-title">First Box Service</h5>
                        <p>Aenean vulputate massa sed neque consectetur, ac fringilla quam aliquet. Sed a enim nec eros tempor cursus at id libero.</p>
                        <a href="#" className="main-button">Read More</a>
                    </div>
                    <div className="item service-item">
                        <div className="icon">
                            <i><img src="assets/images/service-icon-02.png" alt=""/></i>
                        </div>
                        <h5 className="service-title">Second Box Title</h5>
                        <p>Pellentesque vitae urna ut nisi viverra tristique quis at dolor. In non sodales dolor, id egestas quam. Aliquam erat volutpat. </p>
                        <a href="#" className="main-button">Discover More</a>
                    </div>
                    <div className="item service-item">
                        <div className="icon">
                            <i><img src="assets/images/service-icon-03.png" alt=""/></i>
                        </div>
                        <h5 className="service-title">Third Title Box</h5>
                        <p>Quisque finibus libero augue, in ultrices quam dictum id. Aliquam quis tellus sit amet urna tincidunt bibendum.</p>
                        <a href="#" className="main-button">More Detail</a>
                    </div>
                    <div className="item service-item">
                        <div className="icon">
                            <i><img src="assets/images/service-icon-02.png" alt=""/></i>
                        </div>
                        <h5 className="service-title">Fourth Service Box</h5>
                        <p>Fusce sollicitudin feugiat risus, tempus faucibus arcu blandit nec. Duis auctor dolor eu scelerisque vestibulum.</p>
                        <a href="#" className="main-button">Read More</a>
                    </div>
                    <div className="item service-item">
                        <div className="icon">
                            <i><img src="assets/images/service-icon-01.png" alt=""/></i>
                        </div>
                        <h5 className="service-title">Fifth Service Title</h5>
                        <p>Curabitur aliquam eget tellus id porta. Proin justo sapien, posuere suscipit tortor in, fermentum mattis elit.</p>
                        <a href="#" className="main-button">Discover</a>
                    </div>
                    <div className="item service-item">
                        <div className="icon">
                            <i><img src="assets/images/service-icon-03.png" alt=""/></i>
                        </div>
                        <h5 className="service-title">Sixth Box Title</h5>
                        <p>Ut nibh velit, aliquam vitae pellentesque nec, convallis vitae lacus. Aliquam porttitor urna ut pellentesque.</p>
                        <a href="#" className="main-button">Detail</a>
                    </div>
                    <div className="item service-item">
                        <div className="icon">
                            <i><img src="assets/images/service-icon-01.png" alt=""/></i>
                        </div>
                        <h5 className="service-title">Seventh Title Box</h5>
                        <p>Sed a consequat velit. Morbi lectus sapien, vestibulum et sapien sit amet, ultrices malesuada odio. Donec non quam.</p>
                        <a href="#" className="main-button">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="section" id="frequently-question">
    </section>


    <section className="section" id="contact-us">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div id="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1197183.8373802372!2d-1.9415093691103689!3d6.781986417238027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdb96f349e85efd%3A0xb8d1e0b88af1f0f5!2sKumasi+Central+Market!5e0!3m2!1sen!2sth!4v1532967884907" width="100%" height="500px"  ></iframe>
                    </div>
                </div>
           
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="contact-form">
                        <form id="contact" action="" method="post">
                          <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <fieldset>
                                <input name="name" type="text" id="name" placeholder="Full Name"  className="contact-field"/>
                              </fieldset>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <fieldset>
                                <input name="email" type="text" id="email" placeholder="E-mail"className="contact-field"/>
                              </fieldset>
                            </div>
                            <div className="col-lg-12">
                              <fieldset>
                                <textarea name="message"  id="message" placeholder="Your Message" className="contact-field"></textarea>
                              </fieldset>
                            </div>
                            <div className="col-lg-12">
                              <fieldset>
                                <button type="submit" id="form-submit" className="main-button">Send It</button>
                              </fieldset>
                            </div>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    

    
    </>
  );
}