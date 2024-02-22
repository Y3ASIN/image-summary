import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { generateTextToImage } from "../utils/service";
import GeneratedText from "../ui/GeneratedText";

function Form() {
  const { register, handleSubmit, reset } = useForm();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (!file) return;

  //       const formData = new FormData();
  //       formData.append("file", file);

  //       const response = await fetch(
  //         "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: "Bearer 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",
  //           },
  //           body: formData,
  //         },
  //       );
  //       const data = await response.json();
  //       //   setData(data);
  //       console.log(data);
  //     };
  //     fetchData();
  //   }, [file]);

  // async function onSubmit(data) {
  //   setLoading(true);

  //   // const formData = new FormData();
  //   const formData = data.image[0];
  //   // formData.append("image", data.image[0]);

  //   try {
  //     console.log(loading);
  //     const response = await fetch(
  //       "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",

  //       {
  //         headers: {
  //           Authorization: "Bearer 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",
  //         },
  //         method: "POST",
  //         body: formData,
  //       },
  //     );
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log(result);

  //     setResult(result);
  //     return result;
  //   } catch (error) {
  //     console.log("Error during fetch", error);
  //   }
  // }

  // useEffect(() => {
  //   setResult(null);
  // }, []);
  // useEffect(() => {
  //   setLoading(false);
  // }, [loading]);
  // const url =
  //   "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
  // const authToken = "Bearer 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";

  // useEffect(() => {
  //      fetch(url, {
  //       headers: {
  //         authorization: authToken,
  //       },
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));

  // }, []);

  async function onSubmit(data) {
    setLoading(true);
    setResult(generateTextToImage(data.image[0]));
    setLoading(false);
  }
  console.log(result);

  return (
    <div className="mx-auto w-full max-w-80 mt-[10%]">
      <form className="block" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full max-w-80">
          <div className="mt-6 mb-5">
            <label htmlFor="image" className="block my-3 border-y-2 py-3">
              <h2 className="text-5xl text-center">Image to text</h2>
            </label>
            <div className="border-dashed border-2 border-sky-500 p-5 rounded-md">
              <input
                className="text-slate-500 w-full text-sm file:mr-4 file:border-0 file:bg-sky-100 file:py-2 file:px-3 file:text-sky-600 file:rounded-full file:text-sm hover:file:bg-sky-200"
                {...register("image")}
                type="file"
                name="image"
                required="Upload an image"
                accept="image/*"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={loading}
              className=" bg-sky-200 px-5 py-3 rounded-lg my-4 text-sky-600 hover:bg-sky-300"
            >
              {loading ? "Loading..." : "Generate Summary"}
            </button>
            <button
              className="bg-red-200 px-5 py-3 rounded-lg my-4 hover:bg-red-400"
              disabled={loading}
              onClick={() => reset()}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {!result ? (
        <GeneratedText generatedText="Upload an image" />
      ) : (
        <GeneratedText generatedText={result[0]?.generated_text} />
      )}
    </div>
  );
}
export default Form;
