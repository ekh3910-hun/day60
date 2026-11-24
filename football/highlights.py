from functools import lru_cache
import time
import requests
import yt_dlp
import streamlit as st

CHANNEL = 'https://www.youtube.com/@premierleague/search?query=highlights'

@lru_cache(maxsize=2)
def cached_highlights(bucket):
    # 공개 메타데이터만 조회하며 영상·음성은 다운로드하지 않습니다.
    with yt_dlp.YoutubeDL({'quiet':True,'no_warnings':True,'extract_flat':True,
                           'skip_download':True,'playlistend':12,
                           'socket_timeout':12,'extractor_retries':1}) as ydl:
        result = ydl.extract_info(CHANNEL, download=False)
    return [{'id':v['id'],'title':v.get('title','Premier League Highlights')}
            for v in (result or {}).get('entries',[]) if v and len(v.get('id',''))==11]

def get_highlights():
    return cached_highlights(int(time.time()//1800))

def streamlit_view():
    st.title('Premier League 공식 하이라이트')
    try:
        for video in get_highlights():
            st.subheader(video['title'])
            st.video('https://www.youtube.com/watch?v='+video['id'])
    except Exception:
        st.warning('목록 조회가 제한됐습니다. 공식 채널에서 확인하세요.')
        st.link_button('공식 하이라이트', CHANNEL)

if __name__ == '__main__':
    streamlit_view()
