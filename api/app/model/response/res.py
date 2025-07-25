from typing import Optional, Any
from enum import Enum


class ResponseStatus(str, Enum):
    SUCCESS = "success"
    ERROR = "error"
    INFO = "info"
    WARN = "warn"
    BAD = "bad"
    FAILURE = "failure"
    GOOD = "good"


DEFAULT_MESSAGES = {
    ResponseStatus.SUCCESS: "Operation completed successfully.",
    ResponseStatus.ERROR: "An unexpected error occurred.",
    ResponseStatus.INFO: "Here's some information.",
    ResponseStatus.WARN: "Warning: check your request.",
    ResponseStatus.BAD: "Bad request.",
    ResponseStatus.FAILURE: "The operation failed.",
    ResponseStatus.GOOD: "Everything looks good."
}


class ResponseModel:
    def __init__(
        self,
        status: ResponseStatus,
        message: Optional[str] = None,
        data: Optional[dict] = None
    ):
        self.status = status
        self.message = message or DEFAULT_MESSAGES.get(status, "No message provided.")
        self.data = data or {}

    def to_dict(self) -> dict:
        return {
            "status": self.status.value,
            "message": self.message,
            "data": self.data
        }

    @staticmethod
    def success(data: dict = None, message: Optional[str] = None):
        return ResponseModel(ResponseStatus.SUCCESS, message, data)

    @staticmethod
    def error(message: Optional[str] = None, data: dict = None):
        return ResponseModel(ResponseStatus.ERROR, message, data)

    @staticmethod
    def from_exception(exc: Exception):
        import traceback
        return ResponseModel(
            ResponseStatus.ERROR,
            message=str(exc),
            data={"trace": traceback.format_exc()}
        )
