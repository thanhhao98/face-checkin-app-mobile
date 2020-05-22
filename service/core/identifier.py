import os
import torch
from torch.nn import functional as F


class Identifier():
    def __init__(self,  data):
        self.dataset = {id: torch.load(data[id]) for id in data}
        self.threshold = 0.5

    def process(self, feature):
        max_value = -1
        index = None
        for i in self.dataset:
            embedding = self.dataset[i]
            cos_sim = F.cosine_similarity(feature, embedding, dim=0).cpu().numpy()
            if cos_sim > max_value:
                max_value = cos_sim
                index = i
        if max_value < self.threshold:
            index = -1
        return index
