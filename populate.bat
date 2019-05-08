pipenv run cli write-test-images
pipenv run cli create-item "Item 1" -d "This is the first item" -w 13.22 -i instance/test1.png
pipenv run cli create-image instance/test2.png
pipenv run cli create-image instance/test3.png
pipenv run cli create-item "Item 2" -d "This is the second item" -i 2
pipenv run cli create-item "Item 3" -d "This is the third item" -w 867.5309 -i 3
pipenv run cli create-item "Another item" -d "This item has the same image as Item 1" -w 0.42 -i 1
pipenv run cli create-item "To be deleted" -d "This item will be deleted" -i 2
pipenv run cli create-task 3 -m "This task is in progress"
pipenv run cli update-task 1 -p 0.3
pipenv run cli run-task -i 3 -m "This task is successful" -d 0.05 -u 0.02
pipenv run cli run-task -i 3 -m "This task has failed" -d 0.05 -u 0.02 -s 0.0
pipenv run cli run-task -i 5 -m "This task belongs to an item that will be deleted" -d 0.2
pipenv run cli delete-item 5
pipenv run cli run-task -i 4
pipenv run cli replace-image 2 instance/test3.png
pipenv run cli run-task -i 4
pipenv run cli update-item 2 -i instance/test2.png
pipenv run cli create-event "This is a test event"
pipenv run cli create-event "This is a test event with explicit info severity" -s info
pipenv run cli create-event "This is a test event with debug severity" -s debug
pipenv run cli create-event "Warning! This is still just a test" -s warning
pipenv run cli create-event "Oh no, an error. But it's a test" -s error
pipenv run cli create-event "This is another test event"
pipenv run cli create-event "This is yet another test event"
