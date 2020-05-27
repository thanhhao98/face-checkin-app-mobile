import numpy as np
import torch
import os
import cv2
from model_irse import IR_50
input_size = [112,112] 
embedding_size = 512
batch_size = 1

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
backbone_root = 'arcface.pth'
model = IR_50(input_size)

model.load_state_dict(torch.load(backbone_root))
model.to(device)
model.eval()
def l2_norm(input, axis = 1):
    norm = torch.norm(input, 2, axis, True)
    output = torch.div(input, norm)

    return output
def extract_feature1(img_path, backbone, device, tta = True):
    # pre-requisites
    assert(os.path.exists(img_path))
    # print('Image path:', img_path)

    # load image
    img = cv2.imread(img_path)

    # resize image to [128, 128]
    resized = cv2.resize(img, (128, 128))

    # center crop image
    a=int((128-112)/2) # x start
    b=int((128-112)/2+112) # x end
    c=int((128-112)/2) # y start
    d=int((128-112)/2+112) # y end
    ccropped = resized[a:b, c:d] # center crop the image
    ccropped = ccropped[...,::-1] # BGR to RGB

    # flip image horizontally
    flipped = cv2.flip(ccropped, 1)

    # load numpy to tensor
    ccropped = ccropped.swapaxes(1, 2).swapaxes(0, 1)
    ccropped = np.reshape(ccropped, [1, 3, 112, 112])
    ccropped = np.array(ccropped, dtype = np.float32)
    ccropped = (ccropped - 127.5) / 128.0
    ccropped = torch.from_numpy(ccropped)

    flipped = flipped.swapaxes(1, 2).swapaxes(0, 1)
    flipped = np.reshape(flipped, [1, 3, 112, 112])
    flipped = np.array(flipped, dtype = np.float32)
    flipped = (flipped - 127.5) / 128.0
    flipped = torch.from_numpy(flipped)

    # print("Cropped Image shape:" , ccropped.shape)

    with torch.no_grad():
        if tta:
            emb_batch = backbone(ccropped.to(device)).cpu() + backbone(flipped.to(device)).cpu()
            feature = l2_norm(emb_batch)
        else:
            feature = l2_norm(backbone(ccropped.to(device)).cpu())
    return feature[0]
if __name__ == "__main__":
    img = 'yua1.JPG'
    import time
    for i in range(1000):
        t1 = time.time()    
        feature = extract_feature1(img, model, device)
        t2 = time.time()
        print(t2-t1, len(feature))
