# 🚀 FastAPI Backend - Marketing Tool

This is the backend service for the Marketing Tool project, built with [FastAPI](https://fastapi.tiangolo.com/) and MongoDB.

---

## 📦 Requirements

- Python 3.11 or 3.12
- Git (optional)
- MongoDB running locally or remotely
- `pip` (comes with Python)

---

## 🔧 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name/backend
```

### 2. Create and activate virtual environment

Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the development server

```bash
uvicorn main:app --reload
```

Visit: http://127.0.0.1:8000

API docs: http://127.0.0.1:8000/docs

### 🧪 Project Structure (example)

backend/
│
├── main.py # FastAPI app entry point
├── routes/ # API route handlers
│ └── workflow.py
├── models/ # Pydantic models
│ └── workflow.py
├── requirements.txt
└── .venv/ # Virtual environment (do not commit)
