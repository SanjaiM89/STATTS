import pyaudio
import numpy as np
import whisper
import threading
import signal
import sys
import time

# Whisper model initialization
model = whisper.load_model("base")

# Audio parameters
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 16000
CHUNK = 2048  # Increased chunk size for better processing
WIDTH = 2  # 2 bytes for 16-bit audio
BUFFER_SIZE = 1024  # You can adjust this based on your system
SILENCE_THRESHOLD = 100  # Silence threshold for transcription

# Variable to track if recording should continue
recording = True

# Function to record audio
def record_audio():
    p = pyaudio.PyAudio()
    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)
    
    print("Listening... Press Ctrl+C to stop.")
    frames = []

    while recording:  # Keep recording as long as `recording` is True
        try:
            # Read data from the microphone stream
            data = stream.read(CHUNK)
            frames.append(data)

            # Process the audio every 2 seconds (or adjust the duration as needed)
            if len(frames) >= (RATE / CHUNK) * 2:  # Process every 2 seconds
                audio_data = b''.join(frames)
                process_audio(audio_data)
                frames = []  # Clear the frames buffer after processing

        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"Error while recording audio: {e}")
            break

    # Close the stream when done
    print("\nRecording stopped.")
    stream.stop_stream()
    stream.close()
    p.terminate()

# Function to process and transcribe audio
def process_audio(audio_data):
    # Convert audio bytes into a numpy array (int16 type)
    audio_np = np.frombuffer(audio_data, dtype=np.int16)
    
    # Debugging: Check the length of the audio data
    print(f"Audio data length: {len(audio_np)}")
    
    # Convert the audio data to float32 before passing it to Whisper
    audio_float = audio_np.astype(np.float32) / 32768.0  # Normalize the values to [-1, 1]
    
    # Debugging: Check the range of audio data
    print(f"Audio data range: {audio_float.min()} to {audio_float.max()}")

    # Transcribe the audio using Whisper
    try:
        result = model.transcribe(audio_float)
        # Debugging: print transcription result
        print(f"Transcription: {result['text']}")
        
        if not result['text'].strip():
            print("Warning: Empty transcription")
    except Exception as e:
        print(f"Error during transcription: {e}")

# Function to stop recording
def stop_recording(signum, frame):
    global recording
    recording = False
    print("Stopping the audio recording...")

# Function to start recording in a separate thread
def start_recording():
    threading.Thread(target=record_audio, daemon=True).start()

if __name__ == "__main__":
    # Setup signal handler to stop gracefully on Ctrl+C
    signal.signal(signal.SIGINT, stop_recording)

    # Start the audio recording in a separate thread
    start_recording()

    # Keep the main thread alive while recording and processing audio
    try:
        while recording:
            time.sleep(0.1)  # Adding sleep to avoid a busy-wait
    except KeyboardInterrupt:
        print("Recording stopped by user.")
        sys.exit(0)
