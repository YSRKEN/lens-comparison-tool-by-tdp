from abc import abstractmethod, ABCMeta

from model import DomObject


class IScrapingService(metaclass=ABCMeta):
    """スクレイピング用のラッパークラス"""

    @abstractmethod
    def get_page(self, url: str, encoding='') -> DomObject:
        """WebページのDOMオブジェクトを取得する

        Parameters
        ----------
        url URL
        encoding 文字エンコーディング(空文字列なら自動判定)

        Returns
        -------
            DOM[オブジェクト
        """
        pass

    @abstractmethod
    def get_image(self, url: str) -> str:
        """画像データを取得し、src欄に渡せるようなBase64文字列に変換する

        Parameters
        ----------
        url URL

        Returns
        -------
            画像データのBase64文字列
        """
        pass
