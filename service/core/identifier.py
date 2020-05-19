from torch.nn import functional as F


class Identifier():
    def __init__(self, dataset):
        self.dataset = dataset
        self.threshold = 0.5

    def process(self, feature):
        max_value = -1
        name = ''
        for person in self.dataset:
            cos_sim = F.cosine_similarity(feature, person['feature'], dim=0).cpu().numpy()
            if cos_sim > max_value:
                max_value = cos_sim
                name = person['name']
        if max_value < self.threshold:
            name = 'unknown'
        return name
