

Add Week 2 chat assistant and student-friendly docs
last week
### Step 2: Add your API key (one time only)

```powershell

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago
copy .env.example .env

Add Week 2 chat assistant and student-friendly docs
last week
notepad .env
```

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add SQLite chat history and React + Vite frontend
5 days ago
Replace the placeholder key with yours, then save:

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add Week 2 chat assistant and student-friendly docs
last week
```env
GROQ_API_KEY=gsk_your_real_key_here
GROQ_MODEL=openai/gpt-oss-120b
```


Add SQLite chat history and React + Vite frontend
5 days ago
No database setup is needed; the SQLite file is created automatically.

Add Week 2 chat assistant and student-friendly docs
last week

### Step 3: Start the backend (Terminal 1)

Still inside `backend`, with `(.venv)` showing:

```powershell

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago
uvicorn app.main:app --reload --port 8000
```


Add SQLite chat history and React + Vite frontend
5 days ago
Check it at http://127.0.0.1:8000/health. You should see `{"status":"ok",...,"database":"sqlite"}`. Leave this terminal running.

Add Week 2 chat assistant and student-friendly docs
last week

### Step 4: Start the frontend (Terminal 2)


Add SQLite chat history and React + Vite frontend
5 days ago
Open a **new** terminal in the project root:

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago

```powershell

Add SQLite chat history and React + Vite frontend
5 days ago
cd frontend-react
npm install        # first time only
npm run dev

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago
```


Add Week 2 chat assistant and student-friendly docs
last week
### Step 5: Open the app

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add SQLite chat history and React + Vite frontend
5 days ago
Go to http://localhost:5173 and click **Get Started**. The sidebar dot is green when the backend is connected.

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add Week 2 chat assistant and student-friendly docs
last week
To stop the servers, press `Ctrl + C` in each terminal.

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add Week 2 chat assistant and student-friendly docs
last week
On macOS/Linux, use `source .venv/bin/activate` instead of `Activate.ps1`, and `cp` instead of `copy`.

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add SQLite chat history and React + Vite frontend
5 days ago
## Where is my chat history?

In `backend/data/chat.db`, created the first time the backend starts. Ways to look at it:

- In the browser: http://127.0.0.1:8000/api/conversations
- In VS Code: install the **SQLite Viewer** extension and click the file
- To start fresh: stop the backend and delete the `backend/data` folder

The database is in `.gitignore`, so your chats are never pushed to GitHub.


Add Week 2 chat assistant and student-friendly docs
last week
## Common problems

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add Week 2 chat assistant and student-friendly docs
last week
| What you see | Why | Fix |
|---|---|---|

Add SQLite chat history and React + Vite frontend
5 days ago
| Red dot / "Backend offline" in the app | Backend isn't running | Do Step 3 |
| `npm` is not recognized | Node.js isn't installed | Install it from https://nodejs.org and reopen the terminal |

Add Week 2 chat assistant and student-friendly docs
last week
| `{"detail":"Not Found"}` at http://127.0.0.1:8000/ | Normal: there is no `/` route | Use `/docs` or `/health` |

Add SQLite chat history and React + Vite frontend
5 days ago
| `502 The AI request failed` | Wrong key, or the model name doesn't exist | See [backend/README.md](backend/README.md#troubleshooting) |

Add Week 2 chat assistant and student-friendly docs
last week
| `Activate.ps1 cannot be loaded` | PowerShell blocks scripts | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once |

Add SQLite chat history and React + Vite frontend
5 days ago
| Port already in use | An old server is still running | Press `Ctrl + C` in its terminal, then start again |

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago


Add Week 2 chat assistant and student-friendly docs
last week
## Project map

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago

```text
enterprise-ingestion-firewall/

Add SQLite chat history and React + Vite frontend
5 days ago
├── backend/                       ← Python API (see backend/README.md)

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago
│   ├── app/

Add SQLite chat history and React + Vite frontend
5 days ago
│   │   ├── main.py                ← all API routes
│   │   ├── config.py              ← reads your .env file

Add Week 2 chat assistant and student-friendly docs
last week
│   │   ├── schemas/

Add SQLite chat history and React + Vite frontend
5 days ago
│   │   │   ├── ingestion.py       ← Week 1 data rules (input + intent result)
│   │   │   └── assistant.py       ← Week 2 data rules (adds answer + session_id)

Add Week 2 chat assistant and student-friendly docs
last week
│   │   ├── services/

Add SQLite chat history and React + Vite frontend
5 days ago
│   │   │   ├── llm_service.py     ← Week 1: classify the message
│   │   │   ├── response_service.py← Week 2: write the answer
│   │   │   └── database_service.py← Week 3: save/load chats in SQLite

Add Week 2 chat assistant and student-friendly docs
last week
│   │   └── utils/token_counter.py ← estimates token count

Add SQLite chat history and React + Vite frontend
5 days ago
│   ├── sql/schema.sql             ← the database tables (reference)
│   ├── tests/                     ← pytest tests
│   ├── .env.example               ← copy this to .env

Add Week 2 chat assistant and student-friendly docs
last week
│   └── requirements.txt

Add SQLite chat history and React + Vite frontend
5 days ago
├── frontend-react/                ← React + Vite app (see frontend-react/README.md)
└── README.md                      ← you are here

Add Enterprise Structured Ingestion Firewall demo
3 weeks ago
```

Add Week 2 chat assistant and student-friendly docs
last week

## Good to know

- Each message makes **two** LLM calls (classify, then answer).

Add SQLite chat history and React + Vite frontend
5 days ago
- The assistant uses the **last 12 messages** of a conversation as memory.

Add Week 2 chat assistant and student-friendly docs
last week
- The app does **not** really look up orders or reset passwords; it only classifies and gives advice.
- Token counts are **estimates**, not what Groq bills.
- Schema validation checks the **shape** of data, not whether the AI's answer is true.

## Next reading


Add SQLite chat history and React + Vite frontend
5 days ago
- [backend/README.md](backend/README.md): each Python file, the API, the database, tests, troubleshooting

Remove old plain HTML frontend
5 days ago
- [frontend-react/README.md](frontend-react/README.md): how the React app is organized and connects to the API