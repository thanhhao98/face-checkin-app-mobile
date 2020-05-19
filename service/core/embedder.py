import numpy as np
import mxnet as mx
import sklearn.preprocessing
import os


class Embedder:
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
