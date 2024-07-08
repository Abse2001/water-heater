import React, { useEffect, useState } from "react";

const Temp = () => {
  const [water, setWater] = useState<{
    temperature: number;
    setPoint: 50;
    operation?: NodeJS.Timeout;
  }>({ temperature: 23, setPoint: 50 });
  const [heater, setHeater] = useState({ state: false });
  useEffect(() => {
    clearInterval(water.operation);
    if (heater.state) {
      setWater((prev) => ({
        ...prev,
        operation: setInterval(() => {
          setWater((prev) => ({
            ...prev,
            temperature:
              prev.temperature < 100 ? prev.temperature + 1 : prev.temperature,
          }));
        }, 500),
      }));
    } else {
      setWater((prev) => ({
        ...prev,
        operation: setInterval(() => {
          setWater((prev) => ({
            ...prev,
            temperature:
              prev.temperature > 23 ? prev.temperature - 1 : prev.temperature,
          }));
        }, 500),
      }));
    }
  }, [heater.state]);
  useEffect(() => {
    if (water.temperature > water.setPoint) window.electronAPI.playSound(true);
    else window.electronAPI.playSound(false);
  }, [water.temperature]);
  return (
    <>
      <div
        className={` h-screen w-screen items-center  relative ${
          heater.state ? "bg-blue-400" : "bg-black"
        }`}
      >
        {heater.state ? (
          <img
            className="rounded-full absolute h-[40%] right-[5%] top-[5%] "
            src="../../assets/pics/sun.png"
            alt="sun"
          />
        ) : (
          <img
            className=" absolute h-[40%] right-[5%] top-[5%]  "
            src="../../assets/pics/moon.png"
            alt="sun"
          />
        )}
        <div className="flex flex-col  justify-center  items-center"></div>
        <div className="flex justify-center flex-col items-center">
          {water.temperature > water.setPoint ? (
            <div>
              <img
                className="h-20 animate-custom -mb-8"
                src="../../assets/pics/.png"
                alt=""
              />
              <img
                className="h-72 absolute selection left-[43%] self-center bottom-6"
                src="../../assets/pics/image.png"
                alt=""
              />
            </div>
          ) : (
            <div>
              <img
                className="h-20 animate-custom -mb-8"
                src="../../assets/pics/.png"
                alt=""
              />
              <img
                className="h-72 absolute selection left-[43%] self-center bottom-6"
                src="../../assets/pics/image.png"
                alt=""
              />
            </div>
          )}
        </div>

        <div
          className={` rounded-full  h-24 w-24 absolute bottom-[13.7%] left-[47.8%] pt-6  justify-center items-center    bg-black text-6xl font-extrabold text-center font-mono ${
            water.temperature > water.setPoint
              ? " text-red-400"
              : "text-green-400"
          }`}
        >
          {water.temperature}
        </div>
        <form className="  border-4 rounded-3xl pb-16 w-[13%] flex justify-center items-center absolute top-[250px] left-[70px] flex-col ">
          <label htmlFor="temperature" className="text-white pb-2 pt-4">
            Ambient Temperature (°C)
          </label>
          <input
            className="h-16 text-[60px] font-semibold w-40 items-center text-center"
            type="number"
            value={water.temperature}
            onChange={(e) =>
              setWater((prev) => ({
                ...prev,
                temperature: Number(e.target.value),
              }))
            }
          />
        </form>
        <button
          className="hover:cursor-pointer border-2 bg-red-500 rounded-3xl w-44 hover:bg-red-800 h-fit absolute top-[60%] left-[5%]  text-white  font-extrabold text-center mb-9 font-mono"
          onClick={() => setHeater((prev) => ({ ...prev, state: !prev.state }))}
        >
          {heater.state ? "Day" : "Night"}
        </button>
      </div>
    </>
  );
};

export default Temp;
