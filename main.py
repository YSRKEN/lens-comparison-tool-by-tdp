from flask import Flask

from service.i_database_service import IDataBaseService
from service.sqlite_database_service import SqliteDataBaseService

app = Flask(__name__)
database: IDataBaseService = SqliteDataBaseService('database.db')
reader:  = DataReader(database)


@app.route('/')
def root():
    return 'OK'


if __name__ == "__main__":
    app.run(debug=True)
