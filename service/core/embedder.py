import numpy as np
import cv2
import torch
# import mxnet as mx
# import sklearn.preprocessing
import os

from core.lib.arcface.model_irse import IR_50


def l2_norm(input, axis=1):
    norm = torch.norm(input, 2, axis, True)
    output = torch.div(input, norm)
    return output


class ArcFaceMX:
    def __init__(self, model_path):
        ctx = mx.gpu()  # ctx = mx.cpu(0)
        self.model = self._get_model(model_path, ctx, (112, 112), 'fc1')

    def _get_model(self, model_path, ctx, image_size, layer):
        prefix = os.path.join(model_path, 'model')
        epoch = 23
        print('Loading', prefix, epoch)
        sym, arg_params, aux_params = mx.model.load_checkpoint(prefix, epoch)
        all_layers = sym.get_internals()
        sym = all_layers[layer + '_output']
        model = mx.mod.Module(symbol=sym, context=ctx, label_names=None)
        model.bind(data_shapes=[('data', (1, 3, image_size[0],
                                          image_size[1]))])
        model.set_params(arg_params, aux_params)
        return model

    def process(self, aligned):
        aligned = np.transpose(aligned, (2, 0, 1))
        input_blob = np.expand_dims(aligned, axis=0)
        data = mx.nd.array(input_blob)
        db = mx.io.DataBatch(data=(data, ))
        self.model.forward(db, is_train=False)
        embedding = self.model.get_outputs()[0].asnumpy()
        embedding = sklearn.preprocessing.normalize(embedding).flatten()
        return embedding


class ArcFace:
    def __init__(self, model_path):
        self._input_size = 112
        self._device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu")
        self._get_model(model_path)

    def _get_model(self, model_path):
        self.model = IR_50([self._input_size, self._input_size])
        self.model.load_state_dict(torch.load(model_path, map_location='cpu'))
        self.model.to(self._device)
        self.model.eval()

    def get_feature(self, img, tta=False):
        """Get embedding feature
        Input
            img : 112x112 RGB resized, cropped face
            tta : test time augmentation (hflip)
        Output
            512-D embedded feature
        """
        face = img.copy()
        # flip image horizontally if tta
        if tta:
            flipped = cv2.flip(face, 1)
        # numpy to tensor
        if not all(self._input_size == i for i in img.shape[:2]):
            face = cv2.resize(face,(self._input_size, self._input_size))
        face = face.swapaxes(1, 2).swapaxes(0, 1)
        face = np.reshape(face, [1, 3, self._input_size, self._input_size])
        face = np.array(face, dtype=np.float32)
        face = (face - 127.5) / 128.0
        face = torch.from_numpy(face)
        # numpy to tensor if tta
        if tta:
            flipped = flipped.swapaxes(1, 2).swapaxes(0, 1)
            flipped = np.reshape(flipped,
                                 [1, 3, self._input_size, self._input_size])
            flipped = np.array(flipped, dtype=np.float32)
            flipped = (flipped - 127.5) / 128.0
            flipped = torch.from_numpy(flipped)
        # forward pass and normalization
        with torch.no_grad():
            if tta:
                emb_batch = self.model(face.to(
                    self._device)).cpu() + self.model(flipped.to(self._device))
                feature = l2_norm(emb_batch)
            else:
                emb_batch = self.model(face.to(self._device))
                feature = l2_norm(emb_batch)
        return feature[0]

    def dump_embedding(self, img, path):
        feature = self.get_feature(img)
        torch.save(feature, path)
