import React from 'react';
import styles from '../style';
import Button1 from './Button1';


const ML = () => {
  return (
    <section id= "features" className = {`flex md:flex-row flex-col ${styles.paddingY} bg-primary px-6`}>
        <div className = {`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
            <div className = "flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
                {/* <p className = {`${styles.paragraph}, ml-2`}>
                    <span className = "text-white">20%  </span>
                        Discount For {" "}
                    <span className="text-white">1 Month</span>
                </p> */}
           
            </div>

            <div className = "flex flex-col justify-between items-start w-full">
                <h1 className = "flex-1 font-poppins font-semibold ss:text-[55px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
                    The Next <br className = "sm:block hidden" /> {" "}
                    <span className = "text-gradient">Generation</span> {" "}
                </h1>
            </div>

            <h1 className = "font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100px] leading-[75px] w-full">
                ML Models
            </h1>
            <Button1 styles = "mt-10" buttontext = {"Explore"}/>
            <p className = {`${styles.paragraph} max-w-[470px] mt-5`}>Our next-generation ML model leverages advanced analysis to accurately predict and identify encroached data patterns in real-time. By integrating self-learning algorithms and robust data validation, it ensures high precision and adaptability across diverse datasets.</p>
        </div>

        <div className = {`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
            <img src = "img/robot.png" alt = "billing" className = "w-[100%] h-[100%] relative z-[5]" />
                <div className = "absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient "/>
                <div className = "absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient "/>
                <div className = "absolute z-[0] w-[50%] h-[50%] right-20 bottom-20  blue__gradient "/>
        </div>
    </section>
  )
}

export default ML;