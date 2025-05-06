import AnimatedTitle from "./AnimatedTitle";

const Team = () => {
  return (
    <div id="team" className="relative w-screen overflow-x-hidden flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-center font-bold text-[20px] md:text-[40px] mb-6">OUR TEAM</h1>
      <div className="w-full max-w-4xl">
        <img src="img/ourteam.png" className="w-full h-auto object-cover object-center rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Team;
