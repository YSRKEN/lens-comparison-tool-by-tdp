import base64
import time

import lxml
import requests

from model import DomObject
from model.LxmlDomObject import LxmlDomObject
from service.i_scraping_service import IScrapingService
from service.i_database_service import IDataBaseService


class LxmlScrapingService(IScrapingService):
    """スクレイピング用のラッパークラス"""

    def __init__(self, database: IDataBaseService):
        self.database = database
        self.database.query('CREATE TABLE IF NOT EXISTS page_cache (url TEXT PRIMARY KEY, text TEXT)')
        self.database.query('CREATE TABLE IF NOT EXISTS image_cache (url TEXT PRIMARY KEY, data TEXT)')

    def get_page(self, url: str, encoding='') -> DomObject:
        cache_data = self.database.select('SELECT text from page_cache WHERE url=?', (url,))
        if len(cache_data) == 0:
            response = requests.get(url)
            if encoding != '':
                response.encoding = encoding
            text = response.text.encode(response.encoding, 'ignore').decode(response.encoding, 'ignore') \
                .encode(response.encoding, 'ignore')
            time.sleep(1)
            print(f'caching... [{url}]')
            self.database.query('INSERT INTO page_cache (url, text) VALUES (?, ?)', (url, text))
            return LxmlDomObject(lxml.html.fromstring(text))
        else:
            return LxmlDomObject(lxml.html.fromstring(cache_data[0]['text']))

    def get_image(self, url: str) -> str:
        cache_data = self.database.select('SELECT data from image_cache WHERE url=?', (url,))
        if len(cache_data) == 0:
            response = requests.get(url)
            data = 'data:image/jpeg;base64,' + base64.b64encode(response.content).decode('utf-8')
            time.sleep(1)
            print(f'caching... [{url}]')
            self.database.query('INSERT INTO image_cache (url, data) VALUES (?, ?)', (url, data))
            return data
        else:
            return cache_data[0]['data']
