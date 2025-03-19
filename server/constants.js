export const AI_ASSISTANT_MODEL = "gemini-2.0-flash";
/*export const STEP_BY_STEP_PROMPT = "Task for Gemini: " + 
                                    "Respond with an HTML code segment that is not an entire document. Your entire response should be only be the HTML code." +
                                    "Only <div> and plain text should be used. No list formatting etc." +
                                    "Break the instructions given into clear sequential steps. Do not label the steps. DO NOT BOLD ANY TEXT." +
                                    "Provide any necessary elaboration or clarification for each step below it, wrapped in exactly '<div class='comment'>'. " +
                                    "Wrap each step with its associated clarification/elaboration in exactly <div class='step'>. " +
                                    "Wrap the entire code segment in a <div class='step-container'>. " +
                                    //"IMPORTANT: wrap each tip within a <div className='tip'> /<div>. " +
                                    "Bold each original step. " +
                                    "Do not visually label any of the comments. " +
                                    "Instructions: "*/

export const STEP_BY_STEP_PROMPT = "Task for Gemini:\n" +
                                    "Given: Instructions\n" +
                                    "Return: A segment of HTML code. " +
                                    "Break the given instructions into clear, sequential steps." +
                                    "Each step should be formatted as follows: " +
                                    "<div class='step'> <b>(current step instructions)</b> <div class='comment'> (Any additional elaboration/clarification of step) </div> </div>" + 
                                    "Wrap the entire code in <div class='step-container'></div>." +
                                    "Follow this exact formatting, do not add any extra formatting.\n"

export const generationConfigSBS = {
    temperature: 0, // deterministic
};