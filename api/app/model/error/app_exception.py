from typing import Optional

class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400, data: Optional[dict] = None):
        super().__init__(message)
        self.status_code = status_code
        self.data = data or {}
