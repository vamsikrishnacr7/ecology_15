import React from 'react';
import styles, {layout} from '../style';
import Button1 from './Button1';

const CardDeal = ({paratext}) => {
  return (
    <section className={`${layout.section} bg-primary px-6`}>
        <div className = {`${layout.sectionInfo}`}>
            <h2 className = {styles.heading2}>Find a better card deal <br className = "sm:block hidden"/> in few easy steps.</h2>
            <p className = {`${styles.paragraph} max-w-[470px] mt-5`}>
                {paratext}
            </p>
            <Button1 styles = "mt-10"/>
        </div>

        <div className={layout.sectionImg}>
            <img src="img/hydra.png" alt="card" className = "w-[100%] h-[100%]" />
        </div>
       
    </section>
  )
}

export default CardDeal