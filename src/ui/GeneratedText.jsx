/* eslint-disable react/prop-types */
function Output({ generatedText}) {
    return(
        <div className="block border-dashed border-2 rounded-md p-4 my-3 text-slate-600">
          {generatedText}
        </div>
    );
}
export default Output;