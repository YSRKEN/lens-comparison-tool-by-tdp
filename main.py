from flask import Flask

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
    page_dom = scraping.get_page('https://www.the-digital-picture.com/Reviews/ISO-12233-Sample-Crops.aspx')
    return ''


if __name__ == "__main__":
    app.run(debug=True)
