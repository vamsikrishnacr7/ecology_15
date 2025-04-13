import AnimatedTitle from "./AnimatedTitle";

const Team = () => {

return(
<div id = "team" className = "relative h-dvh w-screen overflow-x-hidden flex-col items-center justify-center">
    <h1 className = "text-center font-bold text-[20px] md:text-[40px]">OUR TEAM</h1>
    <div>
        <img src = "img/ourteam.png"   className=" size-full object-cover object-center"/>
    </div>
</div>

)
}

export default Team;