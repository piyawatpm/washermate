import Image from "next/image";
import { Switch, Modal, Select } from "antd";
import { useState } from "react";

const PumpSetup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className=" w-full h-[1000px]  flex flex-col text-base gap-y-[2rem]">
      <Modal
        title=""
        open={isModalOpen}
        // onOk={handleOk}
        closeIcon={null}
        // style={{ backgroundColor: 'transparent' }}
        centered
        footer={null}
        // onCancel={handleCancel}
        className=" !w-[75rem] !"
        closable={false}
        onCancel={handleCloseModal}
        bodyStyle={{ height: "100%" }}
      >
        <div className=" flex h-full w-full flex-col items-center justify-center  gap-y-[1.35rem]  ">
          <div className=" text-[1.4rem] font-black  ">OUTPUT 1</div>
          <div className=" w-full flex items-center text-base font-bold px-[7.3rem]">
            <div className=" flex flex-col gap-y-2 w-2/5 pl-2">
              <p>Name</p>
              <input
                type="text"
                value={"DETERGENT"}
                className=" w-full pl-[1.65rem] py-4 bg-[#D9D9D9]"
              />
            </div>
            <div className=" w-3/5 flex items-center gap-x-4 pl-2">
              <div className=" flex flex-col gap-y-2 w-2/5">
                <p>STEP PER SECOND</p>
                <input
                  type="text"
                  value={"DETERGENT"}
                  className=" w-full pl-[1.65rem] py-4 bg-[#D9D9D9]"
                />
              </div>
              <div className=" flex flex-col gap-y-2 w-2/5">
                <p>STEP PER ML</p>
                <input
                  type="text"
                  value={"DETERGENT"}
                  className=" w-full pl-[1.65rem] py-4 bg-[#D9D9D9]"
                />
              </div>
              <div className=" flex flex-col gap-y-2 w-2/5">
                <p>ML PER KG</p>
                <input
                  type="text"
                  value={"DETERGENT"}
                  className=" w-full pl-[1.65rem] py-4 bg-[#D9D9D9]"
                />
              </div>
            </div>
          </div>
          <div className=" flex items-center text-[1.4rem] font-bold text-white w-full justify-center gap-x-[9rem] mt-[2.45rem]">
            <button
              onClick={handleCloseModal}
              className=" w-[8rem] h-[3.2rem] bg-black "
            >
              CANCEL
            </button>
            <button
              onClick={handleCloseModal}
              className=" w-[8rem] h-[3.2rem] bg-black "
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
      <h1 className="heading">PUMP</h1>
      <div className=" flex w-full items-center justify-between max-w-screen-xl">
        {[1, 2, 3, 4, 5, 6].map((e, i) => {
          return (
            <div key={i} className=" h-[600px] flex flex-col gap-y-2">
              <Select
                className=" !w-full !font-bold rounded-[.25rem] !bg-[#F5F5F5] text-black flex items-center justify-center"
                defaultValue="DETERGENT"
                style={{ width: 120 }}
                onChange={onChange}
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                options={[
                  { value: "DETERGENT", label: "DETERGENT" },
                  { value: "SOFTENER", label: "SOFTENER" },
                  { value: "COLORBLEACH", label: "COLOR BLEACH" },
                ]}
              />

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
              <div className=" flex-1 flex flex-col items-center bg-[#F5F5F5] w-full rounded-[.25rem] pt-[.85rem] pb-[1.85rem]">
                <h1 className=" text-[1.2rem] font-black">PUMP {e}</h1>
                <div className=" mt-[1.35rem] flex flex-col gap-y-[1.35rem]">
                  <div className=" flex flex-col gap-y-1 items-center">
                    <h2 className=" text-[#868686] text-[2rem] font-black">
                      320
                    </h2>
                    <p className="  text-[.8rem] font-bold">Step Per Second</p>
                  </div>
                  <div className=" flex flex-col gap-y-1 items-center">
                    <h2 className=" text-[#868686] text-[2rem] font-black">
                      320
                    </h2>
                    <p className="  text-[.8rem] font-bold">Steps per ml.</p>
                  </div>
                  <div className=" flex flex-col gap-y-1 items-center">
                    <h2 className=" text-[#868686] text-[2rem] font-black">
                      1
                    </h2>
                    <p className="  text-[.8rem] font-bold">ml per kg</p>
                  </div>
                </div>
                <div className=" flex flex-col items-center gap-y-3 mt-auto">
                  {" "}
                  <Switch defaultChecked />
                  <p className=" text-[.8rem] font-bold">Flush</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PumpSetup;
