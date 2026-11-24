"""프로젝트 루트에서 python -m uvicorn football.app:app --port 8062"""
import os
import asyncio
from pathlib import Path
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / '.env')
load_dotenv(ROOT.parent / 'wsapi/day58/.env')
from football import engine

app = FastAPI(title='Football Korean Dubbing')
app.mount('/engine', engine.app)

@app.get('/api/highlights')
async def highlights():
    from football.highlights import get_highlights
    try:
        return {'videos': await asyncio.to_thread(get_highlights)}
    except Exception:
        raise HTTPException(503,'YouTube에서 목록 조회를 제한하고 있습니다. 공식 채널 링크로 확인하세요.')

@app.get('/highlights')
def highlights_page():
    return FileResponse(ROOT/'highlights.html')

@app.get('/')
def home():
    built=ROOT/'frontend/dist/index.html'
    return FileResponse(built if built.exists() else ROOT/'index.html')

@app.get('/dubbing')
def dubbing_ui():
    return FileResponse(ROOT/'index.html')

if (ROOT/'frontend/dist').exists():
    app.mount('/football-ui',StaticFiles(directory=ROOT/'frontend/dist'),name='football-ui')

@app.get('/api/config')
def config():
    return {'pixabay':bool(os.getenv('PIXABAY_API_KEY')), 'perso':bool(engine.KEY)}

@app.get('/api/videos')
async def videos(q: str = Query('football', min_length=1, max_length=80)):
    key=os.getenv('PIXABAY_API_KEY')
    if not key:
        raise HTTPException(503,'football/.env에 무료 Pixabay API 키를 설정하세요. 직접 파일 업로드는 바로 사용할 수 있습니다.')
    async with httpx.AsyncClient(timeout=20) as c:
        r=await c.get('https://pixabay.com/api/videos/',params={'key':key,'q':q,'per_page':6,'safesearch':'true'})
    if not r.is_success:
        raise HTTPException(502,'Pixabay 검색 실패. API 키와 사용 한도를 확인하세요.')
    return {'videos':[{'id':v['id'],'page':v['pageURL'],'author':v['user'],'tags':v['tags'],
                       'url':v['videos']['small']['url']} for v in r.json().get('hits',[])]}
