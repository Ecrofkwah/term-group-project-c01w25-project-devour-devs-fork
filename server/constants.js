export const AI_ASSISTANT_MODEL = "gemini-2.0-flash";
export const STEP_BY_STEP_PROMPT = "Break the instructions into clear sequential steps, bolded. " +
                                    "Provide any necessary elaboration or clarification for each step below it, wrapped in exactly '<div class='comment'>'. " +
                                    "Respond with an HTML code segment that is not an entire document. Your entire response should be only be the HTML code."
                                    //"IMPORTANT: wrap each tip within a <div className='tip'> /<div>. " +
                                    "Bold each original step. " +
                                    "Do not visually label any of the comments:"