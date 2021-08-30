import cv2
import numpy as np
import matplotlib as plt

haar_data=cv2.CascadeClassifier("data.xml")
capture=cv2.VideoCapture(0)
data=[]
while True:
    flag , img =capture.read()
    if flag:
        faces = haar_data.detectMultiScale(img)
        for x,y,w,h in faces:
            cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,0),4)
            face=img[y:y+h,x:x+w,:]
            face=cv2.resize(face,(80,80))
            print(len(data))
            data.append(face)
            print(face.shape)
        cv2.imshow("result",img)
        if cv2.waitKey(2)==27 or len(data)>199:
             break
capture.release()
cv2.destroyAllWindows()


np.save("with_mask.npy",data)
np.save("without_mask.npy",data)






print("got the data...")