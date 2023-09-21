import React from "react";

export const Footer = ()=>{
    return (
        <>
            <section className="info_section long_section">
                <div className="container">
                    <div className="contact_nav">
                        <a href="">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <span>
                            Call : +01 123455678990
                        </span>
                        </a>
                        <a href="">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        <span>
                            Email : demo@gmail.com
                        </span>
                        </a>
                        <a href="">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        <span>
                            Location
                        </span>
                        </a>
                    </div>
                </div>
            </section>

            <footer className="footer_section">
                <div className="container">
                <p>
                    &copy; <span id="displayYear"></span> All Rights Reserved By
                    <a href="/">Pooja</a>
                </p>
                </div>
            </footer>
        </>

    );
}