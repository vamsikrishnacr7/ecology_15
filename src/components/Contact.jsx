import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden shadow-lg">
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase tracking-widest text-gray-400">
            {/* Optional Subtitle */}
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br/> new era <br/> t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
