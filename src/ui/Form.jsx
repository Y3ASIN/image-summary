import { useState } from "react";
import { useForm } from "react-hook-form";

import GeneratedText from "./GeneratedText";

function Form() {
  const { register, handleSubmit, reset } = useForm();
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url =
    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
  const authToken = "Bearer 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";

  async function onSubmit(data) {
    setIsLoading(true);
    const formData = data.image[0];

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: authToken,
        },
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      setResult(result);
      return result;
    } catch (error) {
      console.log("Error during fetch", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setResult(null);
  }

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
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className=" bg-sky-200 px-5 py-3 rounded-lg my-4 text-sky-600 hover:bg-sky-300"
            >
              {isLoading ? "Loading..." : "Generate Summary"}
            </button>
            <button
              className="bg-red-200 px-5 py-3 rounded-lg my-4 hover:bg-red-400"
              disabled={isLoading}
              onClick={() => handleClear(reset())}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {!result ? (
        <GeneratedText generatedText="Wait a sec..." />
      ) : (
        <GeneratedText generatedText={result[0]?.generated_text} />
      )}
    </div>
  );
}
export default Form;
