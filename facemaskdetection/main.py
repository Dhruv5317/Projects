import cv2
import numpy as np
from sklearn.svm  import SVC
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.decomposition import PCA

with_mask=np.load("with_mask.npy")
without_mask=np.load("without_mask.npy")

print(with_mask.shape)
print(without_mask.shape)

with_mask=with_mask.reshape(200,80*80*3)
without_mask=without_mask.reshape(200,80*80*3)

x=np.r_[with_mask,without_mask]

"""print(x.shape)
cv2.imshow("result",x[10])
cv2.waitKey(0)"""

labels=np.zeros(x.shape[0])         # if "0" :wearing mask , elif "1":not wearing mask
labels[200:]=1.0

x_train,x_test,y_train,y_test = train_test_split(x,labels,test_size=0.25)

print(x_train.shape)

pca=PCA(n_components=3)
x_train=pca.fit_transform(x_train)
print(x_train.shape)

svm=SVC()
svm.fit(x_train,y_train)

x_test=pca.transform(x_test)
y_pred=svm.predict(x_test)

accuracy_score(y_test,y_pred)
print(accuracy_score(y_test,y_pred))

haar_data=cv2.CascadeClassifier("data.xml")
capture=cv2.VideoCapture(0)
data=[]
font=cv2.FONT_HERSHEY_COMPLEX
while True:
    flag , img =capture.read()
    if flag:
        faces = haar_data.detectMultiScale(img)
        for x,y,w,h in faces:
            cv2.rectangle(img,(x,y),(x+w,y+h),(0,0,0),4)
            face=img[y:y+h,x:x+w,:]
            face=cv2.resize(face,(80,80))
            face=face.reshape(1,-1)
            face=pca.transform(face)
            pred=svm.predict(face)[0]
            names={0:" wearing mask",1:"not wearing mask"}
            n=names[int(pred)]
            cv2.putText(img,n,(x,y-2),font,1,(0,0,0),2)
            print(n)
            print(len(data))

            print(face.shape)
        cv2.imshow("result",img)
        if cv2.waitKey(2)==27:
             break
capture.release()
cv2.destroyAllWindows()
