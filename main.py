from flask import Flask, jsonify
from requests import codes

from constant_secret import DEFAULT_PATH
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
    page_dom: DomObject = scraping.get_page(DEFAULT_PATH)
    select_tag = page_dom.find('select[name="Lens"]')
    if select_tag is None:
        return jsonify({'reason': 'レンズ一覧を読み取れませんでした.'}), codes.internal_server_error
    return jsonify([{'id': x.attrs['value'], 'name': x.text} for x in select_tag.find_all('option')])


@app.route('/lenses/<lens_id>/cameras')
def get_cameras(lens_id: str):
    page_dom: DomObject = scraping.get_page(f'{DEFAULT_PATH}?Lens={lens_id}')
    select_tag = page_dom.find('select[name="Camera"]')
    if select_tag is None:
        return jsonify({'reason': 'カメラ一覧を読み取れませんでした.'}), codes.internal_server_error
    return jsonify([{'id': x.attrs['value'], 'name': x.text} for x in select_tag.find_all('option')])


@app.route('/lenses/<lens_id>/cameras/<camera_id>/flies')
def get_flies(lens_id: str, camera_id: str):
    page_dom: DomObject = scraping.get_page(f'{DEFAULT_PATH}?Lens={lens_id}&Camera={camera_id}')
    select_tag = page_dom.find('select[name="FLI"]')
    if select_tag is None:
        return jsonify({'reason': '焦点距離一覧を読み取れませんでした.'}), codes.internal_server_error
    return jsonify([{'id': x.attrs['value'], 'name': x.text} for x in select_tag.find_all('option')])


@app.route('/lenses/<lens_id>/cameras/<camera_id>/flies/<fli_id>/apis')
def get_apies(lens_id: str, camera_id: str, fli_id: str):
    page_dom: DomObject = scraping.get_page(f'{DEFAULT_PATH}?Lens={lens_id}&Camera={camera_id}&FLI={fli_id}')
    select_tag = page_dom.find('select[name="API"]')
    if select_tag is None:
        return jsonify({'reason': 'F値一覧を読み取れませんでした.'}), codes.internal_server_error
    return jsonify([{'id': x.attrs['value'], 'name': x.text} for x in select_tag.find_all('option')])


@app.route('/lenses/<lens_id>/cameras/<camera_id>/flies/<fli_id>/apis/<api_id>/images')
def get_images(lens_id: str, camera_id: str, fli_id: str, api_id: str):
    page_dom: DomObject = scraping.get_page(f'{DEFAULT_PATH}?Lens={lens_id}&Camera={camera_id}&FLI={fli_id}&API={api_id}')
    center_img_tag = page_dom.find('img[id="Crop1Pic"]')
    middle_img_tag = page_dom.find('img[id="Crop2Pic"]')
    corner_img_tag = page_dom.find('img[id="Crop3Pic"]')
    if center_img_tag is None or middle_img_tag is None or corner_img_tag is None:
        return jsonify({'reason': '画像一覧を読み取れませんでした.'}), codes.internal_server_error
    return jsonify({
        'center': center_img_tag.attrs['src'],
        'middle': middle_img_tag.attrs['src'],
        'corner': corner_img_tag.attrs['src'],
    })


if __name__ == "__main__":
    app.run(debug=True)
