

import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";

const Result = () => {
    const [image, setImage] = useState(assets.sample_img_1); // default image
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const { generateImage } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (input) {
            const generatedImage = await generateImage(input);
            console.log("Generated image response:", generatedImage);
            if (generatedImage) {
                setImage(generatedImage); // set base64 string
                setIsImageLoaded(true);
            }
        }

        setLoading(false);
    };

    return (
        <motion.form
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmitHandler}
            className="flex items-center justify-center flex-col min-h-[90vh]"
        >
            <div className="relative">
                <img
                    src={image}
                    alt="Generated"
                    className="max-w-sm max-h-[500px] rounded"
                    style={{ display: "block" }}
                />
                <span
                    className={`absolute bottom-0 left-0 h-1 bg-blue-500 pointer-events-none ${
                        loading ? "w-full transition-all duration-[10s]" : "w-0"
                    }`}
                />
            </div>

            <p className={!loading ? "hidden" : ""}>Loading.....</p>

            {!isImageLoaded && (
                <div className="flex w-full max-w-xl text-white bg-neutral-500 text-sm p-0.5 mt-10 rounded-full">
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        type="text"
                        className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
                        placeholder="Describe what you want to generate "
                    />
                    <button
                        type="submit"
                        className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer hover:text-green-500 hover:bg-white "
                    >
                        Generate
                    </button>
                </div>
            )}

            {isImageLoaded && (
                <div className="flex gap-2 justify-center flex-wrap text-white text-sm mt-10 p-0.5 rounded-full">
                    <p
                        onClick={() =>{ setIsImageLoaded(false);
                             setInput("");}

                        }
                        className="bg-transparent border border-zinc-900 px-10 py-3 rounded-full cursor-pointer text-black hover:text-lime-200"
                    >
                        Generate Another
                    </p>

                    <a
                        href={image}
                        download="generated.png"
                        className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:text-cyan-300"
                    >
                        Download
                    </a>
                </div>
            )}
        </motion.form>
    );
};

export default Result;
