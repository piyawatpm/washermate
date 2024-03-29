import { Switch, Modal, Select, message } from "antd";
import { useMemo, useState } from "react";

import { PumpType, usePump } from "../_swr/usePump";
import axios from "axios";

const PumpSetup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPump, setCurrentPump] = useState<PumpType | null>(null);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPump(null);
  };
  const { data: pumpData, mutate: refetchPumpData } = usePump();

  const inputOption = useMemo(() => {
    if (pumpData) {
      return pumpData.map((pump) => {
        return { value: pump.pumpId, label: pump.inputName };
      });
    }
  }, [pumpData]);
  console.log("inputOption", inputOption);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  const handleEditPumpData = async () => {
    console.log("call post api");
    try {
      const res = await axios.post(`/api/v1/pump/${currentPump?.pumpNumber}`, {
        ...currentPump,
      });
      console.log(res);
      await refetchPumpData();
      message.success("success");
    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      handleCloseModal();
    }
  };
  const handleChangeInput = async (
    targetPumpNumber: number,
    newInputId: string
  ) => {
    const currentPumpData = pumpData?.find(
      (pump) => pump.pumpNumber === targetPumpNumber
    );
    console.log("call handle Change input");
    // call same api but with new inputId
    try {
      const res = await axios.post(
        `/api/v1/pump/${currentPumpData?.pumpNumber}`,
        {
          ...currentPumpData,
          inputId: newInputId,
        }
      );
      console.log(res);
      message.success("success");
    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      handleCloseModal();
    }
  };
  const handleToggleFlush = async (targetBoolean: boolean, pump: PumpType) => {
    try {
      const res = await axios.post(`/api/v1/pump/${pump?.pumpNumber}`, {
        ...pump,
        isFlush: targetBoolean ? "T" : "F",
      });
      console.log(res);
      await refetchPumpData();
      message.success("success");
    } catch (error) {
      console.log(error);
      message.error(error as string);
    }
  };
  const handleTogglePurge = async (targetBoolean: boolean, pump: PumpType) => {
    try {
      const res = await axios.post(`/api/v1/pump/${pump?.pumpNumber}`, {
        ...pump,
        isPurge: targetBoolean ? "T" : "F",
      });
      console.log(res);
      await refetchPumpData();
      message.success("success");
    } catch (error) {
      console.log(error);
      message.error(error as string);
    }
  };
  return (
    <div className=" w-full h-[1000px]  flex flex-col text-base gap-y-[2rem]">
      <Modal
        title=""
        open={isModalOpen}
        closeIcon={null}
        centered
        footer={null}
        className=" !w-[75rem] !"
        closable={false}
        onCancel={handleCloseModal}
      >
        <div className=" flex h-full w-full flex-col items-center justify-center  gap-y-[1.35rem]  ">
          <div className=" text-[1.4rem] font-black  ">OUTPUT 1</div>

          <div className=" w-full flex items-center gap-x-4  text-base justify-center font-bold px-[7.3rem]">
            <div className=" flex flex-col gap-y-2 w-2/5">
              <p>STEP PER SECOND</p>
              <input
                type="number"
                onChange={(e) => {
                  setCurrentPump((p) => {
                    if (p) {
                      return {
                        ...p,
                        stepPerSecond: Number(e.target.value),
                      } as unknown as PumpType;
                    } else return p;
                  });
                }}
                value={currentPump?.stepPerSecond ?? ""}
                className=" w-full px-[1.65rem] py-4 bg-[#D9D9D9]"
              />
            </div>
            <div className=" flex flex-col gap-y-2 w-2/5">
              <p>STEP PER ML</p>
              <input
                type="number"
                value={currentPump?.stepPerMl}
                onChange={(e) => {
                  setCurrentPump((p) => {
                    if (p) {
                      return {
                        ...p,
                        stepPerMl: Number(e.target.value),
                      } as unknown as PumpType;
                    } else return p;
                  });
                }}
                className=" w-full px-[1.65rem] py-4 bg-[#D9D9D9]"
              />
            </div>
            <div className=" flex flex-col gap-y-2 w-2/5">
              <p>ML PER KG</p>
              <input
                type="number"
                value={currentPump?.mlPerKg}
                onChange={(e) => {
                  setCurrentPump((p) => {
                    if (p) {
                      return {
                        ...p,
                        mlPerKg: Number(e.target.value),
                      } as unknown as PumpType;
                    } else return p;
                  });
                }}
                className=" w-full px-[1.65rem] py-4 bg-[#D9D9D9]"
              />
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
              onClick={handleEditPumpData}
              className=" w-[8rem] h-[3.2rem] bg-black "
            >
              OK
            </button>
          </div>
        </div>
      </Modal>
      <h1 className="heading">PUMP</h1>
      <div className=" flex w-full items-center justify-between max-w-screen-xl">
        {pumpData?.map((pump, i) => {
          return (
            <div key={i} className=" h-[600px] flex flex-col gap-y-2">
              <Select
                className=" !w-full !font-bold rounded-[.25rem] !bg-[#F5F5F5] text-black flex items-center justify-center"
                defaultValue={pump.inputName}
                style={{ width: 120 }}
                onChange={async (value: string) => {
                  await handleChangeInput(pump.pumpNumber, value);
                }}
                showSearch
                onSearch={onSearch}
                filterOption={filterOption}
                options={inputOption}
              />

              <button
                onClick={() => {
                  setCurrentPump(pump);
                  handleOpenModal();
                }}
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
                <h1 className=" text-[1.2rem] font-black">{pump.pumpName}</h1>
                <div className=" mt-[1.35rem] flex flex-col gap-y-[1.35rem]">
                  <div className=" flex flex-col gap-y-1 items-center">
                    <h2 className=" text-[#868686] text-[2rem] font-black">
                      {pump.stepPerSecond}
                    </h2>
                    <p className="  text-[.8rem] font-bold">Step Per Second</p>
                  </div>
                  <div className=" flex flex-col gap-y-1 items-center">
                    <h2 className=" text-[#868686] text-[2rem] font-black">
                      {pump.stepPerMl}
                    </h2>
                    <p className="  text-[.8rem] font-bold">Steps per ml.</p>
                  </div>
                  <div className=" flex flex-col gap-y-1 items-center">
                    <h2 className=" text-[#868686] text-[2rem] font-black">
                      {pump.mlPerKg}
                    </h2>
                    <p className="  text-[.8rem] font-bold">ml per kg</p>
                  </div>
                </div>
                <div className=" flex flex-col gap-y-5 mt-auto">
                  <div className=" flex flex-col items-center gap-y-3 mt-auto">
                    <Switch
                      onChange={(bool) => {
                        handleToggleFlush(bool, pump);
                      }}
                      checked={pump.isFlush === "T"}
                    />
                    <p className=" text-[.8rem] font-bold">Flush</p>
                  </div>
                  <div className=" flex flex-col items-center gap-y-3 mt-auto">
                    <Switch
                      onChange={(bool) => {
                        handleTogglePurge(bool, pump);
                      }}
                      checked={pump.isPurge === "T"}
                    />
                    <p className=" text-[.8rem] font-bold">Purge</p>
                  </div>
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
