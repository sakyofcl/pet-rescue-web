import { NavLink } from "react-router-dom";
import { About } from "./about";
import { Contact } from "./contact";

export const Home = ()=>{
    return (
        <div className="home-screen">
            <div class="hero_area">
                <section class="slider_section long_section">
                    <div id="customCarousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="container ">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <div class="detail-box">
                                                <h1>
                                                Bringing Joy<br/>
                                                to Liverpool
                                                </h1>
                                                <p>
                                                At Springfield Pet Rescue, our mission is simple yet profound: to bring joy and companionship into the lives of both animals and humans. We are dedicated to the welfare of pets and are proud to serve the Liverpool area with our rehoming services.
                                                </p>
                                                <div class="btn-box">
                                                    <NavLink className="btn1" to="/contact">Contact Us</NavLink>
                                                    <NavLink className="btn2" to="/about">About Us</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-7">
                                            <div class="img-box">
                                                <img src="https://uniquepetcare.com/wp-content/uploads/2023/04/banner.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="mb-4">
                <About/>
            </div>
            <section class="client_section layout_padding-bottom">
                <div class="container">
                <div class="heading_container">
                    <h2>
                    Testimonial
                    </h2>
                </div>
                <div id="carouselExample2Controls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row">
                        <div class="col-md-11 col-lg-10 mx-auto">
                            <div class="box">
                            <div class="img-box">
                                <img src="https://storage.googleapis.com/pai-images/faef7470bf724e5580f873921a902bda.jpeg" alt="" />
                            </div>
                            <div class="detail-box">
                                <div class="name">
                                <i class="fa fa-quote-left" aria-hidden="true"></i>
                                <h6>
                                    Siaalya
                                </h6>
                                </div>
                                <p>
                                It is a long established fact that a reader will be
                                distracted by the readable cIt is a long established fact
                                that a reader will be distracted by the readable c
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                        <div class="col-md-11 col-lg-10 mx-auto">
                            <div class="box">
                            <div class="img-box">
                                <img src="https://vas.care/wp-content/uploads/2022/08/pexels-mikhail-nilov-7474085-1.jpg" alt="" />
                            </div>
                            <div class="detail-box">
                                <div class="name">
                                <i class="fa fa-quote-left" aria-hidden="true"></i>
                                <h6>
                                    Siaalya
                                </h6>
                                </div>
                                <p>
                                It is a long established fact that a reader will be
                                distracted by the readable cIt is a long established fact
                                that a reader will be distracted by the readable c
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row">
                        <div class="col-md-11 col-lg-10 mx-auto">
                            <div class="box">
                            <div class="img-box">
                                <img src="https://ca-times.brightspotcdn.com/dims4/default/1afa949/2147483647/strip/true/crop/2623x2400+0+0/resize/1200x1098!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff3%2Fa0%2F3c4866bf4f3691872ba39ae0d221%2Fsd-me-harvey-adoption.jpg" alt="" />
                            </div>
                            <div class="detail-box">
                                <div class="name">
                                <i class="fa fa-quote-left" aria-hidden="true"></i>
                                <h6>
                                    Siaalya
                                </h6>
                                </div>
                                <p>
                                It is a long established fact that a reader will be
                                distracted by the readable cIt is a long established fact
                                that a reader will be distracted by the readable c
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="carousel_btn-container">
                    <a class="carousel-control-prev" href="#carouselExample2Controls" role="button" data-slide="prev">
                        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExample2Controls" role="button" data-slide="next">
                        <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>
                </div>
                </div>
            </section>

            <div>
                <Contact/>
            </div>
        </div>
    );
}