from PIL import Image
import numpy as np
import os


def prepare_facebank(path, model, mtcnn, tta=False):
    embeddings = []
    names = ['Unknown']
    for folder in os.listdir(path):
        embs = []
        for f in os.listdir(os.path.join(path, folder)):
            try:
                img = Image.open(file)
            except:
                continue
            if img.size != (112, 112):
                img = mtcnn.align(img)
                emb.append(model(img))
        if len(embs) == 0:
            continue
        print(emb.shape)
        embeddings.append(emb)
        names.append(folder)
    # embeddings = torch.cat(embeddings)
    # names = np.array(names)
    # torch.save(embeddings, conf.facebank_path / 'facebank.pth')
    # np.save(conf.facebank_path / 'names', names)
    return embeddings, names


def load_facebank(conf):
    embeddings = torch.load(conf.facebank_path / 'facebank.pth')
    names = np.load(conf.facebank_path / 'names.npy')
    return embeddings, names
