import sys
import os
PATH = sys.path[0]

config = {
    'PATH_ARCFACE_MODEL': os.path.join(PATH, 'core/models/arcface.pth'),
    'PATH_DB_MODEL': 'sqlite:///' + os.path.join(PATH, 'database.db'),
    'SECRET_KEY': 'Fac3Chexkin1@39&74^3ApM1N11@3',
    'TOKEN_TIME_LIFE': 1000,
    'PATH_DATA_FOLDERS': 'core/data',
    'NAME_FILE_EMBEDDING': 'embedding.pth',
    'TIME_IN': {'hour': 8, 'minute': 30},
    'TIME_OUT': {'hour': 17, 'minute': 30}
}
