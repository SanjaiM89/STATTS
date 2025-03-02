🚪 Smart Doorbell System (Under Development)
Overview

The Smart Doorbell System integrates:

    🎭 Face Recognition: Identifies known faces and alerts the user for unknown faces.
    🕵️‍♂️ Person Detection (YOLOv8): Detects human presence.
    🎙️ Two-Way Audio: Allows communication between the user and the visitor.
    🔒 User Authentication: Only registered users can access the system.
    🔍 Face Blurring: Unknown faces are blurred in the stream.
    🖼️ Face Registration: Users can manually upload images of people to allow access.
    📢 Notification System: Alerts users when an unknown person is detected.

    🚧 This project is still under development. Some features may not be fully functional.

Tech Stack

    Backend: Python (Flask, OpenCV, YOLOv8, MongoDB)
    Frontend: React (Still in development)
    Database: MongoDB
    WebSocket: Flask-SocketIO for real-time communication

Requirements

Ensure you have the following installed:

    Python 3.8+
    Node.js & npm (for the React frontend)
    MongoDB (for user and face data storage)
    FFmpeg (for audio processing)

Install Python Dependencies

pip install -r requirements.txt

Install Frontend Dependencies

cd frontend
npm install

Running the Project
1️⃣ Start the Backend Server

python app.py

2️⃣ Start the Frontend (React)

cd frontend
npm start

3️⃣ Access the Web App

Open your browser and go to:

http://localhost:3000

Features (Planned & In Progress)

✅ Face Recognition (Works)
✅ Person Detection (Works)
🚧 React UI (In Progress)
🚧 Live Notification System (In Progress)
🚧 Face Registration from Frontend (Planned)
Future Enhancements

    📱 Mobile App Integration
    ☁️ Cloud-Based Face Storage
    🧠 AI-Based Decision Making

License

This project is licensed under the MIT License.
