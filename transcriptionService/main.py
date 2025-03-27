from fastapi import FastAPI, File, UploadFile, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import whisper
import torch
import edge_tts
from io import BytesIO
import librosa
import json
from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost:3000",  # React development server
    "http://127.0.0.1:3000",  # In case you access via this URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # Allowed origins
    allow_credentials=True,       # Allow cookies and credentials
    allow_methods=["*"],          # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],          # Allow all headers
)

@app.post("/audio/")
async def upload_audio(audio: UploadFile = File()):

    # Read the file content into memory
    contents = audio.file.read()
    # print("got audio from server")
    audio_bytes = BytesIO(contents)
    # For direct loading with librosa
    audio, sr = librosa.load(audio_bytes)  # whisper expects 16kHz
    if sr != 16000:
        # Resample to 16kHz if needed
        audio = librosa.resample(audio, orig_sr=sr, target_sr=16000)

    model = whisper.load_model("tiny.en")
    transcription = model.transcribe(audio)

    # now = datetime.now()
    # current_time = now.strftime("%H:%M:%S")
    # print("reached /audio/ at:", current_time)

    return {"transcription": transcription["text"]}

@app.post("/text")
async def tts(request: Request):

    voice = "en-US-AriaNeural"

    request_body = await request.body()
    request_str = request_body.decode("utf-8")
    
    # Load the JSON data and extract the "text" value
    data = json.loads(request_str)
    input_text = data.get("text")

    # Clean data before sending to the model
    input_text = input_text.replace("*", "")
    # model saying e.g which is mega cringe, try to remove that

    # Create the Communicate object with the text and the selected voice
    communicate = edge_tts.Communicate(input_text, voice, rate="+10%")
    audio_data = bytearray()

    #  Collect audio chunks as they are streamed from the service.
    async for message in communicate.stream():
        if message.get("type") == "audio":
            audio_data.extend(message.get("data", b""))
    
    # now = datetime.now()
    # current_time = now.strftime("%H:%M:%S")
    # print("reached /text/ at:", current_time)

    # Return the audio file as a binary response
    return StreamingResponse(
        BytesIO(audio_data),
        media_type="audio/mpeg",
        headers={"Content-Disposition": "inline; filename=speech.mp3"}
    )