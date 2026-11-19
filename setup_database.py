""".env의 DATABASE_URL로 테이블을 초기화합니다. 비밀번호는 출력하지 않습니다."""
from pathlib import Path
import psycopg
from dotenv import dotenv_values

base = Path(__file__).resolve().parent
dsn = dotenv_values(base / '.env').get('DATABASE_URL')
if not dsn:
    raise SystemExit('.env에 DATABASE_URL을 설정하세요.')
with psycopg.connect(dsn, sslmode='require', connect_timeout=15) as conn:
    conn.execute((base / 'backend/database/schema.sql').read_text(encoding='utf-8'))
print('DB 연결 및 테이블 초기화 완료')
