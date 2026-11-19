"""한 Render 서비스에서 외부 UI와 로컬 전용 API를 실행합니다."""
import os
import signal
import subprocess
import sys
import time
from pathlib import Path
import psycopg

base = Path(__file__).resolve().parent
os.chdir(base)
for attempt in range(12):
    try:
        with psycopg.connect(os.environ['DATABASE_URL'], connect_timeout=15) as conn:
            conn.execute((base/'backend/database/schema.sql').read_text(encoding='utf-8'))
        break
    except psycopg.OperationalError:
        if attempt == 11:
            raise RuntimeError('Database connection failed; check Render DATABASE_URL') from None
        time.sleep(5)
os.environ['FRONTEND_API_URL'] = 'http://127.0.0.1:8000'
children = []
def stop(*args):
    for child in children:
        if child.poll() is None:
            child.terminate()
    for child in children:
        try:
            child.wait(timeout=10)
        except subprocess.TimeoutExpired:
            child.kill()
signal.signal(signal.SIGTERM, lambda *args: sys.exit(0))
try:
    children.append(subprocess.Popen([sys.executable,'-m','uvicorn','backend.main:app','--host','127.0.0.1','--port','8000']))
    children.append(subprocess.Popen([sys.executable,'-m','streamlit','run','frontend/app.py','--server.address','0.0.0.0','--server.port',os.environ.get('PORT','10000'),'--server.headless','true','--browser.gatherUsageStats','false']))
    while all(child.poll() is None for child in children):
        time.sleep(1)
    raise SystemExit(1)
finally:
    stop()
