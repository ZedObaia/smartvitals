#!/usr/bin/env python3
import requests
import time
import random
import numpy as np

patients = [1, 2, 3, 4, 5, 6]

while True:
    r = requests.put(f"http://54.154.198.148/api/patients/2/",
                      {
                          "temp": random.randint(28, 40),
                          "heartrate": random.randint(70, 100),
                          "emg" : str([round(random.uniform(0.0, 5.0), 2) for i in range(15)]) 
                      })
    print(r.json())
    time.sleep(0.5)
