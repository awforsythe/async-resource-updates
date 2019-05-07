pipenv run cli write-test-images
pipenv run cli create-image instance/test1.png
pipenv run cli create-image instance/test2.png
pipenv run cli create-image instance/test3.png
pipenv run cli create-item "Item 1" -d "This is the first item" -w 13.22 -i 1
pipenv run cli create-item "Item 2" -d "This is the second item" -i 2
pipenv run cli create-item "Item 3" -d "This is the third item" -w 867.5309 -i 3
pipenv run cli create-item "Another item" -d "This item has the same image as Item 1" -w 0.42 -i 1
