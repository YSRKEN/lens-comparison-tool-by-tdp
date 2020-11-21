from flask import Flask, jsonify
from requests import codes

from model.DomObject import DomObject
from service.LxmlScrapingService import LxmlScrapingService
from service.i_database_service import IDataBaseService
from service.i_scraping_service import IScrapingService
from service.sqlite_database_service import SqliteDataBaseService

app = Flask(__name__)
database: IDataBaseService = SqliteDataBaseService('database.db')
scraping: IScrapingService = LxmlScrapingService(database)


@app.route('/')
def root():
    return 'OK'


@app.route('/lenses')
def get_lenses():
    page_dom: DomObject = scraping.get_page('https://www.the-digital-picture.com/Reviews/ISO-12233-Sample-Crops.aspx')
    select_tag = page_dom.find('select[name="Lens"]')
    if select_tag is None:
        return jsonify({'reason': 'レンズ一覧を読み取れませんでした.'}), codes.internal_server_error
    return jsonify([{'id': x.attrs['value'], 'name': x.text} for x in select_tag.find_all('option')])


if __name__ == "__main__":
    app.run(debug=True)
