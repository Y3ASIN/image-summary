// const data =
//   "https://images.pexels.com/photos/19845825/pexels-photo-19845825/free-photo-of-a-tent-is-set-up-in-the-woods-at-night.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load";

const url =
  "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
const authToken = "Bearer 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";

export async function generateTextToImage(data) {
  const formData = data;
  const response = await fetch(url, {
    headers: {
      Authorization: authToken,
    },
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  return result;
}

// generateTextToImage("./img/img1.jpg").then((response) => {
//   //console.log(JSON.stringify(response));
//   console.log(response[0].generated_text);
// });
