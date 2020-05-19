import os
import torch
from torch.nn import functional as F


class Identifier():
    def __init__(self, data_path):
        self.dataset = self._load_embedding(data_path)
        self.threshold = 0.5

    def _load_embedding(self, path):
        dataset = []
        for folder in os.listdir(path):
            emb_path = os.path.join(path, folder, 'embedding.pth')
            embedding = torch.load(emb_path)
            dataset.append({'name': folder, 'feature': embedding})
        return dataset

    def process(self, feature):
        max_value = -1
        name = ''
        for person in self.dataset:
            cos_sim = F.cosine_similarity(feature, person['feature'],
                                          dim=0).cpu().numpy()
            if cos_sim > max_value:
                max_value = cos_sim
                name = person['name']
        if max_value < self.threshold:
            name = 'unknown'
        return name, max_value
