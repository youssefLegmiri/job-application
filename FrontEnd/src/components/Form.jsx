import { useActionState, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import PDFIcon from "../assets/pdf.svg";
import settings from "../assets/settings.svg";
const Form = () => {
  const [isReady, setIsReady] = useState(false);
  const [state, actionFunction, isPending] = useActionState(formAction, {
    error: null,
    pdfBlob: null,
    fileName: "",
  });

  async function formAction(prevState, formData) {
    const jsonData = Object.fromEntries(formData.entries());
    const LocalEndPoint = "http://localhost:5000/api/GeneratePDF";
    const RemoteEndPoint = "http://192.168.11.103/GeneratePDF";
    try {
      const res = await fetch(LocalEndPoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (res.ok) {
        const blob = await res.blob();
        setIsReady(true);
        return {
          error: null,
          pdfBlob: blob,
          fileName: "myCV.pdf",
        };
      } else {
        const Response = await res.json();
        return { error: Response };
      }
    } catch (error) {
      return { error };
    }
  }

  const handleDownload = () => {
    if (state.pdfBlob) {
      const url = URL.createObjectURL(state.pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "myCV";
      link.click();
      URL.revokeObjectURL(url);
    } else {
      console.log("No file to downlaod !");
    }
  };
  const handlePreview = () => {
    if (state.pdfBlob) {
      const url = URL.createObjectURL(state.pdfBlob);
      window.open(url);
      URL.revokeObjectURL(url);
    } else {
      console.log("No file to preview !");
    }
  };
  const createNewCV = () => {
    setIsReady(false);
  };
  return (
    <form
      action={actionFunction}
      className={`border-[1px] rounded-lg bg-purple-50
                border-purple-500 min-h-[600px]   w-[80%]
                flex flex-col justify-evenly items-center 
                p-4 lg:w-[60%] xl:w-[50%]
                   animate-scaleUp
                 transition-all duration-100
                origin-bottom `}
    >
      {isReady && (
        <Button
          onClick={createNewCV}
          type={"button"}
          text={"Create New CV"}
          className={"btn-custom  "}
        />
      )}
      {isPending && (
        <div className="flex flex-col items-center">
          <img className="w-20 animate-settings" src={settings} alt="" />
          <p className="text-green-600 font-bold">Processing ... </p>
        </div>
      )}
      {isReady && <p className="text-green-600 font-bold"> Completed !</p>}
      {state.error && !isPending && (
        <p className="text-red-600 font-bold">{state.error.message} </p>
      )}
      {!isReady && (
        <>
          <Input
            autofocus={true}
            name={"FirstName"}
            type={"text"}
            label={"First Name"}
          />
          <Input name={"LastName"} type={"text"} label={"Last Name"} />
          <Input name={"email"} type={"email"} label={"Email"} />
          <Input name={"message"} as="textarea" label={"message"} />
        </>
      )}
      {!isReady && (
        <Button
          isPending={isPending}
          action={"Creating..."}
          type={"submit"}
          text={"Create"}
          className={"btn-custom disabled:bg-purple-500 "}
        />
      )}
      {isReady && (
        <div className="flex flex-col justify-between w-[100%]  h-[50%] items-center ">
          <img className="w-20" src={PDFIcon} alt="" />
          <p className="text-zinc-800 ">{state.fileName}</p>

          <div
            className="flex flex-col items-center justify-between  h-[40%]  w-[80%]
                          md:flex-row md:w-[70%] xl:w-[60%]  "
          >
            <Button
              type={"button"}
              onClick={handleDownload}
              text={"Download"}
              className={"btn-custom"}
            />
            <Button
              type={"button"}
              onClick={handlePreview}
              text={"Preview"}
              className={"btn-custom"}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
