import { Modal, Select, Switch } from "antd";
import Image from "next/image";
import { useState } from "react";
type WasherStep =
  | "Detergent"
  | "Softener"
  | "Bleach"
  | "INPUT 4"
  | "INPUT 5"
  | "INPUT 6";
const PresetSetup = () => {
  const [washerStep, setWasherStep] = useState<WasherStep>("Detergent");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presets, setPresets] = useState([1]);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
    <div className=" w-full h-[1000px]  flex flex-col text-base gap-y-[4.75rem]">
      <div className=" flex flex-col gap-y-[.85rem]">
        <h1 className=" heading">PRESET SETUP</h1>
        <div className=" flex flex-col gap-y-5 w-full">
          {presets.map((e, i) => {
            return (
              <div
                key={i}
                className=" bg-[#F5F5F5] w-full p-[1.35rem] flex items-center justify-between"
              >
                <div className=" flex flex-col gap-y-5">
                  <p className=" text-[1.25rem] text-[#868686] font-black">
                    Sheets
                  </p>
                  <button
                    onClick={handleOpenModal}
                    className=" cursor-pointer gap-x-[.3rem] py-2 w-[10rem] font-bold rounded-[.25rem] button-primary text-black flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" w-[1.2rem] h-[1.2rem]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.55 3.9L20.1 12.45L8.55 24H0V15.45L11.55 3.9ZM11.55 8.25L3 16.8V21H7.2L15.75 12.45L11.55 8.25ZM15.6 0L24 8.55L21.45 11.1L12.9 2.55L15.6 0Z"
                        fill="black"
                      />
                    </svg>
                    <p>Edit</p>
                  </button>
                </div>
                <div className=" flex gap-x-2 overflow-scroll px-5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="  text-[1rem] font-black flex flex-col items-center justify-center gap-y-4"
                      >
                        <div className=" flex flex-col items-center justify-center gap-y-1">
                          <p>SEQUENCE {e}</p>
                          <Select
                            className=" preset !w-full !font-bold rounded-[.25rem] !bg-[#F5F5F5] text-black flex items-center justify-center"
                            defaultValue=""
                            style={{ width: 120 }}
                            onChange={onChange}
                            showSearch
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={[
                              { value: "DETERGENT", label: "DETERGENT" },
                              { value: "SOFTENER", label: "SOFTENER" },
                              { value: "COLORBLEACH", label: "COLOR BLEACH" },
                              { value: "", label: "NONE" },
                            ]}
                          />
                          <p>ACTION</p>
                        </div>
                        <div className=" flex flex-col items-center justify-center gap-y-1">
                          <input className=" py-1 border px-4 border-black w-[7.85rem]"></input>
                          <p>DEALAY</p>
                        </div>
                        <div className=" flex flex-col items-center justify-center gap-y-1">
                          <input className=" py-1 border px-4 border-black w-[7.85rem]"></input>
                          <p>ML</p>
                        </div>
                      </div>
                    );
                  })}
                  <div className=" flex items-center gap-y-5"></div>
                </div>
                <div className=" flex items-center gap-x-5 text-[1.2rem] font-black">
                  <div className=" flex flex-col items-center gap-y-2">
                    <p>FLUSH</p>
                    <Switch defaultChecked />
                  </div>
                  <div className=" flex flex-col items-center gap-y-2">
                    <p>TRIGGER</p>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {
            setPresets((p) => {
              const newArr = [...p];
              newArr.push(1);
              return newArr;
            });
          }}
          className=" hover:border cursor-pointer h-[13rem] w-full bg-[#F5F5F5] flex items-center justify-center gap-x-4"
        >
          <Image
            className=""
            src="/add.png"
            alt="Next.js Logo"
            width={50}
            height={50}
            priority
          />
          <p className=" text-[#868686] text-[1.2rem] font-bold">ADD PRESET</p>
        </div>
      </div>
    </div>
  );
};
export default PresetSetup;
