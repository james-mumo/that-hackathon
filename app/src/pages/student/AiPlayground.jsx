import React, { useState } from "react";
import OpenAI from "openai";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";


const AiPlayground = () => {
  const [assistantResponse, setAssistantResponse] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [question, setQuestion] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionSubmit = async () => {
    setIsLoading(true)
    const apiKey = process.env.REACT_APP_OPEN_AI;
    console.log(apiKey)
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    const messages = [{ role: "user", content: question }];

    const params = {
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 350,
    };

    try {
      const response = await openai.chat.completions.create(params);
      if (response) {
        console.log(response)
        const assistantResponse = response.choices[0].message.content;
        setAssistantResponse(assistantResponse);
        setResponseHistory([...responseHistory, assistantResponse]);
        setQuestion("")
        setIsLoading(false)
      } else {
        console.error("Error:", response);
        setIsLoading(false)
        toast.error(response);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setIsLoading(false)
      toast.error(error)
    }
  };

  const handleGridItemClick = (value) => {
    setQuestion(value);
    handleQuestionSubmit();
  };

  const handleImageGenerate = async () => {
    const apiKey = process.env.REACT_APP_OPEN_AI;
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    try {
      const image = await openai.images.generate({
        prompt: imagePrompt,
      });

      console.log(image.data[0].url);

      // Extract the image URL from the response
      const imageUrl = image.data[0].url;
      setImageURL(imageUrl);
    } catch (error) {
      console.error("Image generation failed:", error);
    }
  };

  return (
    <div className="flex flex-col rounded-md h-screen w-full bg">
      <div className="flex flex-col bg-slate-800 h-[99vh]">
        <span className="flex items-center mb-2">
          <hr className="border-t border-slate-400 mx-1 w-4" />
          <span className="text-primary text-xl italic md:text-xl font-semibold">
            AI Playground
          </span>
          <hr className="border-t border-slate-400 mx-1 flex-grow" />
        </span>

        <div className="flex flex-1 gap-2 p-2 h-[95vh]">
          <div className="flex flex-col flex-1 rounded-md bg-gray-900 p-2">
            <span className="py-2">Running on : <span className="font-semibold">gpt-3.5-turbo</span></span>
            <form className="flex relative flex-col h-[80vh] rounded-md p-1" action="">
              {isLoading && <div className="absolute h-full w-full flex justify-center items-center"><CircularProgress /></div>}

              <label>Ask a Question:</label>
              {responseHistory.length <= 0 && (
                <div className="grid grid-cols-2 gap-4 p-2 h-full">
                  <div className="grid-item bg-slate-950 border p-4 rounded-md font-semibold flex justify-center items-center" onClick={() => handleGridItemClick("What are the fundamentals of JavaScript?")}>
                    What are the fundamentals of JavaScript?
                  </div>
                  <div className="grid-item bg-slate-950 border p-4 rounded-md font-semibold flex justify-center items-center" onClick={() => handleGridItemClick("How does CSS flexbox work?")}>
                    How does CSS flexbox work?
                  </div>
                  <div className="grid-item bg-slate-950 border p-4 rounded-md font-semibold flex justify-center items-center" onClick={() => handleGridItemClick("What is the significance of REST in web development?")}>
                    What is the significance of REST in web development?
                  </div>
                  <div className="grid-item bg-slate-950 border p-4 rounded-md font-semibold flex justify-center items-center" onClick={() => handleGridItemClick("How to get Rich Quickly in Nairobi?")}>
                    How to get Rich Quickly in Nairobi?
                  </div>
                  <div className="grid-item bg-slate-950 border p-4 rounded-md font-semibold flex justify-center items-center" onClick={() => handleGridItemClick("What is the difference between Apple and Mango??")}>
                    What is the difference between Apple and Mango?
                  </div>
                  <div className="grid-item bg-slate-950 border p-4 rounded-md font-semibold flex justify-center items-center" onClick={() => handleGridItemClick("Best practices for responsive web design")}>
                    Best practices for responsive web design
                  </div>
                </div>)}

              {/* Display response history */}
              {responseHistory.length > 0 && (
                <div className="chat-history border p-2 rounded-md h-[70vh] overflow-hidden]">
                  <h3 className="font-semibold">Chat History:</h3>
                  <ul className="flex flex-col h-[60vh] gap-3 overflow-y-scroll rounded-md p-2">
                    {responseHistory.map((response, index) => (
                      <li className="bg-slate-800 p-3 rounded-md border border-gray-500" key={index}>{response}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col bottom-0">
                <TextField
                  label="Enter Prompt"
                  type="text"
                  value={question}
                  style={{ color: "white" }}
                  onChange={(e) => setQuestion(e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
                  inputProps={{ style: { fontFamily: "Arial", color: "white", borderRadius: "2px" } }}
                />

                <Button variant="contained" onClick={handleQuestionSubmit}>
                  Submit Prompt
                </Button>
              </div>
            </form>
          </div>


          <div className="flex flex-col rounded-md bg-gray-900 p-2 overflow-y-scroll flex-1">
            <span className="pb-4">Running on : <span className="font-semibold">text-davinci-002</span></span>
            <div className="border p-2 rounded-md">

              {imageURL && <img src={imageURL} alt="Generated AI" className="h-[550px] w-full border rounded-md overflow-hidden p-3" />}
              <TextField
                label="Enter Prompt"
                type="text"
                value={imagePrompt}
                style={{ color: "white" }}
                onChange={(e) => setImagePrompt(e.target.value)}
                variant="outlined"
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                  sx: {
                    color: "white",
                  },
                }}
                inputProps={{ style: { fontFamily: "Arial", color: "white", borderRadius: "2px" } }}
              />
              <Button variant="contained" onClick={handleImageGenerate}>
                Submit Prompt
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AiPlayground;
