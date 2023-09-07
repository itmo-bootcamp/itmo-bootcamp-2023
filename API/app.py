from fastapi import FastAPI


def load_endoints():
    import GET


app = FastAPI()
load_endoints()