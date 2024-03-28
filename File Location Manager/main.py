import os
import logging
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from watchdog.events import FileSystemEventHandler
import sys
import time
import shutil


src_dir = "/Users/srinandangondi/Downloads"
doc_dir = "/Users/srinandangondi/Downloads/PDFs"
img_dir = "/Users/srinandangondi/Downloads/imgs"
vid_dir = "/Users/srinandangondi/Downloads/vids"
other_dir = "/Users/srinandangondi/Downloads/others"

image_extensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".tiff", ".tif", ".psd", ".raw", ".arw", ".cr2", ".nrw", ".bmp", ".dib", ".heif", ".k25"]

video_extensions = [".webm", ".mpg", ".mp2", ".mpeg", ".mpe", ".mpv", ".mp4", ".mov"]

document_extensions = [".doc", ".docx", ".pdf", ".xls", ".xlsx", ".ppt", ".pptx"]


def name_chenger(destin, name):
    
    filename, extension = os.path.splitext(name)
    tracker = 1
    
    while os.path.exists(destin + "/" + name):
        name = filename + "(" + str(tracker) + ")" + extension 
        tracker += 1

    return name


def move(destin, entry, name):
    existCheck = os.path.exists(destin + "/" + name)
    if existCheck:
        new_name = name_chenger(destin,name)
        old_name = os.path.join(destin,name)
        new_name1 = os.path.join(destin,new_name)
        os.rename(old_name,new_name1)

        
    else:
        shutil.move(entry,destin)  
        

class FileMover(FileSystemEventHandler):
    def changeResponder(self,event):
        with os.scandir(src_dir) as items:
            for item in items:
                name = item.name
                destin = src_dir
                temp = name.split(".")
                exten = temp[-1]
                if exten in image_extensions:
                    move(img_dir,item,name)
                    logging.info(f"Image File {name} moved.")
                elif exten in video_extensions:
                    move(vid_dir,item,name)
                    logging.info(f"Video File {name} moved.")
                elif exten in document_extensions:
                    move(doc_dir,item,name)
                    logging.info(f"Document File {name} moved.")
                else:
                    move(other_dir,item,name)
                    logging.info(f"Other type file {name} moved.")    



if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO,
                        format='%(asctime)s - %(message)s',
                        datefmt='%Y-%m-%d %H:%M:%S')
    path = src_dir
    event_handler = FileMover()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    try:
        while True:
            time.sleep(10)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()