import argparse
import cv2
import numpy as np
import os
import torch

from detector import MTCNN
from embedder import ArcFace
from identifier import Identifier


def main(args):
    detector = MTCNN()
    embedder = ArcFace(args.model)
    identifier= Identifier(args.data_path)
    vc = cv2.VideoCapture(0)
    while vc.isOpened():
        isSuccess, frame = vc.read()
        bbox, face = detector.align(frame)
        if face is not None:
            rgb = np.array(face)[..., ::-1]
            feature = embedder.get_feature(rgb)
            name, value = identifier.process(feature)
            print(name, value)
            x0, y0, x1, y1, _ = bbox
            cv2.rectangle(frame, tuple((int(x0), int(y0))), tuple((int(x1), int(y1))), (0, 255, 0), 2)
            cv2.putText(frame, name, (int(x0), int(y0)), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        cv2.imshow("Frame", frame)
        print('===========')
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
    vc.release()
    cv2.destroyAllWindows()


def prepare_embedding(args):
    embedder = ArcFace(args.model)
    detector = MTCNN()
    path = args.data_path
    for folder in os.listdir(path):
        folder_path = os.path.join(path, folder)
        embs = []
        for f in os.listdir(folder_path):
            if not f.endswith('.jpg'):
                continue
            file_path = os.path.join(folder_path, f)
            print(file_path)
            bgr = cv2.imread(file_path)
            rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
            if bgr.shape != (112, 112, 3):
                _, bgr = detector.align(rgb)
                rgb = np.array(bgr)[..., ::-1]
            embs.append(embedder.get_feature(rgb).unsqueeze(0))
        if len(embs) == 0:
            continue
        embedding = torch.cat(embs).mean(0, keepdim=False)
        print(embedding.shape)
        torch.save(embedding, os.path.join(folder_path, 'embedding.pth'))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('function',
                        type=str,
                        help='indicate which function to call')
    parser.add_argument('--model',
                        type=str,
                        default='models/arcface.pth',
                        help='path to deep learning model')
    parser.add_argument('--data_path',
                        type=str,
                        default='data',
                        help='path to data directory')
    args = parser.parse_args()
    globals()[args.function](args)
